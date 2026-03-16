import {WindowControls} from "#components/index.js";
import {Search} from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {locations} from "#constants/index.js";
import useLocationStore from "#store/location.js";
import clsx from "clsx";
import useWindowStore from "#store/window.js";
import useIsMobile from "../hooks/useIsMobile.js";
import useMobileStore from "../store/mobileStore.js";

export const Finder = () => {
    const isMobile = useIsMobile();
    const openApp = useMobileStore(state => state.openApp);
    const {openWindows}=useWindowStore();
    const {activeLocation,setActiveLocation}=useLocationStore();
    
    const openItem=(item)=>{
        if(item.fileType==="pdf") {
            openWindows("resume");
            if(isMobile) openApp("resume");
            return;
        }
        if(item.kind==="folder") return setActiveLocation(item);
        if(["fig","url"].includes(item.fileType)&& item.href) return window.open(item.href,"_blank");
        
        const target = item.fileType === "img" ? "imgfile" : "txtfile";
        openWindows(target, item);
        if(isMobile) openApp(target);
    };

    return <>
        <div id="window-header">
            <WindowControls target="finder"/>
            <Search className="icon"/>
        </div>
        <div className="flex h-full finder-container">
            <div className="sidebar">
                <div className="sidebar-group">
                    <h3>Favorites</h3>
                    <ul>
                        {Object.values(locations).map((item)=>(
                            <li key={item.id} onClick={()=>setActiveLocation(item)} className={clsx(item.id===activeLocation.id?"active":"not-active")}>
                                <img src={item.icon} className="w-4" alt={item.name}/>
                                <p className="text-sm font-medium truncate">{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="sidebar-group">
                    <h3>Projects</h3>
                    <ul>
                        {locations.work.children.map((item)=>(
                            <li key={item.id} onClick={()=>setActiveLocation(item)} className={clsx(item.id===activeLocation.id?"active":"not-active")}>
                                <img src={item.icon} className="w-4" alt={item.name}/>
                                <p className="text-sm font-medium truncate">{item.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ul className="content">
                {activeLocation?.children.map((item)=>(
                    <li key={item.id} className={item.position} onClick={()=>openItem(item)}>
                        <img src={item.icon} alt={item.name}/>
                        <p>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    </>
}
const FinderWindow=WindowWrapper(Finder,"finder")
export default FinderWindow;