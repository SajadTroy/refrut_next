// app/404-context.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextProps {
    is404: boolean;
    setIs404: (value: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [is404, setIs404] = useState(false);

    return (
        <AppContext.Provider value={{ is404, setIs404 }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider');
    }
    return context;
}