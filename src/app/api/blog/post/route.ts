import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_PASSWORD = 'Cubika2025@.';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes
const POSTS_DIR = path.join(process.cwd(), 'public', 'posts');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'blog');

// Asegurar que los directorios existan
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function saveImage(file: File, filename: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const imagePath = path.join(IMAGES_DIR, filename);
  fs.writeFileSync(imagePath, buffer);
  return `/images/blog/${filename}`;
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

    const postId = Date.now().toString();
    const postData: any = {
      id: postId,
      title,
      content,
      template,
      createdAt: new Date().toISOString()
    };

    if (image) {
      console.log('Guardando imagen principal...');
      const filename = `${postId}-main-${image.name}`;
      postData.image = await saveImage(image, filename);
      console.log('Imagen principal guardada:', postData.image);
    }

    if (additionalImages.length > 0) {
      console.log('Guardando imágenes adicionales...');
      postData.additionalImages = await Promise.all(
        additionalImages.map(async (img, index) => {
          const filename = `${postId}-${index}-${img.name}`;
          return await saveImage(img, filename);
        })
      );
      console.log('Imágenes adicionales guardadas:', postData.additionalImages);
    }

    // Guardar el post en un archivo JSON
    const postPath = path.join(POSTS_DIR, `${postId}.json`);
    fs.writeFileSync(postPath, JSON.stringify(postData, null, 2));
    console.log('Post guardado exitosamente:', postPath);

    return NextResponse.json({ success: true, post: postData });
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

    const postPath = path.join(POSTS_DIR, `${id}.json`);
    
    if (!fs.existsSync(postPath)) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    // Leer el post para obtener las rutas de las imágenes
    const postData = JSON.parse(fs.readFileSync(postPath, 'utf-8'));

    // Eliminar la imagen principal si existe
    if (postData.image) {
      const imagePath = path.join(process.cwd(), 'public', postData.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Eliminar las imágenes adicionales si existen
    if (postData.additionalImages && postData.additionalImages.length > 0) {
      postData.additionalImages.forEach((imageUrl: string) => {
        const imagePath = path.join(process.cwd(), 'public', imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    // Eliminar el archivo JSON del post
    fs.unlinkSync(postPath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar post:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el post' },
      { status: 500 }
    );
  }
}
