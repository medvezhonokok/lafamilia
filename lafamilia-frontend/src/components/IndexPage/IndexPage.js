import React from 'react';
import './IndexPage.css';
import Menu from "../Menu/Menu";
import Main from "../Main/Main";
import About from "../About/About";
import Shipping from "../Shipping/Shipping";
import Info from "../Info/Info";
import ProductionStage from "../ProductionStage/ProductionStage";
import Footer from "../Footer/Footer";

const IndexPage = () => {
    return (
        <div>
            <Menu index={true}/>
            <Main/>
            <About/>
            <Shipping/>
            <Info/>
            <ProductionStage/>
            <Footer/>
        </div>
    );
};

export default IndexPage;