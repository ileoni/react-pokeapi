import './App.css'

import Header from './template/Header';
import Routes from '../routes';
import { AppContextProvider } from '../contexts/app-context';

function App() {
  return (
    <AppContextProvider>
      <Header/>
      <Routes/>
    </AppContextProvider>
  )
}

export default App
