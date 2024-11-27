import { Routes as Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";

function Routes()
{
    return (
        <Switch>
            <Route path="/" element={<Home />}/>
            <Route path="/pokemon/:name" element={<Details />}/>
        </Switch>
    );
}

export default Routes;