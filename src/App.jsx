import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import { client } from "./configs/apollo-client";
import AppContextProvider from "./contexts/app-context";
import Header from './components/Header';
import Routes from "./routes";

function App() {
    return (
        <ApolloProvider client={client}>
            <AppContextProvider>
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <Header />
                    <Routes />
                </BrowserRouter>
            </AppContextProvider>
        </ApolloProvider>
    );
}

export default App;