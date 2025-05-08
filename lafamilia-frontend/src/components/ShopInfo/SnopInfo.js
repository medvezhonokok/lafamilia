import React, {useState, useEffect} from 'react';
import './ShopInfo.css';
import shopBackground from '../../assets/shopBackground.webp';

const ShopInfo = () => {
    const [backgroundLoaded, setBackgroundLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = shopBackground;
        img.onload = () => setBackgroundLoaded(true);
    }, []);

    return (
        <div className={`shop-container ${backgroundLoaded ? 'loaded' : ''}`}>
            Coffee
            <div className='text shop-info'>
                Experience premium Colombian coffee, freshly roasted and tailor-packaged to your taste — shipped
                worldwide for your convenience.
            </div>
        </div>
    );
};

export default ShopInfo;