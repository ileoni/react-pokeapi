import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './main/App.jsx'
import { HashRouter, BrowserRouter } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <HashRouter>
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
  // </HashRouter>
)
