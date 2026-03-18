import { WindowControls } from "#components/index.js";
import { Search, LayoutGrid, List, ChevronRight, Folder, FileText, Image as ImageIcon, FileCode, ExternalLink, FileJson } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants/index.js";
import useLocationStore from "#store/location.js";
import clsx from "clsx";
import useWindowStore from "#store/window.js";
import useIsMobile from "../hooks/useIsMobile.js";
import useMobileStore from "../store/mobileStore.js";

const iconMap = {
    folder: Folder,
    txt: FileText,
    img: ImageIcon,
    fig: FileCode,
    url: ExternalLink,
    pdf: FileJson
};

export const Finder = () => {
    const isMobile = useIsMobile();
    const openApp = useMobileStore(state => state.openApp);
    const { openWindows } = useWindowStore();
    const { activeLocation, setActiveLocation, viewType, setViewType, history } = useLocationStore();
    
    const openItem = (item) => {
        if (item.fileType === "pdf") {
            openWindows("resume");
            if (isMobile) openApp("resume");
            return;
        }
        if (item.kind === "folder") return setActiveLocation(item);
        if (["fig", "url"].includes(item.fileType) && item.href) return window.open(item.href, "_blank");
        
        const target = item.fileType === "img" ? "imgfile" : "txtfile";
        openWindows(target, item);
        if (isMobile) openApp(target);
    };

    return <>
        <div id="window-header" className="flex items-center gap-4 px-4 py-2 bg-[#2C2C2E]/90 backdrop-blur-xl border-b border-white/10">
            <WindowControls target="finder" />
            
            <div className="flex items-center gap-2 ml-4">
                <button 
                    onClick={() => setViewType("grid")} 
                    className={clsx("p-1 rounded transition-colors", viewType === "grid" ? "bg-white/20 text-white" : "text-white/50 hover:bg-white/10")}
                >
                    <LayoutGrid size={16} />
                </button>
                <button 
                    onClick={() => setViewType("list")} 
                    className={clsx("p-1 rounded transition-colors", viewType === "list" ? "bg-white/20 text-white" : "text-white/50 hover:bg-white/10")}
                >
                    <List size={16} />
                </button>
            </div>

            <div className="flex-1 flex items-center gap-1 overflow-hidden ml-2">
                {history.map((loc, i) => (
                    <div key={loc.id} className="flex items-center gap-1 shrink-0">
                        {i > 0 && <ChevronRight size={12} className="text-white/30" />}
                        <button 
                            onClick={() => setActiveLocation(loc)}
                            className={clsx("text-xs font-medium px-2 py-1 rounded hover:bg-white/10 transition-colors", 
                                i === history.length - 1 ? "text-white" : "text-white/50")}
                        >
                            {loc.name}
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex items-center bg-white/10 rounded-md px-2 py-1 gap-2 border border-white/5 mr-2">
                <Search size={14} className="text-white/50" />
                <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-xs w-24 text-white placeholder:text-white/30" />
            </div>
        </div>

        <div className="flex h-[400px] finder-container bg-[#1C1C1E] text-white">
            <div className="sidebar w-48 bg-[#2C2C2E]/50 border-r border-white/5 p-4 flex flex-col gap-6 select-none">
                <div className="sidebar-group">
                    <h3 className="text-[10px] uppercase font-bold text-white/30 mb-2 px-2">Favorites</h3>
                    <ul className="flex flex-col gap-0.5">
                        {Object.values(locations).map((item) => (
                            <li key={item.id} onClick={() => setActiveLocation(item)} 
                                className={clsx("flex items-center gap-2 px-2 py-1.5 rounded-md cursor-default text-sm transition-colors", 
                                item.id === activeLocation.id ? "bg-blue-600 text-white" : "hover:bg-white/10 text-white/80")}>
                                <img src={item.icon} className="w-4 brightness-110" alt={item.name} />
                                <span className="truncate">{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="sidebar-group">
                    <h3 className="text-[10px] uppercase font-bold text-white/30 mb-2 px-2">Projects</h3>
                    <ul className="flex flex-col gap-0.5">
                        {locations.work.children.map((item) => (
                            <li key={item.id} onClick={() => setActiveLocation(item)} 
                                className={clsx("flex items-center gap-2 px-2 py-1.5 rounded-md cursor-default text-sm transition-colors", 
                                item.id === activeLocation.id ? "bg-blue-600 text-white" : "hover:bg-white/10 text-white/80")}>
                                <img src={item.icon} className="w-4 brightness-110" alt={item.name} />
                                <span className="truncate">{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                {viewType === "grid" ? (
                    <ul className="grid grid-cols-4 gap-x-6 gap-y-8">
                        {activeLocation?.children.map((item) => (
                            <li key={item.id} 
                                className="flex flex-col items-center gap-2 cursor-default group"
                                onClick={() => openItem(item)}
                            >
                                <div className="relative p-2 rounded-lg group-hover:bg-white/10 transition-colors">
                                    <img src={item.icon} alt={item.name} className="w-12 h-12 object-contain shadow-sm group-hover:scale-105 transition-transform" />
                                    {item.fileType === "url" && <ExternalLink size={10} className="absolute bottom-1 right-1 text-white/50" />}
                                </div>
                                <p className="text-xs text-center font-medium max-w-[80px] break-words text-white/90 group-hover:text-white px-1 rounded bg-transparent group-hover:bg-blue-600">
                                    {item.name}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul className="flex flex-col border border-white/5 rounded-lg overflow-hidden">
                        <li className="grid grid-cols-12 gap-4 px-4 py-2 bg-white/5 text-[10px] uppercase font-bold text-white/40 border-b border-white/5">
                            <span className="col-span-6">Name</span>
                            <span className="col-span-3">Kind</span>
                            <span className="col-span-3">Size</span>
                        </li>
                        {activeLocation?.children.map((item) => {
                            const Icon = iconMap[item.fileType] || (item.kind === "folder" ? Folder : FileText);
                            return (
                                <li key={item.id} 
                                    className="grid grid-cols-12 gap-4 px-4 py-2 text-sm text-white/80 hover:bg-blue-600 hover:text-white transition-colors cursor-default border-b border-white/5 last:border-none"
                                    onClick={() => openItem(item)}
                                >
                                    <div className="col-span-6 flex items-center gap-3">
                                        <img src={item.icon} className="w-4" alt="" />
                                        <span className="truncate">{item.name}</span>
                                    </div>
                                    <span className="col-span-3 text-xs opacity-60 capitalize">{item.kind} {item.fileType?.toUpperCase()}</span>
                                    <span className="col-span-3 text-xs opacity-60">--</span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    </>
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;