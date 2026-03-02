import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { ContactProvider } from './hooks/useGlobalReducer';
import './index.css';

const Main = () => {
    return (
        <React.StrictMode>
            <ContactProvider>
                <RouterProvider router={router}></RouterProvider>
            </ContactProvider>
        </React.StrictMode>
    );
};

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
