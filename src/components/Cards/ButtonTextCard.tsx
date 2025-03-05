interface ButtonTextCardProps {
    title: string;
    text: string;
    buttonText?: string;
    buttonLink?: string;
    showButton?: boolean;
}

export const ButtonTextCard = ({ title, text, buttonText = "Ver más", buttonLink = "#", showButton = true }: ButtonTextCardProps) => {
    return (
        <div className="flex flex-col items-center justify-center mx-auto bg-white w-[80%] rounded-2xl p-8 relative">
            <h2 className="text-3xl font-bold mb-4 uppercase text-center">{title}</h2>
            <div className="w-[60%] h-[2px] bg-primary/60 mb-4" />
            <p className="text-justify py-4 mb-8">{text}</p>
            {showButton && (
                <div className="w-full flex justify-center">
                    <a 
                        href={buttonLink}
                        className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300"
                    >
                        {buttonText}
                    </a>
                </div>
            )}
        </div>
    );
};