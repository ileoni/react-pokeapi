import { Link } from "react-router-dom";

import Logo from '../assets/logo.svg';

function Header() {
    return (  
        <header className='py-4 shadow-lg'>
            <div className="max-w-5xl mx-auto px-8 xl:px-0 grid md:grid-cols-[1fr_auto] justify-center items-baseline">
                <Link to="/">
                    <img src={Logo} alt="imagem logo" />
                </Link>
                <nav className="hidden md:block">
                    <ul className='grid grid-flow-col auto-cols-auto gap-8'>
                        <li>
                            <Link to="#pokedex" className="font-roboto">
                                Pokédex
                            </Link>
                        </li>
                        <li>
                            <Link to="#whos-that-pokemon" className="font-roboto">
                                Quem é esse pokemon?
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;