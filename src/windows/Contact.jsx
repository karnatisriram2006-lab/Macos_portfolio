import {WindowControls} from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import {socials} from "#constants/index.js";

const Contact =()=>{

    return <>
     <div id="window-header">
         <WindowControls target="contact"/>
         <h2>Contact Me</h2>
     </div>
     <div className="p-5 space-y-5">
         <img src="/images/sriram1.jpeg" alt="adrian" className="w-25 rounded-full"/>
         <h3>Let's Connect</h3>
         <p>Got an idea?A bug to squash? Or just wanna talk tech? I'm in.</p>
         <p>karnatiSriram2006@gmail.com</p>
         <ul>
             {socials.map(({id,text,icon,link,bg})=>(
                 <li key={id}  style={{backgroundColor:bg}}>
                     <a href={link} target="_blank" rel="noopener noreferrer"><img src={icon} alt={text} className="size-5"/><p>{text}</p></a>
                 </li>
             ))}
         </ul>
     </div>
    </>
}
const ContactWindow=WindowWrapper(Contact,"contact");
export default ContactWindow;