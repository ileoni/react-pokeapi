import './Header.css';

import { HashLink } from 'react-router-hash-link';
import Logo from '../../assets/logo.svg';

function Header ()
{
    const baseUrl = import.meta.env.BASE_URL;
    
    return (
        <header className="wrapper__header">
            <div className="header m-[32px] md:m-[120px]">
                <div className="header__logo">
                    <HashLink to="/">
                        <img src={Logo} alt="logo" />
                    </HashLink>
                </div>
                <nav className="header__navigate">
                    <ul className="navigate__list">
                        <li className='navigate__item'>
                            <HashLink className='navigate__link' to="/#pokedex">
                                Pokédex
                            </HashLink>
                        </li>
                        <li className='navigate__item'>
                            <HashLink className='navigate__link' to="/#whos-that-pokemon">
                                Qual é esse pokemon?
                            </HashLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>  
    );
}

export default Header;