import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { navIcons, navLinks } from '#constants';
import useWindowStore from "#store/window.js";
import SystemMenu, { MenuItem, MenuSeparator } from "./SystemMenu.jsx";
import { Wifi, Search, MoreHorizontal, Settings, Volume2, Sun, Moon, Battery, Power } from "lucide-react";

const Navbar = () => {
    const { openWindows } = useWindowStore();
    const [time, setTime] = useState(dayjs());

    useEffect(() => {
        const timer = setInterval(() => setTime(dayjs()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <nav className="flex justify-between items-center bg-black/10 backdrop-blur-xl p-1.5 px-5 select-none text-white border-b border-white/10 z-[10000]">
            <div className="flex items-center gap-5">
                <SystemMenu align="left" trigger={<img src="/images/logo.svg" alt="logo" className="h-4 cursor-default mr-1" />}>
                   <MenuItem onClick={() => window.open('https://github.com/karnatisriram2006-lab', '_blank')}>About This Mac</MenuItem>
                   <MenuSeparator />
                   <MenuItem onClick={() => window.location.reload()}>Restart...</MenuItem>
                   <MenuItem onClick={() => window.close()}>Shut Down...</MenuItem>
                   <MenuSeparator />
                   <MenuItem danger onClick={() => window.close()}>Lock Screen</MenuItem>
                </SystemMenu>
                
                <p className="font-bold cursor-default text-sm">Portfolio</p>
                <ul className="flex items-center gap-5 max-sm:hidden">
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} onClick={() => openWindows(type)} className="cursor-default">
                            <p className="text-sm hover:bg-white/10 px-2 py-0.5 rounded transition-all">{name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 max-sm:hidden">
                    <SystemMenu trigger={<Wifi size={18} className="cursor-default opacity-90 hover:opacity-100" />}>
                        <div className="p-2 px-3 text-xs font-semibold text-white/50 uppercase">Wi-Fi</div>
                        <MenuItem icon={Wifi}>Sriram_5G</MenuItem>
                        <MenuSeparator />
                        <MenuItem onClick={() => {}}>Wi-Fi Settings...</MenuItem>
                    </SystemMenu>

                    <SystemMenu trigger={<Search size={18} className="cursor-default opacity-90 hover:opacity-100" />}>
                        <div className="p-3 w-64">
                            <div className="bg-white/10 rounded-md p-2 flex items-center gap-2">
                                <Search size={14} className="text-white/50" />
                                <input type="text" placeholder="Spotlight Search" className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-white/30" autoFocus />
                            </div>
                        </div>
                    </SystemMenu>

                    <SystemMenu trigger={<MoreHorizontal size={18} className="cursor-default opacity-90 hover:opacity-100" />}>
                        <div className="p-4 w-64 space-y-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-blue-600 rounded-xl p-3 flex flex-col items-center gap-2">
                                    <Wifi size={20} />
                                    <span className="text-[10px] font-medium">Wi-Fi</span>
                                </div>
                                <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center gap-2">
                                    <Volume2 size={20} />
                                    <span className="text-[10px] font-medium">Sound</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Sun size={14} className="text-white/70" />
                                    <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                        <div className="w-3/4 h-full bg-white" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Volume2 size={14} className="text-white/70" />
                                    <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                        <div className="w-1/2 h-full bg-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SystemMenu>
                </div>

                <SystemMenu trigger={<time className="text-sm font-medium text-white/90 cursor-default hover:bg-white/10 px-2 py-0.5 rounded transition-all">{time.format('ddd MMM D h:mm A')}</time>}>
                    <div className="flex flex-col items-center p-4 w-72 text-center">
                        <div className="text-3xl font-light tracking-tight">{time.format('h:mm:ss A')}</div>
                        <div className="text-sm text-white/60 mt-1">{time.format('dddd, MMMM D, YYYY')}</div>
                        <div className="w-full mt-4">
                            <MenuSeparator />
                            <MenuItem onClick={() => {}} icon={Settings}>Open Date & Time Settings...</MenuItem>
                        </div>
                    </div>
                </SystemMenu>
            </div>
        </nav>
    );
};

export default Navbar;