import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { toast } from 'react-toastify';

import * as api from '../api/api';

export const AddContact = () => {
    const { id } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
    });

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const contactEdit = store.contacts.find(
                (contact) => String(contact.id) === String(id),
            );

            if (contactEdit) {
                setInputs({
                    name: contactEdit.name,
                    email: contactEdit.email,
                    phone: contactEdit.phone,
                    address: contactEdit.address,
                });
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let contactoGuardado = null;

        if (id) {
            contactoGuardado = await api.putContact(
                id,
                inputs,
                dispatch,
                store.agendaActiva,
            );
        } else {
            contactoGuardado = await api.postContact(
                inputs,
                dispatch,
                store.agendaActiva,
            );
        }

        if (contactoGuardado) {
            navigate('/');

            toast.success(
                <span>
                    Contacto <strong>{contactoGuardado.name}</strong>{' '}
                    {id ? 'actualizado' : 'creado'} correctamente
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
        <div className="container w-75 mt-5">
            <div className="card mt-4">
                <div className="card-header d-flex justify-content-center align-items-center">
                    <i
                        className={`me-2 fa-solid fa-2x ${id ? 'fa-pencil' : 'fa-plus-circle'}`}
                    ></i>
                    <h1 className="text-center m-0">
                        {id ? 'Editar contacto' : 'Nuevo contacto'}
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body d-flex flex-column gap-3">
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                required
                                value={inputs.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                required
                                value={inputs.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Teléfono</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="form-control"
                                required
                                value={inputs.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Dirección</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                required
                                value={inputs.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-end gap-2">
                        <Link to="/" className="btn btn-outline-secondary">
                            <i className="fa-solid fa-circle-xmark me-2"></i>
                            Cancelar
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            <i className="fa-solid fa-floppy-disk me-2"></i>
                            {id ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
