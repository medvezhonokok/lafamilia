import React from 'react';
import './ShopPage.css';
import Menu from "../Menu/Menu";
import ShopInfo from "../ShopInfo/SnopInfo";
import Lots from "../Lots/Lots";
import OrderSamples from "../OrderSamples/OrderSamples";

const ShopPage = ({lots}) => {

    return (
        <>
            <Menu/>
            <ShopInfo/>
            <Lots lots={lots}/>
            <OrderSamples/>
        </>
    );
};

export default ShopPage;