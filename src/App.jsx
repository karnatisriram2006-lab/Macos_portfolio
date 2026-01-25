
import gsap from "gsap";
import {Draggable} from "gsap/Draggable";
import {Finder, Resume, Safari, Terminal,Text,Image,Contact,Gallery} from "#windows/index.js";
import {Navbar,Welcome,Dock,Home} from "#components"
gsap.registerPlugin(Draggable);
const App = () => {
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