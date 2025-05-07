import React, {useState} from 'react';
import './Lots.css';
import filter from "../../assets/filter.svg";
import loop from "../../assets/loop.svg";
import ReactApexChart from 'react-apexcharts';
import {LotVariety, LotProcessing} from "../AdminPage/AdminPage";

const Lots = ({lots}) => {
    const [expandedLotId, setExpandedLotId] = useState(null);
    const [processingFilter, setProcessingFilter] = useState('ALL');
    const [varietySearch, setVarietySearch] = useState('');

    const filteredLots = lots.filter(lot => {
        const matchesProcessing = processingFilter === 'ALL' ||
            lot.processing === processingFilter;

        const matchesVariety = varietySearch === '' ||
            lot.variety.toLowerCase().includes(varietySearch.toLowerCase()) ||
            LotVariety[lot.variety]?.displayName.toLowerCase().includes(varietySearch.toLowerCase());

        return matchesProcessing && matchesVariety;
    });

    const formatEnumText = (text) => {
        return text.toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    const toggleLotExpand = (lotId) => {
        setExpandedLotId(expandedLotId === lotId ? null : lotId);
    };

    const renderFlavorWheel = (descriptors) => {
        if (!descriptors || descriptors.length === 0) return null;

        const series = descriptors.map(desc => ({
            x: desc.name,
            y: Math.floor(Math.random() * 41) + 60,
            fillColor: desc.colorHex
        }));

        const options = {
            chart: {
                type: 'radialBar',
                height: 400,
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -120,
                    endAngle: 120,
                    hollow: {
                        size: '40%',
                    },
                    track: {
                        background: '#f8f8f8',
                        strokeWidth: '70%',
                        margin: 5,
                    },
                    dataLabels: {
                        name: {
                            show: true,
                            fontSize: '12px',
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 600,
                            color: '#333',
                            offsetY: 5
                        },
                        value: {
                            show: true,
                            formatter: function (val) {
                                return val;
                            },
                            fontSize: '14px',
                            fontFamily: 'Arial, sans-serif',
                            fontWeight: 600,
                            color: '#333',
                            offsetY: -20
                        },
                        total: {
                            show: false
                        }
                    },
                    barSize: '60%',
                }
            },
            fill: {
                type: 'solid',
                opacity: 0.9
            },
            stroke: {
                lineCap: 'round',
                width: 0
            },
            labels: series.map(item => item.x),
            colors: series.map(item => item.fillColor),
            legend: {
                show: false
            },
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: {
                        height: 350
                    },
                    plotOptions: {
                        radialBar: {
                            dataLabels: {
                                name: {
                                    fontSize: '10px'
                                },
                                value: {
                                    fontSize: '12px'
                                }
                            }
                        }
                    }
                }
            }]
        };

        return (
            <div className="flavor-wheel-container">
                <ReactApexChart
                    options={options}
                    series={series.map(item => item.y)}
                    type="radialBar"
                    height={350}
                />
                <div className="descriptor-labels">
                    {series.map((descriptor, index) => (
                        <div key={index} className="descriptor-label">
                        <span
                            className="color-marker"
                            style={{backgroundColor: descriptor.fillColor}}
                        />
                            <span className="descriptor-name">{descriptor.x}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className='lots-container'>
            <div className="filters-panel">
                <div className="filter-group">
                    <img style={{height: '60%', margin: 'auto 0'}} src={filter} alt='filter'/>
                    <select
                        style={{
                            border: 'none',
                            width: '100%'
                        }}
                        id="processing-filter"
                        value={processingFilter}
                        onChange={(e) => setProcessingFilter(e.target.value)}
                    >
                        <option value="ALL">Filter</option>
                        {Object.entries(LotProcessing).map(([key, value]) => (
                            <option key={key} value={key}>
                                {value.displayName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <img src={loop} alt={'loop'}/>
                    <input
                        id="variety-search"
                        type="text"
                        placeholder={" Variety..."}
                        value={varietySearch}
                        onChange={(e) => setVarietySearch(e.target.value)}
                    />
                </div>
            </div>
            <div className='lots-grid'>
                {filteredLots.map((lot) => (
                    <div
                        key={lot.id}
                        role="button"
                        tabIndex={0}
                        className={`lot-card ${expandedLotId === lot.id ? 'expanded' : ''}`}
                        onClick={() => toggleLotExpand(lot.id)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') toggleLotExpand(lot.id);
                        }}
                    >
                        <div className={`card-content text ${expandedLotId === lot.id ? 'expanded' : ''}`}>
                            {expandedLotId !== lot.id ? (
                                <>
                                    <div className='lot-header'>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}>
                                            <div>{lot.price + "$ for kg"} <span
                                                className={'lot-info-popup'}
                                                style={{fontSize: "18px", color: "grey"}}>EXW</span></div>
                                            <p style={{margin: "0"}}>{"Q" + lot.qGrade}</p>
                                        </div>
                                        <div className='lot-variety-farm'>
                                            {formatEnumText(lot.variety)}
                                            <span>{lot.farm}</span>
                                        </div>
                                    </div>

                                    <div className='lot-header-2'>
                                        <div>
                                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                                <span className='span-lot-card'>Region</span>
                                                {formatEnumText(lot.department)}
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                                <span className='span-lot-card'>Process</span>
                                                {formatEnumText(lot.processing)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'lot-description text'}>
                                        {lot.description}
                                    </div>
                                </>
                            ) : (
                                <div className="expanded-view">
                                    <div className="ratings-grid">
                                        {['Aroma', 'Flavor', 'Aftertaste', 'Acidity', 'Body', 'Balance'].map((item) => (
                                            <div key={item} className="rating-item">
                                                <span>{item}</span>
                                                {lot[item.toLowerCase()]}
                                            </div>
                                        ))}
                                    </div>
                                    {renderFlavorWheel(lot.flavorDescriptors)}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Lots;