import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";

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
            </Header>
            <Outlet />
            <ScrollRestoration/>
        </>
    )
}

export default AppLayout;