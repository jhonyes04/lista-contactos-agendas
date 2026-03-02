import { useState } from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { toast } from 'react-toastify';
import * as api from '../api/api';

export const ContactCard = ({ contact }) => {
    const { store, dispatch } = useGlobalReducer();
    const [mostrarModal, setMostrarModal] = useState(false);

    const handleClickDelete = async (contact) => {
        try {
            const contactoEliminado = await api.deleteContact(
                contact.id,
                dispatch,
                store.agendaActiva,
            );

            if (contactoEliminado) {
                setMostrarModal(false);

                toast.success(
                    <span>
                        Contacto <strong>{contact.name}</strong> eliminiado
                        correctamente
                    </span>,
                    {
                        position: 'top-center',
                        autoClose: 2000,
                        closeOnClick: false,
                    },
                );
            }
        } catch (error) {
            console.error('Error al eliminar contacto:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row border border-1 rounded-3 py-2 px-5 align-items-center">
                <div className="col-12 col-md-10 d-flex flex-column flex-sm-row text-center text-sm-start">
                    <img
                        className="rounded-circle mx-auto mx-sm-0"
                        src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${contact.name}`}
                        alt={contact.name}
                        width={100}
                        height={100}
                    />

                    <div className="d-flex flex-column text-muted mx-auto ms-sm-5">
                        <p className="m-0 fw-bold fst-italic text-black">
                            {contact.name}
                        </p>
                        <p className="m-0">
                            <i className="fa-solid fa-location-dot me-2"></i>
                            {contact.address}
                        </p>
                        <p className="m-0">
                            <i className="fa-solid fa-phone me-2"></i>
                            {contact.phone}
                        </p>
                        <p className="m-0">
                            <i className="fa-solid fa-envelope me-2"></i>
                            {contact.email}
                        </p>
                    </div>
                </div>
                <div className="col-12 col-md-2 d-flex flex-row justify-content-center mt-3 flex-md-column align-items-md-end mt-md-0 gap-2">
                    <Link
                        to={`edit-contact/${contact.id}`}
                        className="btn btn-warning"
                    >
                        <i className="fa-solid fa-pencil"></i>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMostrarModal(true)}
                        className="btn btn-danger"
                    >
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>

            <DeleteConfirmModal
                abierto={mostrarModal}
                type="contact"
                nombre={contact.name}
                confirmar={() => handleClickDelete(contact)}
                cancelar={() => setMostrarModal(false)}
            />
        </div>
    );
};
