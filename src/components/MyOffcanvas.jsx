import React, { useState } from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";
import menuIcon from '../assets/icons/menu.png'
import itaIcon from '../assets/icons/it.png'
import engIcon from '../assets/icons/en.png'

import {Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';




function MyOffCanvas() {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div style={{display: "flex", flexDirection: 'column', justifyContent: "flex-end"}}>
            <button
                onClick={handleShow}
                style={{
                    border: "none",
                    cursor: "pointer",
                    background: "transparent",
                    padding: 0,
                }}
            >
                <Image style={{height: '30px', width: '30px'}} src={menuIcon}/>
            </button>

            <Offcanvas show={show} onHide={handleClose} style={{width: '300px'}}>
                <Offcanvas.Header>
                    <Offcanvas.Title>
                        <h4 className={'title-font'} style={{fontSize: '40px'}}> Woods Etna Chalet</h4>
                        <h4 className={'myFont'} style={{fontSize: '22px', textAlign: 'center'}}> Natural
                            experience</h4>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <button
                        onClick={() => {
                            navigate('/');
                            window.scrollTo(0, 0);
                        }}
                        style={{
                            border: "none",
                            cursor: "pointer",
                            background: "transparent",
                            padding: 0,
                        }}
                    >
                        <h4 className={'myFont'} style={{fontSize: '30px', textAlign: 'center'}}>Home</h4>
                    </button>
                    <hr style={{margin: "5px 0", borderColor: "#ccc"}}/>

                    <button
                        onClick={() => {
                            navigate('/services');
                            window.scrollTo(0, 0);
                        }}
                        style={{
                            border: "none",
                            cursor: "pointer",
                            background: "transparent",
                            padding: 0,
                        }}
                    >
                        <h4 className={'myFont'} style={{fontSize: '30px', textAlign: 'center'}}>
                            {t("activity_title")}
                        </h4>
                    </button>
                    <hr style={{margin: "5px 0", borderColor: "#ccc"}}/>

                    <button
                        onClick={() => {
                            navigate('/find_us');
                            window.scrollTo(0, 0);
                        }}
                        style={{
                            border: "none",
                            cursor: "pointer",
                            background: "transparent",
                            padding: 0,
                        }}
                    >
                        <h4 className={'myFont'} style={{fontSize: '30px', textAlign: 'center'}}>
                            {t("find_us_title")}
                        </h4>
                    </button>
                    <hr style={{margin: "5px 0", borderColor: "#ccc"}}/>

                    <button
                        onClick={() => {
                            navigate('/book_page');
                            window.scrollTo(0, 0);
                        }}
                        style={{
                            border: "none",
                            cursor: "pointer",
                            background: "transparent",
                            padding: 0,
                        }}
                    >
                        <h4 className={'myFont'} style={{fontSize: '30px', textAlign: 'center'}}>
                            {t("book_now")}
                        </h4>
                    </button>
                    <hr style={{margin: "5px 0", borderColor: "#ccc"}}/>

                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: '30px',
                        justifyContent: 'center',
                        paddingTop: '30px'
                    }}>
                        <button
                            onClick={() => changeLanguage('it')}
                            style={{
                                border: "none",
                                cursor: "pointer",
                                background: "transparent",
                                padding: 0,
                            }}
                        >
                            <Image style={{height: '30px', width: '30px'}} src={itaIcon}/>
                        </button>

                        <button
                            onClick={() => changeLanguage('en')}
                            style={{
                                border: "none",
                                cursor: "pointer",
                                background: "transparent",
                                padding: 0,
                            }}
                        >
                            <Image style={{height: '30px', width: '30px'}} src={engIcon}/>
                        </button>
                    </div>
                </Offcanvas.Body>

                <h4 style={{display: 'flex', justifyContent: 'center', fontSize:'12px'}}>

                </h4>
            </Offcanvas>


        </div>

    );
}

export default MyOffCanvas;