import React from 'react';
import './IndexPage.css';
import Menu from "../Menu/Menu";
import Main from "../Main/Main";
import About from "../About/About";
import Shipping from "../Shipping/Shipping";
import Info from "../Info/Info";

const IndexPage = () => {
    return (
        <div>
            <Menu/>
            <Main/>
            <About/>
            <Shipping/>
            <Info/>
        </div>
    );
};

export default IndexPage;