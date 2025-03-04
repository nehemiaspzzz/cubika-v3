import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch(
            'https://admin.grupocubika.com/wp-json/wp/v2/posts?per_page=10&_embed',
            {
                headers: {
                    'Accept': 'application/json',
                },
                next: { revalidate: 3600 }
            }
        );

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { error: 'Error fetching posts' },
            { status: 500 }
        );
    }
}
