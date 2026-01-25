import {WindowControls} from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const Image=()=>{
    const {windows}=useWindowStore();
    const data=windows.imgfile?.data;
    if(!data) return null;
    const {imageUrl,name}=data;
    return <>
        <div id="window-header">
            <WindowControls target="imgfile"/>
            <h2>{name}</h2>
        </div>
        <div className="p-5 space-y-6 bg-white">

            {imageUrl?(
                <div className="w-full">
                    <img src={imageUrl} alt={name} className="w-full h-auto rounded"/>
                </div>
            ):null}
        </div>
    </>
}
const ImageWindow=WindowWrapper(Image,"imgfile");
export default ImageWindow;