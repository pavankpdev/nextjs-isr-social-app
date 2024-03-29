import React, { ReactChild, useState } from "react";

// API
import {getUsersApi} from "../utils/userApi";

// CONFIGS
import axios from "../configs/axios";

type USER = {
    firstName: string,
    id: string,
    lastName: string,
    username: string
}

interface USER_CONTEXT {
    user: USER,
    updateUser: (user: USER) => void,
    resetUserContext: () => void,
    logoutUser: () => void
}

export const UserContext = React.createContext<USER_CONTEXT>({
    user: {
        firstName: '',
        id: '',
        lastName: '',
        username: ''
    },
    updateUser: (user: USER) => {},
    resetUserContext: () => {},
    logoutUser: () => {}
});

export const UserProvider: React.FC<{ children: ReactChild }> = ({children}) => {

    const [user, setUser] = useState({
        firstName: '',
        id: '',
        lastName: '',
        username: ''
    });

    const getUser = async () => {
        try {
            const userId = localStorage.getItem('isr');
            if(!userId && !window.location.pathname.includes('/auth')) {
                window.location.href = '/auth?noToken=true';
                return;
            }
            const res = await getUsersApi('username', (JSON.parse(userId as string) as {token: string, username: string}).username)

            if(!res.length){
                window.location.href = '/auth/?noToken=true'
            }
            const {firstName, lastName, username, id} = res[0];
            setUser({firstName, lastName, username, id})

        } catch (error: any) {
            console.log(error);
        }
    };

    const updateUser = (user: USER) => {
        setUser({...user})
    }

    React.useEffect(() => {
        getUser();
    }, [axios]);

    const resetUserContext = () => {
        setUser({
            firstName: '',
            id: '',
            lastName: '',
            username: ''
        })
    };

    const logoutUser = () => {
        localStorage.removeItem('isr');
        resetUserContext();
        window.location.href = '/auth'
    }

    return (
        <UserContext.Provider
            value={{ user, logoutUser, resetUserContext, updateUser }}
        >
            {children}
        </UserContext.Provider>
    );
};