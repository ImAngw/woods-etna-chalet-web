import React from 'react';
import {Image} from "react-bootstrap";


function ActivityContent({width, title, description, image, reversed}) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: width < 500 ? '10px' : '270px',
                paddingBottom: '10px',
                flexDirection: reversed ? 'row-reverse' : 'row',

            }}
        >
            <div style={{maxWidth: '500px'}}>
                <h4 className={'title-font'}
                    style={{fontSize: '40px', textAlign: 'center', paddingLeft: '0px'}}>
                    {title}
                </h4>
                {/*
                <h4 className={'myFont'}
                    style={{paddingBottom: '10px', paddingTop: '0px', fontSize: '20px', textAlign: 'center'}}>
                    {description}
                </h4>
                */}
            </div>

            <Image style={{width: '85%', borderRadius: '14px', maxHeight: '400px', maxWidth: '400px'}}
                   src={image}/>
        </div>

    );
}

export default ActivityContent;