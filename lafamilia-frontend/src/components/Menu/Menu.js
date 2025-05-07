import React, {useState} from 'react';
import './Menu.css';
import logo from '../../assets/textLogo.svg';
import {FaBars, FaTimes, FaWhatsapp} from 'react-icons/fa';
import {Link} from "react-router-dom";
import IndexPage from "../IndexPage/IndexPage";

const Menu = ({index}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className='menu'>
                <div className='menu-container'>
                    <p className='menu-logo' onClick={() => window.location.href = '/'}>
                        La Familia Café
                    </p>
                    {/*<img*/}
                    {/*    src={logo}*/}
                    {/*    alt='logo'*/}
                    {/*    className='menu-logo'*/}
                    {/*    onClick={() => window.location.href = '/'}*/}
                    {/*/>*/}

                    <div className='desktop-menu'>
                        <a href='/' className={index ? 'menu-link active' : 'menu-link'}>About Us</a>
                        <a href='/shop' className={!index ? 'menu-link active' : 'menu-link'}>Lots</a>
                        <a href='/#shipping' className='menu-link'>Shipping</a>
                        <a href="https://wa.me/573176444299" className='whatsapp-button'>
                            <FaWhatsapp className="whatsapp-icon"/> Contact Us
                        </a>
                    </div>

                    <button
                        className={`mobile-menu-button ${isOpen ? 'open' : ''}`}
                        style={{
                            marginTop: "0.5rem"
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                    >
                        {isOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
                    </button>
                </div>
            </div>

            <div className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}/>
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <div className="mobile-menu-content text">
                    <a href='/' onClick={() => setIsOpen(false)} className="mobile-menu-link">
                        About Us
                    </a>
                    <a href='/shop' onClick={() => setIsOpen(false)} className="mobile-menu-link">
                        Lots
                    </a>
                    <a href='/#shipping' className="mobile-menu-link">Shipping</a>
                    <a href="https://wa.me/573176444299" className='mobile-whatsapp' onClick={() => setIsOpen(false)}>
                        <FaWhatsapp className="whatsapp-icon"/> Contact Us
                    </a>
                </div>
            </div>
        </>
    );
};

export default Menu;