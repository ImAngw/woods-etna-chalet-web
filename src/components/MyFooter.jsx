import React, { useState }  from 'react';
import {Image, Modal} from "react-bootstrap";
import mailIcon from "../assets/icons/email.png";
import phoneIcon from "../assets/icons/telephone.png";
import posIcon from "../assets/icons/placeholder.png";
import faceIcon from "../assets/icons/facebook.png";
import instaIcon from "../assets/icons/instagram.png";
import whatsappIcon from "../assets/icons/whatsapp.png";
import img from "../assets/logo/logo.svg";
import { useTranslation } from 'react-i18next';


function Footer() {
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    const { t } = useTranslation();
    const policy = t("privacyPolicy", { returnObjects: true });

    return (
        <footer style={{borderTop: "0px solid", color: "black"}}>
            <div style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                position: 'relative'
            }} className={'personal-background'}>

                <svg
                    viewBox="0 0 1440 150"
                    preserveAspectRatio="none"
                    style={{
                        position: "absolute",
                        top: -1,
                        left: 0,
                        width: "100%",
                        height: "25px",
                        transform: "rotate(180deg)",
                        zIndex: 2
                    }}
                >
                    <path
                        className={"personal-background"}
                        d="M0,64 C360,160 1080,0 1440,64 L1440,150 L0,150 Z"/>
                </svg>

                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(255,255,255,0.65)"
                    }}
                />
                <h4 style={{paddingBottom: '5px', fontSize: '35px', position: 'relative', paddingTop: '50px'}}
                    className={"title-font"}>
                    {t("contact")}
                </h4>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingLeft: '15px',
                    paddingBottom: '10px',
                    position: 'relative'
                }}>
                    <Image style={{height: '25px', width: '25px'}} src={posIcon}/>
                    <h6 className={'myFont'} style={{paddingLeft: '20px', fontSize: '20px'}}>Strada Milia S/N, Villaggio Valentino, Ragalna (CT)</h6>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingLeft: '15px',
                    paddingBottom: '10px',
                    position: 'relative'
                }}>
                    <Image style={{height: '25px', width: '25px'}} src={mailIcon}/>
                    <h6 className={'myFont'} style={{fontSize: '20px'}}>info@woodsetnachalet.it</h6>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    paddingLeft: '15px',
                    paddingBottom: '10px',
                    position: 'relative'
                }}>
                    <Image style={{height: '20px', width: '25px'}} src={phoneIcon}/>
                    <h6 className={'myFont'} style={{fontSize: '20px'}}>+39 347 685 2413</h6>
                </div>

                <h4 style={{paddingBottom: '5px', fontSize: '35px', position: 'relative'}} className={"title-font"}>
                    {t("social")}
                </h4>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignContent: 'center',
                    paddingLeft: '15px',
                    paddingBottom: '25px',
                    position: 'relative'
                }}>
                    <a href="https://www.facebook.com/people/Woods-Etna-Chalet/61567830632184/" target="_blank"
                       rel="noopener noreferrer">
                        <img
                            style={{height: '25px', width: '35px', paddingRight: '10px', cursor: 'pointer'}}
                            src={faceIcon}
                            alt="Facebook"
                        />
                    </a>
                    <a href="https://www.instagram.com/woods_etna_chalet/" target="_blank"
                       rel="noopener noreferrer">
                        <img
                            style={{height: '26px', width: '35px', paddingRight: '10px', cursor: 'pointer'}}
                            src={instaIcon}
                            alt="Instagram"
                        />
                    </a>

                    <a href="https://wa.me/3476852413" target="_blank"
                       rel="noopener noreferrer">
                        <img
                            style={{height: '28px', width: '40px', paddingRight: '10px', cursor: 'pointer'}}
                            src={whatsappIcon}
                            alt="Instagram"
                        />
                    </a>

                </div>

                <div className={'myFont'} style={{position: 'relative', paddingBottom: '15px', fontSize: '20px'}}>
                    CIR: 19087058C248780 <br />
                    CIN: IT087058C2GZFOBL7S <br />
                </div>


                <div>
                    <button
                        onClick={handleOpen}
                        style={{
                            position: 'relative',
                            border: "none",
                            cursor: "pointer",
                            textDecoration: "underline",
                            backgroundColor: "transparent",
                            fontSize: '20px',
                            paddingBottom: '35px',
                            color:'black'
                        }}
                        className={'title-font'}
                    >
                        privacy policy
                    </button>

                    <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Privacy Policy</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p style={{paddingBottom: '10px'}}>{policy.lastUpdate}</p>
                            <p style={{paddingBottom: '10px'}}>{policy.intro}</p>
                            <p style={{paddingBottom: '10px'}}><b>{policy.sections[0].heading}</b></p>
                            <p>{policy.sections[0].content0}<br />
                                {policy.sections[0].content1}
                            </p>

                            <p style={{paddingBottom: '10px'}}><b>{policy.sections[1].heading}</b></p>
                            <p>{policy.sections[1].content0}<br />
                                {policy.sections[1].content1}<br />
                                {policy.sections[1].content2}<br />
                                {policy.sections[1].content3}<br />
                                {policy.sections[1].content4}
                            </p>

                            <p style={{paddingBottom: '10px'}}><b>{policy.sections[2].heading}</b></p>
                            <p><b>{policy.sections[2].subsections[0].subheading}</b><br />
                                {policy.sections[2].subsections[0].content}
                            </p>

                            <p><b>{policy.sections[2].subsections[1].subheading}</b><br />
                                {policy.sections[2].subsections[1].content}
                            </p>

                            <p><b>{policy.sections[2].subsections[2].subheading}</b><br />
                                {policy.sections[2].subsections[2].content}
                            </p>

                            <p><b>{policy.sections[2].subsections[3].subheading}</b><br />
                                {policy.sections[2].subsections[3].content}
                            </p>

                            <p style={{paddingBottom: '10px'}}><b>{policy.sections[3].heading}</b></p>
                            <p>{policy.sections[3].content}</p>

                            <p style={{paddingBottom: '10px'}}><b>{policy.sections[4].heading}</b></p>
                            <p>{policy.sections[4].content}</p>





                        </Modal.Body>

                    </Modal>
                </div>



                <div style={{position: 'relative', paddingBottom: '5px', textAlign: 'center', fontSize: '11px'}}>

                </div>
            </div>
        </footer>
    );
}

export default Footer;

