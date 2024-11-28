import { Link } from "react-router-dom";

import LogoSVG from "./ui/LogoSGV";
import { NavLink } from "react-router-dom";

function Header(params) {
    return (
        <div className="w-full h-20 bg-yellow-6000 shadow">
            <div className="px-8 lg:px-0 max-w-5xl w-full h-full mx-auto grid grid-cols-[1fr_auto] items-baseline content-center">
                <Link to="/" className="justify-self-center md:justify-self-start">
                    <LogoSVG className="fill-red-primary" />
                </Link>
                <nav>
                    <ul className="grid grid-flow-col gap-4">
                        <li className="hidden md:block font-medium">
                            <Link to="#">
                                Quem é esse pokemon
                            </Link>
                        </li>
                        <li className="hidden md:block font-medium">
                            <Link to="#">
                                Pokédex
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;