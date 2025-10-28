import React from 'react';
import MyFooter from "../components/MyFooter";
import quadImg from "../assets/activities/quad_excursion.jpg"
import bikeImg from "../assets/activities/bike.jpg"
import horseImg from "../assets/activities/horse.jpeg"
import trekkingImg from "../assets/activities/trekking.jpg"
import elicopterImg from "../assets/activities/elicopter.jpg"
import ActivityContent from "../components/ActivityContent";
import mainVerticalImage from "../assets/mobile_imgs/activityImgV.jpg";
import mainHorizontalImage from "../assets/desktop_imgs/activityImgH.png";
import Header from "../components/Header";
import { useTranslation } from 'react-i18next';



function MyServices({ width }) {
    const { t } = useTranslation();
    const w = width < 600 ? '90%' : '45%';
    const img = width < 600 ? mainVerticalImage : mainHorizontalImage;

    return (
        <div className={'personal-background'} style={{width: '100%'}}>
            {/* Nav Bar*/}
            <Header
                width={width}
                text={t("act_par_1")}
                image={img}
            />

            {/* Description*/}
            <div style={{paddingBottom: '20px'}}>
            <div className={'title-font'}>
                {t("activity_title")}
                </div>
                <div>
                    <h4 className={'myFont'} style={{paddingBottom: '15px'}}>
                        {t("act_par_2")}
                    </h4>

                    <h4 className={'myFont'} style={{paddingBottom: '15px'}}>
                        {t("act_par_3")}
                    </h4>
                </div>
            </div>

            <ActivityContent
                width={width}
                title={t("quad")}
                description={t("quad_desc")}
                image={quadImg}
                reversed={true}
            />
            <hr style={{width: '90%', margin: '40px auto', borderTop: '5px solid black', paddingBottom: '30px'}}/>

            <ActivityContent
                width={width}
                title={t("bike")}
                description={t("bike_desc")}
                image={bikeImg}
                reversed={false}
            />
            <hr style={{width: '90%', margin: '40px auto', borderTop: '5px solid black', paddingBottom: '30px'}}/>

            <ActivityContent
                width={width}
                title={t("horse")}
                description={t("horse_desc")}
                image={horseImg}
                reversed={true}
            />
            <hr style={{width: '90%', margin: '40px auto', borderTop: '5px solid black', paddingBottom: '30px'}}/>

            <ActivityContent
                width={width}
                title={t("trekking")}
                description={t("trekking_desc")}
                image={trekkingImg}
                reversed={false}
            />
            <hr style={{width: '90%', margin: '40px auto', borderTop: '5px solid black', paddingBottom: '30px'}}/>

            <ActivityContent
                width={width}
                title={t("helicopter")}
                description={t("helicopter_desc")}
                image={elicopterImg}
                reversed={true}
            />

            <div style={{paddingBottom: '30px'}}/>


            <MyFooter/>
        </div>
    );
}

export default MyServices;