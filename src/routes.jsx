import { HashRouter, BrowserRouter, Routes as Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Details from "./pages/details/Details";

function Routes()
{
    return (
        <Switch>
            <Route path="/" element={<Home/>}/>
            <Route exact path="/pokemon/:name" element={<Details/>}/>
        </Switch>
    );
}

export default Routes;