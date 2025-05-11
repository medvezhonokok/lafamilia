import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className='about-container'>
            <h2 style={{fontSize: "4rem"}}><span className='red'>A</span>bout</h2>
            <div className='about-text-containers'>
                <div className='text'>
                    We are a <span className={'red'}>family-run</span> business dedicated to sourcing and exporting exceptional coffee from Colombia to
                    the global market. Our focus is solely on <span className={'red'}>Colombia</span>, where we explore the diverse regions and build
                    authentic relationships with farmers, particularly in vulnerable areas that are just beginning to
                    embrace specialty coffee.
                </div>
                <div className='text'>
                    Our mission is to deliver the highest quality coffee by partnering with producers on meticulously
                    selected micro, nano, and pico lots. Through this approach, we ensure that our passion for Colombian
                    coffee not only benefits our buyers but also supports sustainable farming practices.
                </div>
            </div>
        </div>
    );
};

export default About;