    import React, { createContext, useContext, useState } from 'react';

    interface Person {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    birthday: string;
    city: string;
    phone: string;
    }

    interface SelectedUserContextType {
    selectedUser: Person | null;
    setSelectedUser: (user: Person | null) => void;
    }

    export const SelectedUserContext = createContext<SelectedUserContextType | undefined>(undefined);

    export const SelectedUserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState<Person | null>(null);

    return (
        <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
        {children}
        </SelectedUserContext.Provider>
    );
    };

    export const useSelectedUser = () => {
    const context = useContext(SelectedUserContext);
    if (context === undefined) {
        throw new Error('useSelectedUser must be used within a SelectedUserProvider');
    }
    return context;
    };