import Image from "next/image";

interface PostsCardProps {
    header: string;
    title: string;
    text: string;
    date: string;
    author: string;
    slug: string;
}

export const PostsCard = ({header, title, text, slug, author, date}: PostsCardProps) => {
    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-2xl">
            <Image 
                src={header}
                alt="Post"
                width={1000}
                height={1000}
                className="w-full h-96 object-cover object-center rounded-t-2xl"
            />
            <div className="flex justify-start">
            <p className="text-sm text-[#838383] px-4 py-2"><span className="font-bold">{author}</span> - {date}</p>
            </div>
            <h3 className="text-2xl font-bold px-4 py-2">{title}</h3>
            <p className="text-thin px-4 py-2" dangerouslySetInnerHTML={{ __html: text }}></p>
            <a href={`/blog/post/${slug}`} className="text-primary px-4 py-2">Leer todo el articulo</a>
        </div>
    )
}