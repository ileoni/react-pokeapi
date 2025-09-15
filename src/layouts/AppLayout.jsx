import { NavLink, Outlet } from "react-router-dom";

import { NonRoute } from '../components/NonRoute';
import Header from "../components/Header";
import LogoPokedexOne from "../components/LogoPokedexOne";

function AppLayout() {
    return (
        <>
            <Header>
                <NavLink to="/">
                    <LogoPokedexOne className="fill-red-400"/>
                </NavLink>
                <NonRoute paths={['pokemon']}>
                    <ul className="hidden sm:grid grid-flow-col gap-4">
                        <li className="font-semibold">Pokédex</li>
                        <li className="font-semibold">Quem é esse pokemon</li>
                    </ul>
                </NonRoute>
            </Header>
            <Outlet />
        </>
    )
}

export default AppLayout;