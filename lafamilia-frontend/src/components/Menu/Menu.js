import React, {useState} from 'react';
import './Menu.css';
import logo from '../../assets/textLogo.svg';
import {FaBars, FaTimes} from 'react-icons/fa';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='menu'>
            <img  style={{cursor: "pointer"}} onClick={() => window.location.href = '/'} src={logo} alt='logo' className='menu-logo'/>

            <div className='desktop-menu'>
                <a href='/'>About Us</a>
                <a href='/shop'>Lots</a>
                <a href='#'>WhatsApp</a>
            </div>

            <button
                className='mobile-menu-button'
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
            >
                {isOpen ? <FaTimes size={24}/> : <FaBars size={24}/>}
            </button>

            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <a href='/' onClick={() => setIsOpen(false)}>About Us</a>
                <a href='#' onClick={() => setIsOpen(false)}>Lots</a>
                <a href='#' onClick={() => setIsOpen(false)}>WhatsApp</a>
            </div>
        </div>
    );
};

export default Menu;