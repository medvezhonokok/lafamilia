import React from 'react';
import './Shipping.css';
import car from "../../assets/car.svg";
import plane from "../../assets/plane.svg";
import container from "../../assets/container.svg";

const Shipping = ({isMobile}) => {
    const shippingItems = [
        {
            image: car,
            weight: "24-60 kg",
            text: "Courier Service Delivery “to the door” (DHL/FedEx) – suitable for individuals or small companies. " +
                "It does not require customs clearance, with a delivery time of up to 2 weeks."
        },
        {
            image: plane,
            weight: "from 120 kg",
            text: "Air Delivery – ideal for quick shipments of coffee weighing from 120 kg. " +
                "This option includes delivery to the destination airport (CIP) or to the door (DDP). " +
                "In this case, customs clearance by a third-party broker may be required."
        },
        {
            image: container,
            weight: ">26 tons",
            text: "Container Shipping – the most economical but also the slowest delivery method.\n" +
                "We work directly with shipping lines such as MSC, Hapag-Lloyd, Maersk, and CMA."
        }
    ];

    return (
        <div className='shipping-container'>
            <h2 style={{fontSize: "4rem"}}><span className='green'>W</span>orldwide Shipping</h2>
            <div className='text shipping-description-container'>
                <div className='shipping-text-1'>
                    From <span className='green'>50</span> kg
                </div>
                <div className='shipping-text-2'>
                    We addopt flexible approach when working with clients, offerinf different delivery options
                </div>
            </div>
            <div className={`shipping-items-container`}>
                {shippingItems.map(((item, idx) =>
                        <div className='shipping-item-container'>
                            <img src={item.image} alt={`shipping-${idx}`}/>
                            <div className='shipping-item-weight' style={{fontSize: "30px"}}>
                                {item.weight}
                            </div>
                            <div className='text' style={{lineHeight: "normal", textAlign: "justify"}}>
                                {item.text}
                            </div>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default Shipping;