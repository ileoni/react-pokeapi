import { HashRouter, BrowserRouter, Routes as Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Default from "./pages/default";

function Routes()
{
    return (
        <HashRouter>
            <Switch>
                <Route path="/" element={<Home/>}/>
                <Route exact path="/pokemon/:name" element={<Details/>}/>
            </Switch>
        </HashRouter>
    );
}

export default Routes;