import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  template: 'simple' | 'gallery' | 'featured';
  image?: string;
  additionalImages?: string[];
}

const ADMIN_PASSWORD = 'Cubika2025@.'; // Contraseña hardcodeada para pruebas
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Función para subir imagen a Cloudinary
async function uploadToCloudinary(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  // Convertir el buffer a base64
  const base64Data = buffer.toString('base64');
  const fileType = file.type;
  const base64File = `data:${fileType};base64,${base64Data}`;
  
  // Subir a Cloudinary
  const result = await cloudinary.uploader.upload(base64File, {
    folder: 'blog-posts',
  });
  
  return result.secure_url;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const template = formData.get('template') as BlogPost['template'];
    const image = formData.get('image') as File;
    const additionalImages = formData.getAll('additionalImages') as File[];
    const password = formData.get('password') as string;

    if (!title || !content || !password || !template) {
      return NextResponse.json(
        { error: 'Título, contenido, template y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Validación simple de contraseña
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    // Validar tamaño de la imagen principal
    if (image && image.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'La imagen principal no debe exceder 5MB' },
        { status: 400 }
      );
    }

    // Validar tamaño de las imágenes adicionales
    for (const additionalImage of additionalImages) {
      if (additionalImage.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'Las imágenes adicionales no deben exceder 5MB cada una' },
          { status: 400 }
        );
      }
    }

    // Crear directorio para posts si no existe
    const dataDir = path.join(process.cwd(), 'data');
    const postsPath = path.join(dataDir, 'blog-posts.json');
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Crear el post
    const post: BlogPost = {
      id: Date.now(),
      title,
      content,
      template,
      createdAt: new Date().toISOString(),
    };

    // Manejar la imagen principal si existe
    if (image) {
      post.image = await uploadToCloudinary(image);
    }

    // Manejar imágenes adicionales si existen
    if (additionalImages.length > 0) {
      post.additionalImages = await Promise.all(
        additionalImages.map(img => uploadToCloudinary(img))
      );
    }

    // Leer posts existentes o crear array vacío
    let posts: BlogPost[] = [];
    if (fs.existsSync(postsPath)) {
      const postsData = fs.readFileSync(postsPath, 'utf-8');
      posts = JSON.parse(postsData);
    }

    // Agregar nuevo post y guardar
    posts.push(post);
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error al crear post:', error);
    return NextResponse.json(
      { error: 'Error al crear el post' },
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

    // Validar la contraseña
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Contraseña incorrecta' },
        { status: 401 }
      );
    }

    const dataDir = path.join(process.cwd(), 'data');
    const postsPath = path.join(dataDir, 'blog-posts.json');

    // Verificar si existe el archivo de posts
    if (!fs.existsSync(postsPath)) {
      return NextResponse.json(
        { error: 'No se encontraron posts' },
        { status: 404 }
      );
    }

    // Leer posts existentes
    const postsData = fs.readFileSync(postsPath, 'utf-8');
    let posts: BlogPost[] = JSON.parse(postsData);

    // Encontrar el post a eliminar
    const postIndex = posts.findIndex(post => post.id === Number(id));
    if (postIndex === -1) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    // Si el post tiene una imagen, eliminarla
    const post = posts[postIndex];
    if (post.image) {
      const imagePath = path.join(process.cwd(), 'public', post.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Eliminar el post del array
    posts.splice(postIndex, 1);

    // Guardar los posts actualizados
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar post:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el post' },
      { status: 500 }
    );
  }
}
