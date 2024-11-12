import { createContext, useState } from "react";

export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({"id":3})
    
    return (
        <AppContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </AppContext.Provider>
    )
}