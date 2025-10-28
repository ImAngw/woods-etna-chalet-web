import React, { useEffect, useRef } from 'react';
import mainVerticalImage from "../assets/mobile_imgs/findUsImgV.png";
import mainHorizontalImage from "../assets/desktop_imgs/findUsImgH.png";
import MyFooter from "../components/MyFooter";
import Header from "../components/Header";
import { useTranslation } from 'react-i18next';






function FindUs({width}) {
    const { t } = useTranslation();
    const img = width < 600 ? mainVerticalImage : mainHorizontalImage;

    return (
        <div className={'personal-background'} style={{width: '100%'}}>
            {/* Nav Bar*/}
            <Header
                width={width}
                text={""}
                image={img}
            />

            {/* Corpus */}
            <div style={{paddingBottom: '20px'}}>
                <div className={'title-font'}>
                    {t("find_us_title")}
                </div>
                <div>
                    <h4 className={'myFont'} style={{paddingBottom: '25px'}}>
                        {t("find_par_2")}
                    </h4>

                    <h4 className={'myFont'} style={{paddingBottom: '0px'}}>
                        {t("lat")}
                    </h4>
                    <h4 className={'myFont'} style={{paddingBottom: '25px'}}>
                        {t("long")}
                    </h4>
                    {/*
                    <h4 className={'myFont'} style={{paddingBottom: '25px'}}>
                        {t("high")}
                    </h4>
                    */}

                    <div style={{ width: '90%', margin: '0 auto', textAlign: 'center' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4677.967697592911!2d14.944786605808853!3d37.6919031035874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x131155b25b12bcb9%3A0xeb28c2ef9d0d5260!2sWoods%20Etna%20Chalet!5e0!3m2!1sit!2sit!4v1760953165384!5m2!1sit!2sit"
                            width="100%"
                            height="250px"
                            style={{ border: 0, borderRadius: '12px', display: 'block' }}
                            allowFullScreen
                            loading="lazy"
                            title="Mappa struttura"
                        />
                        <p style={{ fontSize: '8px', color: '#555', marginTop: '6px' }}>
                            La mappa è fornita da Google Maps e utilizza cookie essenziali per funzionare correttamente.
                        </p>
                    </div>

                    <h4 className={'myFont'} style={{paddingBottom: '25px', paddingTop: '25px'}}>
                        {t("find_par_3")}
                    </h4>

                    <h4 className={'myFont'} style={{paddingBottom: '25px'}}>
                        {t("find_par_4")}
                    </h4>
                </div>
            </div>

            <MyFooter/>


        </div>
    );
}

export default FindUs;