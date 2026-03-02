import { Outlet } from 'react-router-dom/dist';
import { ToastContainer } from 'react-toastify';

export const Layout = () => {
    return (
        <>
            <Outlet />
            <ToastContainer />
        </>
    );
};
