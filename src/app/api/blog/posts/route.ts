import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const postsPath = path.join(dataDir, 'blog-posts.json');

    if (!fs.existsSync(postsPath)) {
      return NextResponse.json([], { status: 200 });
    }

    const postsData = fs.readFileSync(postsPath, 'utf-8');
    const posts = JSON.parse(postsData);

    // Ordenar los posts por fecha de creación (más recientes primero)
    posts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    return NextResponse.json(
      { error: 'Error al obtener los posts' },
      { status: 500 }
    );
  }
} 