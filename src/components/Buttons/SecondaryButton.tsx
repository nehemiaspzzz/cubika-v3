
interface PrimaryButtonProps {
    text: string;
}


export const SecondaryButton = ({ text }: PrimaryButtonProps) => {
    return (
        <button className="bg-primary hover:bg-primary/80 font-monserrat text-white font-bold py-2 px-4 rounded text-md">
            {text}
        </button>
    );
};