// context/RefsContext.js
import { createContext, useContext, useState } from "react"

const AppSelectContext = createContext(null)

export const useSelectedApp = () => {
  return useContext(AppSelectContext)
}

export const AppSelectProvider = ({ children }) => {
  const [appSelect, setAppSelect] = useState(null)
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  return (
    <AppSelectContext.Provider
      value={{
        appSelect,
        setAppSelect,
        isPopupVisible,
        setIsPopupVisible,
      }}
    >
      {children}
    </AppSelectContext.Provider>
  )
}
