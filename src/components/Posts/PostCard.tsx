import Image from "next/image";
import Link from "next/link";

interface PostsCardProps {
    header: string;
    title: string;
    text: string;
    date: string;
    author: string;
    slug: string;
    className?: string;
}

export const PostsCard = ({header, title, text, slug, author, date, className = ''}: PostsCardProps) => {
    return (
        <div className={`group relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden max-w-sm ${className}`}>
            <div className="absolute top-3 right-3 z-10">
                <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full cursor-pointer hover:bg-white transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </div>
            </div>
            <Link href={`/blog/post/${slug}`} className="flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                    <Image 
                        src={header}
                        alt={title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {title}
                    </h3>
                    <div className="text-gray-600 text-sm mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: text }} />
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto mb-2">
                        <span className="font-semibold text-primary">{author}</span>
                        <span>•</span>
                        <span>{new Date(date).toLocaleDateString('es-GT', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                </div>
                <div className="px-4 pb-4">
                    <div className="inline-flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300">
                        VER MÁS
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </Link>
        </div>
    )
}