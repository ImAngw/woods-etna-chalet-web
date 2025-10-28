import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {Image} from "react-bootstrap";
import forestIcon from "../assets/icons/forest.png";
import climberIcon from "../assets/icons/climber.png";
import {useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';


function StructureDescriptions({slides, height, width}) {
    const navigate = useNavigate();
    const { t } = useTranslation();


    return (
        <div className={'personal-background'} style={{width: '100%'}}>
            <div style={{width: '100%'}}>
                <div className={'title-font'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                    {t('chalet_title')}
                    <Image style={{height: '50px', width: '80px', paddingLeft: '30px'}} src={forestIcon}/>
                </div>

                <div>
                    <h4 className={'myFont'}>
                        {t("home_paragraph_1")}
                    </h4>

                    <h4 className={'myFont'} style={{paddingTop: '15px', paddingBottom: '20px'}}>
                        {t("home_paragraph_3")}
                    </h4>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: width < 500 ? '10px' : '100px',
                    paddingBottom: '10px',
                    justifyContent: 'center'
                }}
            >
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px',
                    maxHeight: '700px',
                    display: 'flex',
                    justifyContent: "center",
                }}>
                    <Carousel
                        style={{maxWidth: '500px', maxHeight: '700px'}}>
                        {slides.map((slide, index) => (
                            <Carousel.Item key={index}>
                                <Image style={{
                                    width: width,
                                    height: '650px',
                                }} src={slide.img} fluid className='rounded-0'/>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <svg
                        viewBox="0 0 1440 150"
                        preserveAspectRatio="none"
                        style={{
                            position: "absolute",
                            top: -1,
                            left: 0,
                            width: "100%",
                            height: "30px",
                            transform: "rotate(180deg)",
                            zIndex: 2
                        }}
                    >
                        <path
                            className={"personal-background"}
                            d="M0,64 C360,160 1080,0 1440,64 L1440,150 L0,150 Z"/>
                    </svg>
                    <svg
                        viewBox="0 0 1440 150"       // griglia interna logica
                        preserveAspectRatio="none"    // permette di scalare l’onda liberamente
                        style={{
                            position: "absolute",
                            bottom: -2,
                            left: 0,
                            width: "100%",             // si adatta al width reale del container
                            height: "30px",            // altezza reale in px dell’onda
                        }}
                    >
                        <path
                            className={'personal-background'}
                            d="M0,64 C360,160 1080,0 1440,64 L1440,150 L0,150 Z"
                        />
                    </svg>
                </div>

                <div style={{maxWidth: '500px', width:'100%', justifyContent: 'flex-start', alignContent: 'center'}}>
                    <h4 className={'myFont'} style={{paddingTop: '15px'}}>
                        {t("home_paragraph_2")}
                    </h4>

                    <ul
                        className={'myFont'}
                        style={{paddingTop: '10px', paddingLeft: '20px',}}
                    >
                        <li>{t("4beds")}</li>
                        <li>{t("kitchen")}</li>
                        <li>{t("wifi")}</li>
                        <li>{t("bbq")}</li>
                        <li>{t("full_furn")}</li>
                    </ul>
                </div>
            </div>


            <div style={{width: '100%'}}>
                <div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                        <button
                            onClick={() => {
                                navigate('/services');
                            }}
                            style={{
                                border: "none",
                                cursor: "pointer",
                                textDecoration: "underline",

                            }}
                            className={'personal-background title-font'}
                        >
                            {t("activity_title")}
                            <Image style={{height: '50px', width: '80px', paddingLeft: '30px'}} src={climberIcon}/>
                        </button>
                    </div>

                    <h4 className={'myFont'}>
                        {t("home_paragraph_4")}
                    </h4>

                    <h4 className={'myFont'} style={{paddingTop: '15px'}}>
                        {t("home_paragraph_5")}
                    </h4>

                    <ul
                        className={'myFont'}
                        style={{
                            paddingTop: '10px',
                            paddingLeft: '30px',
                        }}
                    >
                        <li> {t("quad")}</li>
                        <li> {t("bike")}</li>
                        <li> {t("horse")}</li>
                        <li> {t("trekking")}</li>
                        <li> {t("helicopter")}</li>
                    </ul>
                </div>
            </div>

            <div style={{width: '100%', paddingBottom: '15px', paddingTop: '20px'}}>
                <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                    <button
                        onClick={() => {
                            navigate('/find_us'); // vai alla pagina
                        }}
                        style={{
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                        className={'personal-background title-font'}
                    >
                        {t("find_us_title")}
                    </button>
                </div>

                <div>
                    <h4 className={'myFont'} style={{paddingLeft: '15px', textAlign: 'left'}}>
                        {t("home_paragraph_6")}
                    </h4>

                </div>
            </div>

            <div style={{width: '100%', paddingBottom: '15px', paddingTop: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}} className={'title-font'}>
                    {t("close_to_us")}
                </div>
                <h4 className={'myFont'}>
                    {t("home_paragraph_7")}
                </h4>

                <h4 className={'myFont'} style={{paddingTop: '15px'}}>
                    {t("home_paragraph_8")}
                </h4>

                <ul
                    className={'myFont'}
                    style={{
                        paddingTop: '10px',
                        paddingLeft: '30px',
                        paddingBottom: '10px'
                    }}
                >
                    <li> {t("adv_park")}</li>
                    <li> {t("ski1")}</li>
                    <li> {t("ski2")}</li>
                    <li> {t("sapienza")}</li>
                    <li> {t("cable")}</li>
                    <li> {t("altomontana")}</li>
                </ul>

                <h4 className={'myFont'}>
                    {t("home_paragraph_9")}
                </h4>

            </div>

            <div style={{width: '100%', paddingBottom: '15px', paddingTop: '20px'}}>
                <div
                    style={{display: 'flex', flexDirection: 'row', justifyContent: 'left'}}>
                    <button
                        onClick={() => {
                            navigate('/book_page'); // vai alla pagina

                        }}
                        style={{
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                        className={'personal-background title-font'}
                    >
                        {t("book_now")}
                    </button>
                </div>
                <h4 className={'myFont'}>
                    {t("home_paragraph_10")}
                </h4>
            </div>

        </div>
    );
}

export default StructureDescriptions;