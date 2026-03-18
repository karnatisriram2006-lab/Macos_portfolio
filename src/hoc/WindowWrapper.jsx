import useWindowStore from "#store/window.js";
import {useLayoutEffect, useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";

const WindowWrapper = (Component,windowKey) => {
    const Wrapped=(props)=>{
        const {focusWindow,windows,focusedWindow}=useWindowStore();
        const {isOpen,zIndex}=windows[windowKey];
        const ref=useRef(null);
        const hasOpened = useRef(false);

        useGSAP(()=>{
            const el=ref.current;
            if(!el) return;
            if(isOpen && !hasOpened.current) {
                hasOpened.current = true;
                gsap.fromTo(el,{scale:0.8,opacity:0,y:40},{scale:1,opacity:1,y:0,duration:0.5,ease:"back.out(1.2)"});
            } else if (!isOpen) {
                hasOpened.current = false;
            }
        },[isOpen]);

        useGSAP(()=>{
            const el=ref.current;
            if(!el) return;
            const [instance]=Draggable.create(el,{onPress:()=>focusWindow(windowKey)});
            return ()=> instance.kill();
        },[])

        useLayoutEffect(() => {
            const el=ref.current;
            if(!el) return;
            el.style.display=isOpen ? "block" : "none";
        }, [isOpen]);

        const data = windows[windowKey]?.data;
        const customPos = data?.windowPosition || "";

        return <section 
                    id={windowKey} 
                    ref={ref} 
                    style={{zIndex}} 
                    className={`absolute rounded-xl overflow-hidden transition-shadow duration-300 ${focusedWindow === windowKey ? "window-active" : "shadow-lg"} ${customPos}`}
                >
                <Component {...props}/>
        </section>
    }
    Wrapped.displayName=`WrappedWrapper(${Component.displayName||Component.name||"Component"})`;
    return Wrapped;
}
export default WindowWrapper;