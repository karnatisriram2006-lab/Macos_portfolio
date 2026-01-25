import {locations} from "#constants/index.js";
import clsx from "clsx";
import {useGSAP} from "@gsap/react";
import {Draggable} from "gsap/Draggable";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";

const projects=locations.work?.children??[];
const Home=()=>{
    const {setActiveLocation}=useLocationStore();
    const {openWindows}=useWindowStore();
    const handleOpenProjects=(project)=>{
        setActiveLocation(project);
        openWindows("finder");
    }
    useGSAP(()=>{
        Draggable.create(".folder")
    },[])
    return <section id="home">
        <ul>
            {projects.map(project=>(
                <li key={project.name} className={clsx("group folder",project.windowPosition)} onClick={() => handleOpenProjects(project)}>
                    <img src="/images/folder.png" alt={project.name}/>
                    <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>;
}
export default Home;