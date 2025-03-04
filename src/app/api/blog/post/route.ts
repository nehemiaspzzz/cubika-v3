import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const image = formData.get('image') as File;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Título y contenido son requeridos' },
        { status: 400 }
      );
    }

    // Crear el post
    const post = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    // Guardar la imagen si existe
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${post.id}-${image.name}`;
      const imagePath = path.join(process.cwd(), 'public', 'blog-images', filename);
      fs.writeFileSync(imagePath, buffer);
      post.image = `/blog-images/${filename}`;
    }

    // Leer posts existentes
    const postsPath = path.join(process.cwd(), 'data', 'blog-posts.json');
    let posts = [];
    try {
      const postsData = fs.readFileSync(postsPath, 'utf-8');
      posts = JSON.parse(postsData);
    } catch (error) {
      // Si el archivo no existe o está vacío, empezamos con un array vacío
    }

    // Agregar nuevo post
    posts.push(post);

    // Guardar posts actualizados
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error al crear post:', error);
    return NextResponse.json(
      { error: 'Error al crear el post' },
      { status: 500 }
    );
  }
}
