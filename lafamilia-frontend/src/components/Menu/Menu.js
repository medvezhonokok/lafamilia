import React, { useState, useEffect } from 'react';
import './Menu.css';
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Menu = ({ index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                setVisible(false);
            } else if (currentScrollY < lastScrollY || currentScrollY < 10) {
                // Scrolling up or at top of page
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const scrollToShipping = () => {
        setIsOpen(false);
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById('shipping');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <>
            <div className={`menu ${visible ? 'visible' : 'hidden'}`}>
                <div className='menu-container'>
                    <p className='menu-logo' onClick={() => window.location.href = '/'}>
                        La Familia Café
                    </p>

                    <div className='desktop-menu'>
                        <a href='/' className={index ? 'menu-link active' : 'menu-link'}>About Us</a>
                        <a href='/shop' className={!index ? 'menu-link active' : 'menu-link'}>Lots</a>
                        <a href='/#shipping' className='menu-link' onClick={(e) => {
                            e.preventDefault();
                            scrollToShipping();
                        }}>Shipping</a>
                        <a href="https://wa.me/573176444299" className='whatsapp-button'>
                            <FaWhatsapp className="whatsapp-icon"/> Contact Us
                        </a>
                    </div>

                    <button
                        className={`mobile-menu-button ${isOpen ? 'open' : ''}`}
                        style={{ marginTop: "0.5rem" }}
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
                    <div className="mobile-menu-link" onClick={scrollToShipping}>Shipping</div>
                    <a href="https://wa.me/573176444299" className='mobile-whatsapp' onClick={() => setIsOpen(false)}>
                        <FaWhatsapp className="whatsapp-icon"/> Contact Us
                    </a>
                </div>
            </div>
        </>
    );
};

export default Menu;