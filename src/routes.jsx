import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Default from "./pages/default";

function Routes()
{
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Switch>
                <Route path="/" element={<Home/>}/>
                <Route exact path="/pokemon/:name" element={<Details/>}/>
                <Route path="/default" element={<Default/>}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;