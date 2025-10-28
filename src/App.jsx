import Home from "./pages/Home";
import MyServices from "./pages/Services";
import BookPage from "./pages/BookPage";
import FindUs from "./pages/FindUs";
import ScrollToTop from "./components/MyScroll";
import {BookedDatesContext} from "./components/BookedDatesContext";
import './App.css';

import React from 'react';
import { useState, useEffect } from "react";
import {Route, Routes} from "react-router-dom";


function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            let w = document.documentElement.clientWidth;
            let h = document.documentElement.clientHeight;
            setSize({ width: w, height: h });
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
}




function App() {

    const { width, height } = useWindowSize();
    // Stato condiviso delle date prenotate
    const [bookedDates, setBookedDates] = useState(new Set());

    return (
        <BookedDatesContext.Provider value={{ bookedDates, setBookedDates }}>
            <div style={{ height: height, width: width }}>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home width={width} height={height} />} />
                    <Route path="/services" element={<MyServices width={width} />} />
                    <Route path="/book_page" element={<BookPage width={width} />} />
                    <Route path="/find_us" element={<FindUs width={width} />} />
                </Routes>
            </div>
        </BookedDatesContext.Provider>
    );
}

export default App;

