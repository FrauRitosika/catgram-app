import React from "react";
import './ButtonReaction.css';

interface ButtonInfo {
    className?: string;
    onClick: () => void;
    type: string;
    children?: React.ReactNode;
    status?: string | null;
}

const ButtonReaction: React.FC<ButtonInfo> = ({ className = '', children, onClick, type, status }) => {

    function findButtonClass(type: string): string {
        switch (type) {
            case 'LIKE': return 'reaction-button-like';
            case 'DELETE': return 'reaction-button-delete';
            default: return '';
        }
    }

    const typeClass: string = findButtonClass(type);

    return (
        <button className={`${className} ${typeClass}${status ? `--${status}`: ''} button`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default ButtonReaction;