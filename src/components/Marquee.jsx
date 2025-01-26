import React from 'react';
import './Marquee.css';

const Marquee = () => {
    const marqueeItems = [
        { icon: '🚀', text: 'Transforming Ideas into Reality' },
        { icon: '💡', text: 'Innovative Digital Solutions' },
        { icon: '🎨', text: 'Creative Design & Development' },
        { icon: '⚡', text: 'High Performance Web Apps' },
        { icon: '🌐', text: 'Global Digital Presence' },
        { icon: '🔮', text: 'Future-Ready Technology' },
        { icon: '✨', text: 'Seamless User Experience' },
        { icon: '🛠️', text: 'Custom Development' }
    ];

    return (
        <div className="marquee-container">
            <div className="marquee-track">
                <div className="marquee-content">
                    {marqueeItems.map((item, index) => (
                        <div key={index} className="marquee-item">
                            <span className="marquee-icon">{item.icon}</span>
                            <span className="marquee-text">{item.text}</span>
                            <span className="marquee-separator">|</span>
                        </div>
                    ))}
                </div>
                <div className="marquee-content" aria-hidden="true">
                    {marqueeItems.map((item, index) => (
                        <div key={`duplicate-${index}`} className="marquee-item">
                            <span className="marquee-icon">{item.icon}</span>
                            <span className="marquee-text">{item.text}</span>
                            <span className="marquee-separator">|</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    );
};

export default Marquee; 