import React, { useState } from "react";
import './Filter.css';

interface FilterInfo {
    className?: string;
    onClick: (filter: string) => void;
    filterName: string;
    children?: React.ReactNode;
}

const Filter: React.FC<FilterInfo> = ({ className = '', onClick, filterName, children }) => {

    const [isSelected, setSelected] = useState<boolean>(false);

    function changeFilter() {
        onClick(isSelected ? 'NONE' : filterName);
        setSelected(!isSelected);
    }

    return (
        <button className={`filter ${className}`} onClick={changeFilter}>
            <div className="filter__icon"></div>
            {children}
        </button>
    )
}

export default Filter;