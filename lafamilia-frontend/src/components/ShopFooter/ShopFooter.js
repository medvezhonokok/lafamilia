import React from 'react';
import './ShopFooter.css';
import blackLogo from "../../assets/blackLogo.svg";
import {FaEnvelope, FaInstagram, FaPhoneAlt} from "react-icons/fa";

const ShopFooter = () => {
    return (
        <div style={{
            marginTop: "5rem"
        }}>
            <div className='footer-row'>
                <img src={blackLogo} alt="La Familia Cafe Logo" className='footer-logo'/>

                <div className='footer-address'>
                    Cra. 100 #11-60, Holguines Trade Center,<br/>
                    Torre Farallones of 311, Cali<br/>
                    <div className="contact-item">
                        <FaPhoneAlt fill={'black'} className="contact-icon"/>
                        <a style={{color: "black"}} href="tel:+57 3176444299">+57 317 644 42 99</a>

                    </div>
                    </div>

                    <div className='footer-links-group'>
                        <div className='shop-footer-links black'>
                            <a href='/'>About</a>
                            <a href='/shop'>Lots</a>
                        </div>
                        <div className='shop-footer-links'>
                            <div className="contact-item">
                                <FaEnvelope fill={'black'} className="contact-icon" style={{marginTop: "0.2rem"}}/>
                                <a href="mailto:sales.lafamiliacafe@gmail.com">sales.lafamiliacafe@gmail.com</a>
                            </div>
                            <div className="contact-item">
                                <FaInstagram fill={'black'} className="contact-icon" style={{marginTop: "0.2rem"}}/>
                                <a href='https://www.instagram.com/la_familia_cafe_colombiano/' target="_blank"
                                   rel="noopener noreferrer">Instagram</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer-copyright'>
                &copy; 2025 All rights reserved
            </div>
        </div>
    );
};

export default ShopFooter;