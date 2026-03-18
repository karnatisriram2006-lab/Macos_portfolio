import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import useMobileStore from "#store/mobileStore.js";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const APPS = [
    { id: "terminal", label: "Skills",   emoji: "⌨️", color: "#1C1C1E", icon: "terminal.png" },
    { id: "safari",   label: "Articles", emoji: "🌐", color: "#0A84FF", icon: "safari.png" },
    { id: "finder",   label: "Finder",   emoji: "📁", color: "#2196F3", icon: "finder.png" },
    { id: "resume",   label: "Résumé",   emoji: "📄", color: "#FF453A", icon: "resume.png" },
    { id: "contact",  label: "Contact",  emoji: "✉️", color: "#30D158", icon: "contact.png" },
    { id: "gallery",  label: "Gallery",  emoji: "🖼️", color: "#FF9F0A", icon: "photos.png" },
    { id: "text",     label: "Notes",    emoji: "📝", color: "#FFD60A", icon: "txt.png" },
    { id: "imgfile",  label: "Preview",  emoji: "🖼️", color: "#636366", icon: "image.png" },
];

const DOCK_APPS = APPS.filter(app => ["safari", "terminal", "contact"].includes(app.id));

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
        }, 300);
    };

    const dockRef = useRef(null);
    const iconRefs = useRef([]);
    const tooltipRefs = useRef([]);
    const activeIndexRef = useRef(null);

    useGSAP(() => {
        if (!dockRef.current) return;
        
        const quickToInstances = iconRefs.current.map(el => {
            if (!el) return null;
            return gsap.quickTo(el, "scale", { duration: 0.1, ease: "power3.out" });
        });

        const handleMove = (e) => {
            const dock = dockRef.current;
            const rect = dock.getBoundingClientRect();
            
            // Mouse X relative to dock center
            const mouseX = e.clientX - rect.left;
            const progress = mouseX / rect.width;
            
            // Tooltip logic
            const index = Math.floor(progress * DOCK_APPS.length);
            const clamped = Math.max(0, Math.min(DOCK_APPS.length - 1, index));

            if (clamped !== activeIndexRef.current) {
                tooltipRefs.current.forEach((t, i) => {
                    if (!t) return;
                    const isActive = i === clamped;
                    t.style.opacity = isActive ? "1" : "0";
                    t.style.transform = `translateX(-50%) scale(${isActive ? 1 : 0.8})`;
                });
                activeIndexRef.current = clamped;
            }

            // Continuous Gaussian Magnification
            // Formula: base + added * e^(-((x - mouseX)^2) / (2 * sigma^2))
            const sigma = rect.width / DOCK_APPS.length * 0.8; // Spread of the magnification
            
            iconRefs.current.forEach((el, i) => {
                if (!el || !quickToInstances[i]) return;
                
                const iconRect = el.getBoundingClientRect();
                const iconCenterX = iconRect.left + iconRect.width / 2 - rect.left;
                const distance = Math.abs(mouseX - iconCenterX);
                
                // Gaussian Curve for smooth scaling
                // Boost scale up to 1.9 max
                const maxScaleBoost = 0.9; 
                const scale = 1 + maxScaleBoost * Math.exp(-(Math.pow(distance, 2)) / (2 * Math.pow(sigma, 2)));
                
                quickToInstances[i](scale);
            });
        };

        const handleLeave = () => {
            activeIndexRef.current = null;
            tooltipRefs.current.forEach(t => { 
                if (t) { 
                    t.style.opacity = "0"; 
                    t.style.transform = "translateX(-50%) scale(0.8)"; 
                } 
            });
            quickToInstances.forEach(qt => qt && qt(1));
        };

        const currentDock = dockRef.current;
        currentDock.addEventListener("pointermove", handleMove);
        currentDock.addEventListener("pointerleave", handleLeave);
        
        return () => {
            currentDock.removeEventListener("pointermove", handleMove);
            currentDock.removeEventListener("pointerleave", handleLeave);
        };
    }, []);

    return (
        <div className={clsx("ios-home", isZooming && "ios-home--zoomed")}>
            <div className="ios-statusbar">
                <div className="ios-statusbar__left">
                    <span>{time.format("h:mm")}</span>
                </div>
                <div className="ios-statusbar__right">
                    <svg viewBox="0 0 24 24" fill="white" className="size-4"><path d="M12 21L15.6 16.2C14.6 15.4 13.3 15 12 15C10.7 15 9.4 15.4 8.4 16.2L12 21M12 2C7.3 2 3.1 3.5 0 6L12 21L24 6C20.9 3.5 16.7 2 12 2Z" /></svg>
                    <svg viewBox="0 0 24 24" fill="white" className="size-4"><path d="M12,11L2,18H12V11M12,2L2,9H12V2M16,22H21C22.1,22 23,21.1 23,20V4C23,2.9 22.1,2 21,2H16V22Z" /></svg>
                    <svg viewBox="0 0 24 24" fill="white" className="size-4"><path d="M16 20H3V6H16V20M20 18H18V8H20V18M16 4H3C1.9 4 1 4.9 1 6V20C1 21.1 1.9 22 3 22H16C17.1 22 18 21.1 18 20V6C18 4.9 17.1 4 16 4M21 16H23V10H21V16Z" /></svg>
                </div>
            </div>

            <div className="ios-dateblock">
                <span className="weekday">{time.format("dddd")}</span>
                <span className="date">{time.format("MMMM D")}</span>
            </div>

            <div className="ios-grid">
                {APPS.map((app) => (
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
                            />
                        </div>
                        <span className="ios-appicon__label">{app.label}</span>
                    </div>
                ))}
            </div>

            <div 
                ref={dockRef}
                className="ios-dock"
            >
                {DOCK_APPS.map((app, i) => (
                    <div
                        key={app.id}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            flex: 1,
                        }}
                        onPointerDown={() => {
                            if (tooltipRefs.current[i]) {
                                tooltipRefs.current[i].style.opacity = "1";
                                tooltipRefs.current[i].style.transform = "translateX(-50%) scale(1)";
                            }
                        }}
                        onPointerUp={() => {
                            activeIndexRef.current = null;
                            tooltipRefs.current.forEach(t => { if(t) { t.style.opacity = "0"; t.style.transform = "translateX(-50%) scale(0.8)"; } });
                            handleOpenApp(app.id); 
                        }}
                    >
                        <div 
                            ref={el => tooltipRefs.current[i] = el}
                            className="dock-tooltip"
                            style={{ opacity: 0, transform: "translateX(-50%) scale(0.8)", transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                        >
                            {app.label}
                        </div>
                        <div
                            ref={el => iconRefs.current[i] = el}
                            className="ios-appicon__bubble"
                            style={{
                                transformOrigin: 'bottom center',
                                willChange: 'transform'
                            }}
                        >
                            <img
                                src={`/images/${app.icon}`}
                                alt={app.label}
                                className="size-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="ios-home-bar" />
        </div>
    );
};

export default MobileLayout;
