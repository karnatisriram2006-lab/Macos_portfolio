import gsap from "gsap";
import {Draggable} from "gsap/Draggable";
import {Finder, Resume, Safari, Terminal,Text,Image,Contact,Gallery} from "#windows/index.js";
import {Navbar,Welcome,Dock,Home} from "#components"
import MobileLayout from "#components/mobile/MobileLayout.jsx";
import MobileApp from "#components/mobile/MobileApp.jsx";
import useIsMobile from "./hooks/useIsMobile.js";
import useMobileStore from "#store/mobileStore.js";

gsap.registerPlugin(Draggable);

const App = () => {
    const isMobile = useIsMobile();
    const activeApp = useMobileStore((state) => state.activeApp);

    if (isMobile) {
        return (
            <main>
                <MobileLayout />
                {activeApp && <MobileApp />}
            </main>
        );
    }

    return (
       <main>
           <Navbar />
           <Welcome />
           <Dock/>

           <Terminal/>
           <Safari/>
           <Resume/>
           <Finder/>
           <Text/>
           <Image/>
           <Contact/>
           <Home/>
           <Gallery/>
       </main>
    )
}
export default App;