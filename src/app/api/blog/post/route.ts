import { NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase-admin';
import { v4 as uuidv4 } from 'uuid';

const ADMIN_PASSWORD = 'Cubika2025@.';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes

async function uploadImageToFirebase(file: File, filename: string): Promise<string> {
  try {
    // Convertir el archivo a un buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Crear una referencia al archivo en Storage
    const bucket = storage.bucket();
    const fileRef = bucket.file(`blog-images/${filename}`);
    
    // Subir el archivo
    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });
    
    // Hacer el archivo públicamente accesible
    await fileRef.makePublic();
    
    // Obtener la URL pública
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;
    
    return publicUrl;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw new Error('Error al subir la imagen');
  }
}

export async function POST(req: Request) {
  try {
    console.log('Iniciando creación de post...');

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const template = formData.get('template') as 'simple' | 'gallery' | 'featured';
    const image = formData.get('image') as File;
    const additionalImages = formData.getAll('additionalImages') as File[];
    const password = formData.get('password') as string;

    console.log('Datos del formulario recibidos:', { title, template });

    if (!title || !content || !password || !template) {
      return NextResponse.json(
        { error: 'Título, contenido, template y contraseña son requeridos' },
        { status: 400 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    if (image && image.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'La imagen principal no debe exceder 5MB' },
        { status: 400 }
      );
    }

    for (const additionalImage of additionalImages) {
      if (additionalImage.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'Las imágenes adicionales no deben exceder 5MB cada una' },
          { status: 400 }
        );
      }
    }

    // Crear un objeto con los datos del post
    const postData: any = {
      title,
      content,
      template,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Subir la imagen principal si existe
    if (image) {
      console.log('Subiendo imagen principal...');
      const fileExtension = image.name.split('.').pop();
      const filename = `${uuidv4()}.${fileExtension}`;
      
      // Subir la imagen a Firebase Storage
      const imageUrl = await uploadImageToFirebase(image, filename);
      
      // Añadir la URL de la imagen a los datos del post
      postData.imageUrl = imageUrl;
      postData.imageName = filename;
      console.log('Imagen principal subida:', postData.imageUrl);
    }

    // Subir imágenes adicionales si existen
    if (additionalImages.length > 0) {
      console.log('Subiendo imágenes adicionales...');
      postData.additionalImages = await Promise.all(
        additionalImages.map(async (img, index) => {
          const fileExtension = img.name.split('.').pop();
          const filename = `${uuidv4()}-${index}-${fileExtension}`;
          return await uploadImageToFirebase(img, filename);
        })
      );
      console.log('Imágenes adicionales subidas:', postData.additionalImages);
    }

    // Crear un nuevo documento en la colección 'posts'
    const postRef = db.collection('posts').doc();
    await postRef.set(postData);
    console.log('Post guardado exitosamente con ID:', postRef.id);

    // Devolver los datos del post creado
    return NextResponse.json({
      id: postRef.id,
      ...postData
    });
  } catch (error) {
    console.error('Error detallado al crear post:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error al crear el post: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Error desconocido al crear el post' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const password = searchParams.get('password');

    if (!id || !password) {
      return NextResponse.json(
        { error: 'ID y contraseña son requeridos' },
        { status: 400 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    // Obtener el post para verificar si tiene una imagen
    const postRef = db.collection('posts').doc(id);
    const postDoc = await postRef.get();
    
    if (!postDoc.exists) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }
    
    const postData = postDoc.data();
    
    // Eliminar la imagen de Firebase Storage si existe
    if (postData?.imageUrl && postData?.imageName) {
      const bucket = storage.bucket();
      const fileRef = bucket.file(`blog-images/${postData.imageName}`);
      
      // Verificar si el archivo existe antes de eliminarlo
      const [exists] = await fileRef.exists();
      if (exists) {
        await fileRef.delete();
        console.log(`Imagen eliminada: ${postData.imageName}`);
      }
    }
    
    // Eliminar el documento del post
    await postRef.delete();
    console.log(`Post eliminado: ${id}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar post:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el post' },
      { status: 500 }
    );
  }
}
