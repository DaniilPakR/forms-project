import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext({

})

let externalContextReference = null

export default function GlobalContextProvider({children}) {

  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("authSession")) || null);
  const [isAdmin, setIsAdmin] = useState(false);

  const ctxValue = {
    isLogged,
    setIsLogged,
    currentUser,
    setCurrentUser,
    isAdmin,
    setIsAdmin,
  }

  externalContextReference = ctxValue;

  return (
    <GlobalContext.Provider value={ctxValue}>
      {children}
    </GlobalContext.Provider>
  )
}

export { externalContextReference, GlobalContext }