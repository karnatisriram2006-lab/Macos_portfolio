import { useState, useRef } from "react";
import { dockApps } from "#constants";
import useWindowStore from "#store/window.js";

const Dock = () => {
    const dockRef = useRef(null);
    const [mouseX, setMouseX] = useState(null);
    const { openWindows, closeWindows, windows } = useWindowStore();

    const getIconTransform = (mouseX, dockWidth, iconCount, iconIndex) => {
        const MAX_SCALE = 1.2; // Maintained user preference
        const BASE_SCALE = 1.0;
        const MAX_Y_SHIFT = -15; // Adjusted for 1.2x scale
        const SPREAD = 0.18;

        if (mouseX === null) return { scale: BASE_SCALE, y: 0 };

        const iconCenter = (iconIndex + 0.5) / iconCount;
        const mouseNorm = mouseX / dockWidth;
        const dist = mouseNorm - iconCenter;
        const gaussian = Math.exp(-(dist * dist) / (2 * SPREAD * SPREAD));
        
        return {
            scale: BASE_SCALE + (MAX_SCALE - BASE_SCALE) * gaussian,
            y: MAX_Y_SHIFT * gaussian
        };
    };

    const handlePointerMove = (e) => {
        if (!dockRef.current) return;
        const rect = dockRef.current.getBoundingClientRect();
        setMouseX(e.clientX - rect.left);
    };

    const handlePointerLeave = () => {
        setMouseX(null);
    };

    const toggleApp = (app) => {
        if (!app.canOpen) return;
        const window = windows[app.id];
        if (!window) {
            console.error("Could not open window");
            return;
        }
        if (window.isOpen) {
            closeWindows(app.id);
        } else {
            openWindows(app.id);
        }
    };

    const dockWidth = dockRef.current ? dockRef.current.offsetWidth : 1;
    const hoveredIndex = mouseX !== null ? Math.floor((mouseX / (dockWidth || 1)) * dockApps.length) : null;

    return (
        <section id="dock">
            <div 
                ref={dockRef} 
                className="dock-container"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
            >
                {dockApps.map((app, i) => {
                    const { scale, y } = getIconTransform(mouseX, dockWidth, dockApps.length, i);
                    const isHovered = hoveredIndex === i;

                    return (
                        <div key={app.id} className="dock-slot">
                            <div 
                                className="dock-item-wrapper"
                                style={{
                                    transform: `translateY(${y}px)`,
                                    transition: mouseX === null ? "transform 0.2s ease-out" : "none",
                                }}
                            >
                                {isHovered && mouseX !== null && (
                                    <div 
                                        className="dock-tooltip-container"
                                        style={{
                                            bottom: `calc(${scale * 100}% + 4px)`,
                                            transition: mouseX === null ? "bottom 0.2s ease-out" : "none",
                                        }}
                                    >
                                        <div className="dock-tooltip">
                                            {app.name}
                                        </div>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="dock-icon"
                                    aria-label={app.name}
                                    disabled={!app.canOpen}
                                    onClick={() => toggleApp(app)}
                                    style={{
                                        transform: `scale(${scale})`,
                                        transition: mouseX === null ? "transform 0.2s ease-out" : "none",
                                    }}
                                >
                                    <img
                                        src={`/images/${app.icon}`}
                                        alt={app.name}
                                        loading="lazy"
                                        className={app.canOpen ? "" : "opacity-60"}
                                    />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Dock;
