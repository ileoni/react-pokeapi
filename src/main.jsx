import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './main/App.jsx'
import { HashRouter } from "react-router-dom";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
)
