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
                Experience premium Colombian coffee, freshly roasted and tailor-packaged to your taste — shipped worldwide for your convenience.
            </div>
        </div>
    );
};

export default ShopInfo;