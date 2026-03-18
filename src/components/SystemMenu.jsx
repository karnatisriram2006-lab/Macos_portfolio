import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const SystemMenu = ({ children, trigger, className = "", align = "right" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                menuRef.current,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
            );
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && 
                !menuRef.current.contains(event.target) &&
                !triggerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block">
            <div 
                ref={triggerRef} 
                onClick={() => setIsOpen(!isOpen)} 
                className="cursor-default"
            >
                {trigger}
            </div>
            {isOpen && (
                <div 
                    ref={menuRef}
                    className={`absolute ${align === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right"} mt-1 min-w-[12rem] w-max max-w-xs rounded-lg bg-[#2C2C2E]/90 backdrop-blur-xl border border-white/10 shadow-2xl z-[10000] p-1 flex flex-col ${className}`}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export const MenuItem = ({ children, onClick, icon: Icon, danger = false }) => (
    <div 
        onClick={(e) => {
            e.stopPropagation();
            onClick?.();
        }}
        className={`flex flex-row-mobile items-center gap-3 px-3 py-1.5 rounded-md cursor-default text-sm transition-colors whitespace-nowrap ${
            danger ? "text-red-400 hover:bg-red-500/20" : "text-white/90 hover:bg-blue-600 hover:text-white"
        }`}
    >
        {Icon && <Icon size={16} />}
        <span className="flex-1">{children}</span>
    </div>
);

export const MenuSeparator = () => (
    <div className="h-[0.5px] bg-white/10 my-1 mx-1" />
);

export default SystemMenu;
