import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { ContactCard } from '../components/ContactCard';
import { toast } from 'react-toastify';

import * as api from '../api/api';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();
    const [agendas, setAgendas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [girar, setGirar] = useState(false);

    useEffect(() => {
        const comprobarAgenda = async (nombreAgenda) => {
            try {
                setAgendas(await api.getAgendas());

                const existe = await api.existeAgenda(nombreAgenda);

                if (!existe) await api.postAgenda(nombreAgenda);

                await handleClickRefeshAgendas();

                await api.getContacts(dispatch, nombreAgenda);
            } catch (error) {
                console.error('Error al comprobar agenda:', error);
            }
        };

        comprobarAgenda(store.agendaActiva);
    }, [store.agendaActiva]);

    const cambiarAgenda = (e) => {
        dispatch({
            type: 'SET_AGENDA',
            payload: e.target.value,
        });
    };

    const handleClickRefeshAgendas = async () => {
        setGirar(true);
        setAgendas(await api.getAgendas());

        setTimeout(() => setGirar(false), 1000);
    };

    const handleClickEliminarAgenda = async (nombreAgenda) => {
        const agendaEliminada = await api.deleteAgenda(nombreAgenda);

        if (agendaEliminada) {
            setMostrarModal(false);
            if (agendas.length > 0) {
                dispatch({
                    type: 'SET_AGENDA',
                    payload: agendas[0],
                });
                handleClickRefeshAgendas();
            }
            toast.success(
                <span>
                    Agenda <strong>{nombreAgenda}</strong> eliminiada
                    correctamente
                </span>,
                {
                    position: 'top-center',
                    autoClose: 2000,
                    closeOnClick: false,
                },
            );
        }
    };

    return (
        <div className="container my-5" style={{ minWidth: '400px' }}>
            <div className="row">
                <div className="col-12 d-flex align-items-center mb-2 gap-1">
                    <div className="form-floating w-100">
                        <select
                            name="agenda"
                            id="agenda"
                            value={store.agendaActiva}
                            onChange={cambiarAgenda}
                            className="form-select"
                        >
                            {agendas.length > 0 ? (
                                agendas.map((agenda) => (
                                    <option value={agenda} key={agenda}>
                                        {agenda}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    No hay agendas creadas
                                </option>
                            )}
                        </select>
                        <label htmlFor="agenda">Selecciona una agenda</label>
                    </div>
                    <button
                        onClick={handleClickRefeshAgendas}
                        className="btn btn-success"
                        title="Actualizar lista de agendas"
                    >
                        <i
                            className={`fa-solid fa-refresh fa-2x ${girar ? 'refrescar' : ''}`}
                        ></i>
                    </button>
                    <button
                        type="button"
                        onClick={() => setMostrarModal(true)}
                        className="btn btn-danger"
                        title="Eliminar agenda seleccionada"
                    >
                        <i className="fa-solid fa-trash-can fa-2x"></i>
                    </button>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-12 col-md-8 d-flex justify-content-center justify-content-md-start align-items-center gap-2">
                            <h1>
                                {store.contacts.length > 0
                                    ? `Contactos ${store.agendaActiva}`
                                    : 'Lista de contactos vacía'}
                            </h1>
                            {store.contacts.length > 0 && (
                                <span className="badge bg-dark fs-4 rounded-3">
                                    {store.contacts.length}
                                </span>
                            )}
                        </div>

                        <div className="col-12 col-md-4 align-self-center text-center text-md-end">
                            <Link to="/add-contact" className="btn btn-success">
                                <i className="fa-solid fa-plus-circle me-2"></i>
                                Añadir contacto
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-body min-vh-100">
                    {store.contacts.length === 0 ? (
                        <div className="text-center fs-4 mt-5">
                            Haga click en el botón
                            <Link
                                to="/add-contact"
                                className="btn btn-success mx-2"
                            >
                                <i className="fa-solid fa-plus-circle me-2"></i>
                                Añadir contacto
                            </Link>
                            para agregar contacto
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-1">
                            {store.contacts.map((contact) => (
                                <ContactCard
                                    contact={contact}
                                    key={contact.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <DeleteConfirmModal
                abierto={mostrarModal}
                type="agenda"
                nombre={store.agendaActiva}
                confirmar={() => handleClickEliminarAgenda(store.agendaActiva)}
                cancelar={() => setMostrarModal(false)}
            />
        </div>
    );
};
