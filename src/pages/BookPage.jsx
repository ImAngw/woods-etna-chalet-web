import React from 'react';
import MyCalendar from "../components/MyCalendar";
import MyFooter from "../components/MyFooter";
import Header from "../components/Header";
import mainVerticalImage from "../assets/mobile_imgs/FullSizeRender.jpg";
import mainHorizontalImage from "../assets/desktop_imgs/homeHorizontal.png";
import { useTranslation } from 'react-i18next';

function BookPage({width}) {
    const { t } = useTranslation();
    const img = width < 600 ? mainVerticalImage : mainHorizontalImage;
    return (
        <div className={'personal-background'} style={{width: '100%'}}>
            {/* Nav Bar*/}
            <Header
                width={width}
                text={t("book_par_1")}
                image={img}
            />

            {/* Corpus*/}
            <div style={{paddingBottom:'15px'}}>
                <div>
                    <h4  className={'title-font'}>{t("book_now")}</h4>
                </div>
                <div>
                    <h4 className={'myFont'}>
                        {t("book_par_2")}
                    </h4>
                </div>
            </div>
            <MyCalendar width={width} />
            <MyFooter/>
        </div>
    );
}

export default BookPage;