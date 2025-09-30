import { NavLink, Outlet, useParams } from "react-router-dom";

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
        </>
    )
}

export default AppLayout;