import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {WindowControls} from "#components/index.js";
import {Mail, Search} from "lucide-react";
import {gallery, photosLinks} from "#constants/index.js";
import {use} from "react";
import useWindowStore from "#store/window.js";

const Gallery = () =>{
    const {openWindows}=useWindowStore();
    return (
        <>
            <div id="window-header">
                <WindowControls target="photos"/>
                <div className="flex">
                <Mail className="icon"/>
                <Search className="icon"/>
                </div>
            </div>
            <div className="flex  w-full">
            <div className="sidebar">

                    <h2>Photos</h2>
                    <ul>
                        {photosLinks.map(({id,icon,title})=>(
                            <li key={id}>
                                <img src={icon} alt={title}/>
                                <p>{title}</p>
                            </li>
                        ))}
                    </ul>
            </div>
                <div className="gallery">
                    <ul>
                        {gallery.map(({id,img})=>(
                            <li key={id} onClick={()=>openWindows("imgfile",{
                                id,
                                name:"Gallery image",
                                icon:"/images/image.png",
                                kind:"file",
                                fileType:"img",
                                imageUrl:img,
                            })}>
                                <img src={img} alt={`Gallery img ${id}`}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
const GalleryWindow=WindowWrapper(Gallery,"photos");
export default GalleryWindow;