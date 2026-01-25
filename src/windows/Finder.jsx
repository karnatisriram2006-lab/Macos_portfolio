import {WindowControls} from "#components/index.js";
import {Search} from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {locations} from "#constants/index.js";
import useLocationStore from "#store/location.js";
import clsx from "clsx";
import useWindowStore from "#store/window.js";
const Finder=()=>{
    const {openWindows}=useWindowStore();
    const {activeLocation,setActiveLocation}=useLocationStore();
    const openItem=(item)=>{
        if(item.fileType==="pdf") return openWindows("resume");
        if(item.kind==="folder") return setActiveLocation(item);
        if(["fig","url"].includes(item.fileType)&& item.href) return window.open(item.href,"_blank");
        openWindows(`${item.fileType}${item.kind}`,item);
    };
    return <>
        <div id="window-header">
            <WindowControls target="finder"/>
            <Search className="icon"/>
        </div>
        <div className="bg-white flex  h-full">
            <div className="sidebar">
                <div>
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
                <div>
                    <h3>My projects</h3>
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