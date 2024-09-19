import React from "react";
import logo from '../assets/logo.svg';
import './Footer.css';

interface FooterInfo {
    className?: string;
}

const Footer: React.FC<FooterInfo> = ({className=''}) => {
    return (
        <footer className={`${className} footer`}>
        <div className="footer__logo-container">
                <a className="logo__link" href="#">
                    <img className="logo__img" src={logo} alt="Логотип" width="55" height="56.38" />
                </a>
        </div>
    </footer>
    );
}

export default Footer;