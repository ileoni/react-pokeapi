import { Outlet } from "react-router-dom";

import { client } from "./configs/apollo-client";
import { ApolloProvider } from "@apollo/client";

function App() {
    return (
        <ApolloProvider client={client}>
            <Outlet />
        </ApolloProvider>
    );
}

export default App;