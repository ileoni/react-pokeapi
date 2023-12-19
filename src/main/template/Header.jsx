import './Header.css';

import Logo from '../../assets/logo.svg';

function Header ()
{
    return (
        <header className="wrapper__header">
            <div className="header m-[32px] md:m-[120px]">
                <div className="header__logo">
                    <a href={import.meta.env.BASE_URL}>
                        <img src={Logo} alt="logo" />
                    </a>
                </div>
                <nav className="header__navigate">
                    <ul className="navigate__list">
                        <li className='navigate__item'>
                            <a className='navigate__link' href="/#pokedex">
                                Pokédex
                            </a>
                        </li>
                        <li className='navigate__item'>
                            <a className='navigate__link' href="/#whos-that-pokemon">
                                Qual é esse pokemon?
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>  
    );
}

export default Header;