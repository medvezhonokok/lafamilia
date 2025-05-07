import React from 'react';
import './Main.css';
import whiteLogo from "../../assets/whiteLogo.svg";

const Main = () => {
    return (
        <div className='main-container'>
            <div className='main-container-content'>
                <img src={whiteLogo} alt={'Logo'}/>
                <div className='columbian-coffee-exporter'>
                    Colombian coffee exporter
                </div>
                <button className='shop-coffee-button' onClick={() => window.location.href = '/shop'}>Shop our coffee
                </button>
            </div>
        </div>
    );
};

export default Main;