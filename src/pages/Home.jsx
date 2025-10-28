import React, {useState} from 'react';
import MyCarousel from "../components/MyCarousel";
import MyNavBar from "../components/NavBar";
import StructureDescriptions from "../components/HomeDescriptions";
import MyFooter from "../components/MyFooter";




function Home({ width, height }) {
    const [hovered, setHovered] = useState(false);
    let imgs, chalet_imgs;
    let urls, urls_chalet;
    if (width <= 600) {
        imgs = import.meta.glob('/src/assets/mobile_imgs/*.{jpg,png,svg}', { eager: true });
        chalet_imgs = import.meta.glob('/src/assets/mobile_chalet_imgs/*.{jpg,png,svg}', { eager: true });
    } else {
        imgs = import.meta.glob('/src/assets/desktop_imgs/*.{jpg,png,svg}', { eager: true });
        chalet_imgs = import.meta.glob('/src/assets/mobile_chalet_imgs/*.{jpg,png,svg}', { eager: true });
    }

    urls = Object.values(imgs).map(img => img.default || img);
    urls_chalet = Object.values(chalet_imgs).map(chalet_imgs => chalet_imgs.default || chalet_imgs);

    const titles = ["Prima slide", "Seconda slide", "Terza slide"];
    const texts = ["Descrizione prima slide", "Descrizione seconda slide", "Descrizione terza slide"];

    const slides = urls.map((img, index) => ({
        img,
        title: titles[index],
        text: texts[index],
    }));

    const chalet_slides = urls_chalet.map((img, index) => ({img}));


    return (
        <div style={{width: '100%'}}>
            <div style={{position: 'relative', width: '100%', height: '100%'}}>
                <div
                    key="navbar-overlay" // mantiene stabile il nodo DOM
                    onMouseLeave={() => setHovered(false)}
                    onMouseEnter={() => setHovered(true)}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        zIndex: 10, // << questo la porta in primo piano
                        padding: '1rem',
                        backgroundColor: hovered
                            ? "rgba(255, 255, 255, 0.65)" // più scuro al passaggio del mouse
                            : "rgba(0, 0, 0, 0.01)", // più trasparente normalmente
                        transition: "background-color 0.5s ease",
                    }}
                >
                    <MyNavBar/>
                </div>
                <div>
                     <MyCarousel slides={slides} height={height} width={width}/>
                </div>
            </div>

            <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{width: '100%'}}>
                    <StructureDescriptions slides={chalet_slides} height={height} width={width}/>
                    <MyFooter/>
                </div>
            </div>
        </div>

    )
        ;
}

export default Home;
