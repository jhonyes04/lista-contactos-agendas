import { Link } from 'react-router-dom'; // O 'next/link' si usas Next.js

export const Error404 = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h3 className="fw-bold">Página no encontada</h3>
            <Link to="/" className="link-primary">
                Volver a la página de inicio
            </Link>
        </div>
    );
};
