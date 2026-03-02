const AGENDA = import.meta.env.VITE_AGENDA;
const API_AGENDA = import.meta.env.VITE_URL_API;
const API_CONTACTS = `${API_AGENDA}/${AGENDA}/contacts`;

export const getAgendas = async () => {
    try {
        const response = await fetch(API_AGENDA);

        if (!response.ok) throw new Error('Error al obtener agendas');

        const data = await response.json();

        return data.agendas.map((agenda) => agenda.slug);
    } catch (error) {
        console.error('Error al obtener agendas:', error);
    }
};

export const postAgenda = async () => {
    try {
        const response = await fetch(API_AGENDA + '/' + AGENDA, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        return response.ok;
    } catch (error) {
        console.error('Error al crear agenda:', error);
        return false;
    }
};

export const getContacts = async (dispatch, agenda) => {
    try {
        const response = await fetch(API_AGENDA + '/' + agenda + '/contacts');

        if (!response.ok) throw new Error('Error al obtener contactos');

        const data = await response.json();

        dispatch({
            type: 'GET_CONTACTS',
            payload: data.contacts,
        });

        return data.contacts;
    } catch (error) {
        console.error('Error al obtener contactos:', error);
    }
};

export const postContact = async (contact, dispatch, agenda) => {
    try {
        const response = await fetch(API_AGENDA + '/' + agenda + '/contacts', {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Error al agregar contacto');

        const data = await response.json();

        dispatch({
            type: 'ADD_CONTACT',
            payload: data,
        });

        return data;
    } catch (error) {
        console.error('Error al agregar contacto:', error);
    }
};

export const putContact = async (id, contact, dispatch, agenda) => {
    try {
        const response = await fetch(
            API_AGENDA + '/' + agenda + '/contacts/' + id,
            {
                method: 'PUT',
                body: JSON.stringify(contact),
                headers: { 'Content-Type': 'application/json' },
            },
        );

        if (!response.ok) throw new Error('Error al actualizar contacto');
        dispatch({
            type: 'UPDATE_CONTACT',
            payload: contact,
        });

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
    }
};

export const deleteContact = async (id, dispatch, agenda) => {
    try {
        const response = await fetch(
            API_AGENDA + '/' + agenda + '/contacts/' + id,
            {
                method: 'DELETE',
            },
        );

        if (!response.ok) throw new Error('Error al eliminar contacto');

        dispatch({
            type: 'DELETE_CONTACT',
            payload: id,
        });

        return true;
    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        return false;
    }
};

export const existeAgenda = async (nombreAgenda) => {
    try {
        const agendas = await getAgendas();

        return agendas.some((agenda) => agenda === nombreAgenda);
    } catch (error) {
        console.error('Error al comprobar existencia de agenda:', error);
        return false;
    }
};
