import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation(); // prende il percorso corrente

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [pathname]); // esegue lo scroll ogni volta che cambia il percorso

    return null; // non renderizza nulla
}

export default ScrollToTop;

