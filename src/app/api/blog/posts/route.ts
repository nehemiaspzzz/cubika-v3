import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET() {
  try {
    // Obtener todos los posts de Firestore ordenados por fecha (más recientes primero)
    const postsRef = db.collection('posts');
    const postsSnapshot = await postsRef.orderBy('createdAt', 'desc').get();
    
    // Convertir los documentos a un array de posts
    const posts = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    return NextResponse.json(
      { error: 'Error al obtener los posts' },
      { status: 500 }
    );
  }
} 