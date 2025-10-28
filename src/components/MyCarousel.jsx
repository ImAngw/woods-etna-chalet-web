import React from 'react';
import { Image } from 'react-bootstrap';
import mainVerticalImage from "../assets/mobile_imgs/FullSizeRender.jpg"
import mainHorizontalImage from "../assets/desktop_imgs/homeHorizontal.png"


function MyCarousel({slides, height, width}) {
    return (
        <div style={{position: 'relative'}}>
            <Image style={{
                width: width,
                height: height
            }} src={width < 500 ? mainVerticalImage : mainHorizontalImage} fluid className='rounded-0'/>

            <svg
                viewBox="0 0 1440 150"       // griglia interna logica
                preserveAspectRatio="none"    // permette di scalare l’onda liberamente
                style={{
                    position: "absolute",
                    bottom: -1,
                    left: 0,
                    width: "100%",             // si adatta al width reale del container
                    height: "60px",            // altezza reale in px dell’onda
                }}
            >
                <path
                    className={'personal-background'}
                    d="M0,64 C360,160 1080,0 1440,64 L1440,150 L0,150 Z"
                />
            </svg>

            <div style={{display: 'flex', justifyContent: 'column'}}>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: height < 500 ? '50px' : '100px',
                        fontFamily: 'AlphaWood',
                        textShadow: '3px 3px 8px rgba(0,0,0,1)',
                        textAlign: 'center',
                        width: '100%',
                    }}
                >
                    Woods Etna Chalet
                </div>

                <div
                    style={{
                        position: 'absolute',
                        top: '90%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: '20px',
                        fontFamily: 'AlphaWood',
                        textShadow: '3px 3px 8px rgba(0,0,0,1)',
                        textAlign: 'center'
                    }}
                >
                    Natural Experience
                </div>
            </div>
        </div>
    );
}

export default MyCarousel;
