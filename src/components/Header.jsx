import React from 'react';
import MyNavBar from "./NavBar";
import {Image} from "react-bootstrap";

function Header({width, text, image}) {
    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    padding: '1rem',
                }}
            >
                <MyNavBar/>
            </div>

            <div style={{position: "absolute", top: "50%", left: "50%"}}>
                <h4 className={'myFont'} style={{textAlign: 'left', color: 'white', paddingBottom: '20px'}}>{text}</h4>
            </div>

            <div>
                <Image style={{
                    width: width,
                    maxHeight: '500px'
                }} src={image} fluid className='rounded-0'/>

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
            </div>
        </div>
    );
}

export default Header;