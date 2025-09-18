import { Outlet, ScrollRestoration } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import { client } from "./configs/apollo-client";

function App() {
    return (
        <ApolloProvider client={client}>
            <Outlet />
            <ScrollRestoration/>
        </ApolloProvider>
    );
}

export default App;