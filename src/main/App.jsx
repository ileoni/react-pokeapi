import { BrowserRouter } from 'react-router-dom';
import './App.css'

import Header from './template/Header';
import Routes from '../routes';

function App() {
  return (
    <>
        <Header/>
        <Routes/>
    </>
  )
}

export default App
