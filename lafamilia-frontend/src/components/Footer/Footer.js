import React from 'react';
import './Footer.css';
import whiteLogo from './../../assets/whiteLogo1.svg';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <div className='footer-row'>
                    <img src={whiteLogo} alt="La Familia Cafe Logo" className='footer-logo'/>

                    <div className='footer-address'>
                        Cra. 100 #11-60, Holguines Trade Center,<br/>
                        Torre Farallones of 311, Cali<br/>
                        <a href="tel:+57 3176444299">+57 317 644 42 99</a>
                    </div>

                    <div className='footer-links-group'>
                        <div className='footer-links'>
                            <a href='/'>About</a>
                            <a href='/shop'>Lots</a>
                        </div>
                        <div className='footer-links'>
                            <a>sales.lafamiliacafe@gmail.com</a>
                            <a href='https://www.instagram.com/la_familia_cafe_colombiano/'>Instagram</a>
                        </div>
                    </div>

                </div>
                <div className='footer-copyright'>
                    &copy; 2025 All rights reserved
                </div>
            </div>
        </div>
    );
};

export default Footer;