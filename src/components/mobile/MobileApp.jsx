import { useRef, useState } from "react";
import useMobileStore from "#store/mobileStore.js";

// Import raw components directly to bypass WindowWrapper HOC
import { Finder } from "#windows/Finder.jsx";
import { Resume } from "#windows/Resume.jsx";
import { Safari } from "#windows/Safari.jsx";
import { Terminal } from "#windows/Terminal.jsx";
import { Text } from "#windows/Text.jsx";
import { Image } from "#windows/Image.jsx";
import { Contact } from "#windows/Contact.jsx";
import { Gallery } from "#windows/Gallery.jsx";

const MobileApp = () => {
    const { activeApp, closeApp } = useMobileStore();
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const containerRef = useRef(null);

    const apps = {
        finder: { component: Finder, title: "Finder" },
        resume: { component: Resume, title: "Résumé" },
        safari: { component: Safari, title: "Safari" },
        terminal: { component: Terminal, title: "Skills" },
        contact: { component: Contact, title: "Contact" },
        gallery: { component: Gallery, title: "Gallery" },
        txtfile: { component: Text, title: "Notes" },
        imgfile: { component: Image, title: "Preview" },
    };

    const currentApp = apps[activeApp];

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        const y = e.touches[0].clientY - startY;
        if (y > 0) setCurrentY(y);
    };

    const handleTouchEnd = () => {
        if (currentY >= 80) {
            closeApp();
        }
        setCurrentY(0);
    };

    if (!activeApp || !currentApp) return null;

    const ActiveComponent = currentApp.component;

    return (
        <div
            ref={containerRef}
            className="ios-app-screen"
            style={{
                transform: `translateY(${currentY}px)`,
                visibility: activeApp ? "visible" : "hidden",
                opacity: activeApp ? 1 : 0,
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <nav className="ios-navbar" style={{
                background: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
            }}>
                <div className="ios-navbar__back" onClick={closeApp} style={{ color: "#0A84FF" }}>
                    <span className="chevron">‹</span>
                    <span className="label">Home</span>
                </div>
                <h1 className="ios-navbar__title" style={{ color: "#FFFFFF" }}>{currentApp.title}</h1>
                <div className="ios-navbar__right" />
            </nav>

            <div className="ios-app-body">
                <div className="mobile-window" id={activeApp}>
                    <ActiveComponent />
                </div>
            </div>

            <div className="ios-home-bar" />
        </div>
    );
};

export default MobileApp;
