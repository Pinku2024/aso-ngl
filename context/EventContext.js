// context/RefsContext.js
import { createContext, useContext, useState } from "react"

const AppSelectContext = createContext(null)

export const useSelectedApp = () => {
  return useContext(AppSelectContext)
}

export const AppSelectProvider = ({ children }) => {
  const [appSelect, setAppSelect] = useState(null)
  return (
    <AppSelectContext.Provider value={{ appSelect, setAppSelect }}>
      {children}
    </AppSelectContext.Provider>
  )
}
