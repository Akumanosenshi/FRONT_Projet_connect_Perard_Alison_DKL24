import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

export const renderApp = () => {
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

    reportWebVitals(console.log);
};

renderApp();
