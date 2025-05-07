import React from 'react';
import './Footer.css';
import whiteLogo from '../../assets/whiteLogo.svg';
import { FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <div className='footer-row'>
                    <div className='footer-col-1'>
                        <img src={whiteLogo} alt="La Familia Cafe Logo" className='footer-logo'/>

                        <div className='footer-address'>
                            Cra. 100 #11-60, Holguines Trade Center,<br/>
                            Torre Farallones of 311, Cali<br/>
                            <br/>
                            <div className="contact-item">
                                <FaPhoneAlt className="contact-icon" />
                                <a style={{color: "white"}} href="tel:+57 3176444299">+57 317 644 42 99</a>
                            </div>
                        </div>
                    </div>

                    <div className='footer-links-group'>
                        <div className='footer-links about-lots'>
                            <a href='/'>About</a>
                            <a href='/shop'>Lots</a>
                        </div>
                        <div className='footer-links'>
                            <div className="contact-item">
                                <FaEnvelope className="contact-icon" style={{marginTop: "0.2rem"}}/>
                                <a href="mailto:sales.lafamiliacafe@gmail.com">sales.lafamiliacafe@gmail.com</a>
                            </div>
                            <div className="contact-item">
                                <FaInstagram className="contact-icon" style={{marginTop: "0.2rem"}}/>
                                <a href='https://www.instagram.com/la_familia_cafe_colombiano/' target="_blank" rel="noopener noreferrer">Instagram</a>
                            </div>
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