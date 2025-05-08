import React, {useState, useEffect} from 'react';
import './Main.css';
import whiteLogo from "../../assets/whiteLogo.svg";
import backgroundImage from "../../assets/indexBackground.webp";

const Main = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = backgroundImage;
        img.onload = () => setIsLoaded(true);

        return () => {
            img.onload = null;
        };
    }, []);

    return (
        <div className={`main-container ${isLoaded ? 'loaded' : ''}`}>
            <div className='main-container-content'>
                <img
                    src={whiteLogo}
                    alt={'Logo'}
                    className={`logo-image ${isLoaded ? 'animate' : ''}`}
                />
                <div className={`columbian-coffee-exporter ${isLoaded ? 'animate' : ''}`}>
                    Colombian coffee exporter
                </div>
                <button
                    className={`shop-coffee-button ${isLoaded ? 'animate' : ''}`}
                    onClick={() => window.location.href = '/shop'}
                >
                    Shop our coffee
                </button>
            </div>
        </div>
    );
};

export default Main;