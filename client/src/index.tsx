import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Global } from '@emotion/react';
import globalStyles from '@styles/global';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Global styles={globalStyles} />
        <App />
    </React.StrictMode>,
);
