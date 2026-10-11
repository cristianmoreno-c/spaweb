import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SiteDataProvider } from './context/SiteData';
import './styles/global.css';
document.documentElement.classList.add('js');
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><SiteDataProvider><App /></SiteDataProvider></BrowserRouter></React.StrictMode>);
