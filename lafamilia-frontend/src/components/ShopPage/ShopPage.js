import React from 'react';
import './ShopPage.css';
import Menu from "../Menu/Menu";
import ShopInfo from "../ShopInfo/SnopInfo";
import Lots from "../Lots/Lots";
import OrderSamples from "../OrderSamples/OrderSamples";
import ShopFooter from "../ShopFooter/ShopFooter";

const ShopPage = ({lots}) => {

    return (
        <>
            <Menu index={false}/>
            <ShopInfo/>
            <Lots lots={lots}/>
            <OrderSamples/>
            <ShopFooter/>
        </>
    );
};

export default ShopPage;