import { useContext, useReducer, createContext } from 'react';
import contactReducer, { initialContacts } from '../store';

const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [store, dispatch] = useReducer(contactReducer, initialContacts());

    return (
        <ContactContext.Provider value={{ store, dispatch }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useGlobalReducer = () => {
    const { dispatch, store } = useContext(ContactContext);
    return { dispatch, store };
};

export default useGlobalReducer;
