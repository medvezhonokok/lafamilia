import React from 'react';
import './Main.css';
import whiteLogo1 from "../../assets/whiteLogo1.svg";

const Main = () => {
    return (
        <div className='main-container'>
            <img src={whiteLogo1} alt={'Logo'}/>
            <button className='shop-coffee-button' onClick={() => window.location.href = '/shop'}>Shop our coffee
            </button>
        </div>
    );
};

export default Main;