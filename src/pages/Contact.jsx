import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { ContactCard } from '../components/ContactCard';

import * as api from '../api/api';

export const Contact = () => {
    const { store, dispatch } = useGlobalReducer();
    const [agendas, setAgendas] = useState([]);

    useEffect(() => {
        const comprobarAgenda = async (nombreAgenda) => {
            try {
                setAgendas(await api.getAgendas());

                const existe = await api.existeAgenda(nombreAgenda);

                if (!existe) await api.postAgenda(nombreAgenda);

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

    return (
        <div className="container my-5" style={{ minWidth: '400px' }}>
            <div className="row">
                <div className="col-12">
                    <select
                        name="agenda"
                        id="agenda"
                        value={store.agendaActiva}
                        onChange={cambiarAgenda}
                        className="form-select mb-2"
                    >
                        {agendas.map((agenda) => (
                            <option value={agenda} key={agenda}>
                                {agenda}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-12 col-md-8 d-flex justify-content-center justify-content-md-start align-items-center gap-2">
                            <h1>
                                {store.contacts.length > 0
                                    ? 'Contactos en agenda'
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
        </div>
    );
};
