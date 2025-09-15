import { createBrowserRouter } from 'react-router-dom';

import App from "./App";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Details from './pages/Details';

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
                        path: 'pokemon/:name',
                        Component: Details
                    }
                ]
            }
        ]
    }
]);