import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Obtener el documento del post desde Firestore
    const postDoc = await db.collection('posts').doc(id).get();
    
    // Verificar si el post existe
    if (!postDoc.exists) {
      return NextResponse.json(
        { error: 'Post no encontrado' },
        { status: 404 }
      );
    }
    
    // Devolver los datos del post con su ID
    const post = {
      id: postDoc.id,
      ...postDoc.data()
    };
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error al obtener el post:', error);
    return NextResponse.json(
      { error: 'Error al obtener el post' },
      { status: 500 }
    );
  }
}
