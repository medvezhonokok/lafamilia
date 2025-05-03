import React from 'react';
import './ShopInfo.css';

const ShopInfo = () => {
    return (
        <div className='shop-container'>
            Lots
            <div className='text shop-info' style={{
                margin: "5rem auto",
                width: "60%",
                lineHeight: "inherit",
                letterSpacing: "1px",
                textAlign: "center"
            }}>
                Discover the finest Colombian coffee available on the market, custom-packaged to suit your
                preferences
                and delivered throughout the U.S. and Canada.
            </div>
        </div>
    );
};

export default ShopInfo;