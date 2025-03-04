import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postsPath = path.join(process.cwd(), 'data', 'blog-posts.json');
    const postsData = fs.readFileSync(postsPath, 'utf-8');
    const posts = JSON.parse(postsData);
    
    const post = posts.find((p: any) => p.id.toString() === params.id);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al cargar el post' },
      { status: 500 }
    );
  }
}
