import { useState, useEffect } from "react";
import dayjs from "dayjs";
import useMobileStore from "#store/mobileStore.js";
import clsx from "clsx";

const MobileLayout = () => {
    const [time, setTime] = useState(dayjs());
    const [isZooming, setIsZooming] = useState(false);
    const openApp = useMobileStore((state) => state.openApp);

    useEffect(() => {
        const timer = setInterval(() => setTime(dayjs()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleOpenApp = (id) => {
        setIsZooming(true);
        setTimeout(() => {
            openApp(id);
            setIsZooming(false);
        }, 300); // Wait for zoom-out animation
    };

    const apps = [
        { id: "terminal", label: "Skills",   emoji: "⌨️", color: "#1C1C1E", icon: "terminal.png" },
        { id: "safari",   label: "Projects", emoji: "🌐", color: "#0A84FF", icon: "safari.png" },
        { id: "finder",   label: "Finder",   emoji: "📁", color: "#2196F3", icon: "finder.png" },
        { id: "resume",   label: "Résumé",   emoji: "📄", color: "#FF453A", icon: "resume.png" },
        { id: "contact",  label: "Contact",  emoji: "✉️", color: "#30D158", icon: "contact.png" },
        { id: "gallery",  label: "Gallery",  emoji: "🖼️", color: "#FF9F0A", icon: "photos.png" },
        { id: "text",     label: "Notes",    emoji: "📝", color: "#FFD60A", icon: "txt.png" },
        { id: "imgfile",  label: "Preview",  emoji: "🖼️", color: "#636366", icon: "image.png" },
    ];

    const dockApps = apps.filter(app => ["safari", "terminal", "contact"].includes(app.id));

    return (
        <div className={clsx("ios-home", isZooming && "ios-home--zoomed")}>
            {/* Status Bar */}
            <div className="ios-statusbar">
                <div className="ios-statusbar__left">
                    <span>{time.format("h:mm")}</span>
                </div>
                <div className="ios-statusbar__right">
                    <svg viewBox="0 0 24 24" fill="white" className="size-4">
                        <path d="M12 21L15.6 16.2C14.6 15.4 13.3 15 12 15C10.7 15 9.4 15.4 8.4 16.2L12 21M12 2C7.3 2 3.1 3.5 0 6L12 21L24 6C20.9 3.5 16.7 2 12 2Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="white" className="size-4">
                        <path d="M12,11L2,18H12V11M12,2L2,9H12V2M16,22H21C22.1,22 23,21.1 23,20V4C23,2.9 22.1,2 21,2H16V22Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" fill="white" className="size-4">
                        <path d="M16 20H3V6H16V20M20 18H18V8H20V18M16 4H3C1.9 4 1 4.9 1 6V20C1 21.1 1.9 22 3 22H16C17.1 22 18 21.1 18 20V6C18 4.9 17.1 4 16 4M21 16H23V10H21V16Z" />
                    </svg>
                </div>
            </div>

            {/* Date Block */}
            <div className="ios-dateblock">
                <span className="weekday">{time.format("dddd")}</span>
                <span className="date">{time.format("MMMM D")}</span>
            </div>

            {/* App Grid */}
            <div className="ios-grid">
                {apps.map((app) => (
                    <div
                        key={app.id}
                        className="ios-appicon"
                        onClick={() => handleOpenApp(app.id)}
                    >
                        <div className="ios-appicon__bubble">
                            <img
                                src={`/images/${app.icon}`}
                                alt={app.label}
                                className="size-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "block";
                                }}
                            />
                            <span className="text-3xl hidden">{app.emoji}</span>
                        </div>
                        <span className="ios-appicon__label">{app.label}</span>
                    </div>
                ))}
            </div>

            {/* Dock */}
            <div className="ios-dock">
                {dockApps.map((app) => (
                    <div
                        key={app.id}
                        className="ios-appicon"
                        onClick={() => handleOpenApp(app.id)}
                    >
                        <div className="ios-appicon__bubble">
                            <img
                                src={`/images/${app.icon}`}
                                alt={app.label}
                                className="size-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "block";
                                }}
                            />
                            <span className="text-3xl hidden">{app.emoji}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Home Indicator */}
            <div className="ios-home-bar" />
        </div>
    );
};

export default MobileLayout;
