import React from "react";
import logo from '../assets/logo.svg';
import './Header.css';

interface HeaderInfo {
    className?: string;
}

const Header: React.FC<HeaderInfo> = ({className='', ...args}) => {
    return (
        <header className={`${className} header`}>
            <div className="header__logo-container">
                    <a className="logo__link" href="#">
                        <img className="logo__img" src={logo} alt="Логотип" width="55" height="56.38" />
                    </a>
            </div>
        </header>
    );
}

export default Header;