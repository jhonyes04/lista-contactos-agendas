import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Contact } from './pages/Contact';
import { AddContact } from './pages/AddContact';
import { Error404 } from './pages/Error404';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<Error404 />}>
            <Route path="/" element={<Contact />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="/edit-contact/:id" element={<AddContact />} />
            <Route path="*" element={<Error404 />} />
        </Route>,
    ),
);
