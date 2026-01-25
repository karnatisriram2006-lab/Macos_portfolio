import dayjs from 'dayjs';
import {navIcons, navLinks} from '#constants';
import useWindowStore from "#store/window.js";
const Navbar = () => {
    const {openWindows}=useWindowStore();

    return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className="font-bold">Sriram's Portfolio</p>
            <ul>
                {navLinks.map(({id,name,type}) =>
                    (<li key={id} onClick={()=>openWindows(type)}><p>{name}</p></li>)
                )}
            </ul>
        </div>
        <div>
            <ul>
                {navIcons.map(({ id,img}) =>(
                    <li key={id}><img src={img} className="icon-hover" alt={`icon-${id}`}/></li>
                ))}
            </ul>
            <time>{dayjs().format('ddd MMM D h:mm A')}</time>
        </div>


    </nav>
    )
}
export default Navbar;