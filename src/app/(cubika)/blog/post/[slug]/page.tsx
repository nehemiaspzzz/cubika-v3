interface PageProps {
    params: Promise<{ slug: string }>;
  }

async function getPostBySlug(slug: string) {
    const post = await fetch(`https://admin.grupocubika.com/wp-json/wp/v2/posts?slug=${slug}`);
    return post.json();
}


export default async function Page({params}: PageProps) {
    const { slug } = await params;
    const [post] = await getPostBySlug(slug);

    return (
        <article className="flex flex-col gap-4 mx-8 justify-center items-center my-8">
            <h1>{post.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
    )
}