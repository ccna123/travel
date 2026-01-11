import { createContext, useState } from "react";

export const TravelContext = createContext()

export const TravelProvider = ({ children }) => {

    const [filterDestination, setFilterDestination] = useState([]);
    return (
        <TravelContext.Provider
            value={{
                filterDestination, setFilterDestination
            }}
        >
            {children}
        </TravelContext.Provider>
    )
}