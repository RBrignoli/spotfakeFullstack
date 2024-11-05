import { createContext, useState } from "react";

export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({})
    
    return (
        <AppContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </AppContext.Provider>
    )
}