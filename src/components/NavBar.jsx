import React from 'react';
import img from '../assets/logo/logo.svg';
import {Image } from 'react-bootstrap';
import MyOffCanvas from "./MyOffcanvas";


function MyNavBar() {
    const height = '100px'
    const width = '100%'

    return (

        <div style={{height: height, width: width, display: 'flex', position: 'relative', alignItems: 'center'}}>
            <div style={{ position: 'absolute', left: '5%', top: '50%' }}>
                <MyOffCanvas/>
            </div>
            <div style={{height: '100%', width: '100%'}}>
                <Image style={{height: '100%', width: '100%'}} src={img} fluid rounded/>
            </div>



        </div>


    );
}

export default MyNavBar;