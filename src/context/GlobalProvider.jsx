import { createContext, useState } from "react";

const GlobalContext = createContext({

})

let externalContextReference = null

export default function GlobalContextProvider({children}) {

  const ctxValue = {}

  externalContextReference = ctxValue;

  return (
    <GlobalContext.Provider value={ctxValue}>
      {children}
    </GlobalContext.Provider>
  )
}

export { externalContextReference, GlobalContext }