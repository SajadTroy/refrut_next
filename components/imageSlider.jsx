'use client';

import '../styles/imageSlider.css';
import React,{useState} from "react";

const ImageSlider = () => {
    const slides = [
        (<div className="bento-child one">
            <div className="img-container">
                <img src="/img/multiple-idp-support.png" alt="" />
            </div>
            <h3>Multi-provider Support</h3>
            <p>Enable seamless authentication for all users by configuring multiple Identity Providers (IDPs).</p>
        </div>),

        (<div className="bento-child two">
             <div className="icon-container">
                <img src="/img/icons/graphics/glass.png" alt="kkkkkkk"/>
            </div> 
            <h3>Redirection Rules</h3>
            <p>Redirect users to their specific IDPs based on their email domains, groups, and directories.</p>
        </div>),

        (<div className="bento-child three">
            <div className="img-container">
                <img src="/img/multiple-idp-support.png" alt="" />
            </div>
            <div>
                <h3>JIT and SCIM Provisioning</h3>
                <p>Automate provisioning, group assignments, and attribute mapping for user ease and administrator efficiency.</p>
            </div>
        </div>),

        (<div className="bento-child four">
            <div className="icon-container">
                <img src="/img/icons/graphics/glass.png" alt="kkkkkk"/>
            </div>
            <h3>Customize Login Page</h3>
            <p>Customize the login interface to reflect your brand identity, ensuring a professional experience.</p>
        </div>),

        (<div className="bento-child five">
            {/* <div className="icon-container">
                <img src="6https://i.ibb.co/GpvhrMj/signed-encryption-support.png" alt=""/>
            </div> */}
            <div className="img-container">
                <img src="/img/multiple-idp-support.png" alt="" />
            </div>
            <h3>Signed Encryption Support</h3>
            <p>Ensure data integrity and prevent unauthorized access during transit through the use of signed and encrypted
                SAML assertions.</p>
        </div>)
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)}

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        )
    }
    
    return(
        <div className='slider-container'>
            <button className='prev' onClick={prevSlide}> &#10094; </button>
            <div className='slides'> 
                {slides[currentIndex]}    
            </div>
            <button className='next' onClick={nextSlide}> &#10095; </button>
        </div>
    )
}

export default ImageSlider