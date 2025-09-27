import { NavLink, Outlet, ScrollRestoration, useParams } from "react-router-dom";

import { usePokemon } from "../hooks/usePokemon";
import Header from "../components/Header";
import LogoPokedexOne from "../components/LogoPokedexOne";
import Pokeball from "../components/Pokeball";

function AppLayout() {
    const { name } = useParams();
    
    const { loading } = usePokemon({ name });

    return (
        <>
        {
            loading ? (
                <div className="h-screen grid place-items-center">
                    <Pokeball className="fill-base-200 animate-spin"/>
                </div>
            ) : (
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
        </>
    )
}

export default AppLayout;