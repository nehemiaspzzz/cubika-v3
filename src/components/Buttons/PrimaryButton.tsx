interface PrimaryButtonProps {
    text: string;
    className?: string;
    disabled?: boolean;
}

export const PrimaryButton = ({ text, className = '', disabled = false }: PrimaryButtonProps) => {
    return (
        <button 
            disabled={disabled}
            className={`
            bg-primary text-white px-6 py-3 rounded-md 
            hover:bg-primary/80 
            transition-all duration-200
            hover:px-8 hover:py-3
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
        `}>
            {text}
        </button>
    );
};