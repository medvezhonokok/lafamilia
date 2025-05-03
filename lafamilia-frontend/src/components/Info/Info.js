import React from 'react';
import './Info.css';

const Info = () => {
    return (
        <div className='info-container'>
            <div className='info-content'>
                <h2 className='info-title'>
                    We offer specialty green beans categorized<br/>into five distinct groups.
                </h2>
                <p className='info-text'>
                    Explore our selection of available lots.
                    <br/><br/><br/>
                    To receive the complete price list, please<br/>fill out the form below.
                </p>
                <button className='info-button' onClick={() => window.location.href = '/shop'}>
                    Get the quote
                </button>
            </div>
        </div>
    );
};

export default Info;