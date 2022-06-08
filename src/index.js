import React from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const options = {
  position: positions.BOTTOM_RIGHT,
  timeout: 5000,
  offset: '5px',
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
        </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

