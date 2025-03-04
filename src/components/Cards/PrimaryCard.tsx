interface PrimaryCardProps {
    title: string
    text: string
}

export const PrimaryCard = ({ title, text }: PrimaryCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl p-8 transition-all duration-500 ease-in-out transform hover:scale-105 hover:bg-primary hover:text-white hover:-translate-y-3">
            <h2 className="text-2xl font-bold mb-4 uppercase text-center">{title}</h2>
            <p className="text-center">{text}</p>
        </div>
    )
}