import React from 'react';
import './ProductionStage.css';
import stage1 from "../../assets/stage1.png";
import stage2 from "../../assets/stage2.png";
import stage3 from "../../assets/stage3.png";
import stage4 from "../../assets/stage4.png";
import stage5 from "../../assets/stage5.png";

const ProductionStage = () => {
    const stages = [
        {
            image: stage1,
            text: "We establish direct partnerships with dedicated coffee farmers, ensuring the highest quality beans."
        },
        {
            image: stage2,
            text: "Our expert team expertly handles hulling and sorting to ensure the best selections."
        },
        {
            image: stage3,
            text: "Each micro-lot is meticulously assessed and described in our lab for transparency and quality."
        },
        {
            image: stage4,
            text: "We meticulously oversee every stage of the pre-export preparation to guarantee premium coffee for you."
        },
        {
            image: stage5,
            text: "After hulling, we package the coffee in vacuum-sealed bags to preserve its rich aroma and flavor."
        },
    ];

    return (
        <div className='production-stage-container'>
            <h2 style={{ fontSize: "4rem" }}>
                <span className='red'>P</span>roduction stages
            </h2>

            <div className="stages-grid">
                {stages.map((stage, index) => (
                    <div key={index} className="stage-card">
                        <img src={stage.image} alt={stage.name} />
                        <p className='text' style={{fontSize: "20px", textAlign: 'left'}}>{stage.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductionStage;