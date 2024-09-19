import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './main.css';
import App from './components/App';
import { getGallery, getPost, changePost } from './app-data/data-api';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App loadGallery={getGallery} getPost={getPost} changePost={changePost} />
    </HashRouter>
  </React.StrictMode>
);