import { createBrowserRouter } from 'react-router-dom';

import App from "./App";
import Home from "./pages/Home";
import Details from './pages/Details';
import AppLayout from "./layouts/AppLayout";

export const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                Component: AppLayout,
                children: [
                    {
                        index: true,
                        Component: Home
                    },
                    {
                        path: "pokemon/:name",
                        Component: Details
                    }
                ]
            }
        ]
    }
], {
    basename: import.meta.env.BASE_URL
});