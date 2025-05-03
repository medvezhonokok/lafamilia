import React from 'react';
import './Main.css';
import whiteLogo from "../../assets/whiteLogo.svg";

const Main = () => {
    return (
        <div className='main-container'>
            <img src={whiteLogo} alt={'Logo'}/>
            <button className='shop-coffee-button' onClick={() => window.location.href = '/shop'}>Shop our coffee
            </button>
        </div>
    );
};

export default Main;