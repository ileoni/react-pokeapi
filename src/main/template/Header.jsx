import './Header.css';

import Logo from '../../../public/Logo.svg';
import Search from '../../../public/Search.svg';
import ButtonIcon from '../../components/ButtonIcon';

function Header ()
{
    return (
        <header className="wrapper__header">
            <div className="container header">
                <div className="header__logo">
                    <img src={Logo} alt="logo" />
                </div>
                <nav className="header__navigate">
                    <ul className="navigate__list">
                        <li className='navigate__item'>
                            <a className='navigate__link font-16' href="">
                                Pokédex
                            </a>
                        </li>
                        <li className='navigate__item'>
                            <a className='navigate__link font-16' href="">
                                Qual é esse pokemon?
                            </a>
                        </li>
                        <li className='navigate__item'>
                            <ButtonIcon icon={Search} alt="icone de pesquisa" text="Pesquisar..." />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>  
    );
}

export default Header;