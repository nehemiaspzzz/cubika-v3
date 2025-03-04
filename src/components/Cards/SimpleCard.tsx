interface SimpleCardProps {
    title?: string;
    text: string;
}

export const SimpleCard = ({ title, text }: SimpleCardProps) => {
    return (
        <div className="min-h-[150px] flex flex-col items-start justify-between bg-white rounded-2xl p-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-primary hover:text-white hover:translate-y-3">
            <div className="w-[48px] h-[48px] bg-primary rounded-lg group-hover:bg-white transition-colors duration-300" />
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            <p className="text-start text-base sm:text-lg md:text-xl break-words hyphens-auto w-full">{text}</p>
        </div>
    );
}