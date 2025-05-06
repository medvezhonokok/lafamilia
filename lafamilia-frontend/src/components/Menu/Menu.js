import React, {useState} from 'react';
import './Menu.css';
import logo from '../../assets/textLogo.svg';
import {FaBars, FaTimes} from 'react-icons/fa';

const Menu = ({index}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='menu'>
            <img style={{cursor: "pointer"}} onClick={() => window.location.href = '/'} src={logo} alt='logo'
                 className='menu-logo'/>

            <div className='desktop-menu'>
                <a href='/' className={`${index ? 'green' : 'black'}`}>About Us</a>
                <a href='/shop' className={`${!index ? 'green' : 'black'}`}>Lots</a>
                <a href="https://wa.me/573176444299" className='whatsapp-button'>Contact Us</a>
            </div>

            <button
                className='mobile-menu-button'
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
            >
                {isOpen ? <FaTimes size={30}/> : <FaBars size={30}/>}
            </button>

            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <a href='/' onClick={() => setIsOpen(false)}>About Us</a>
                <a href='/shop' onClick={() => setIsOpen(false)}>Lots</a>
                <a href="https://wa.me/573176444299">
                    Contact Us
                </a>
            </div>
        </div>
    );
};

export default Menu;