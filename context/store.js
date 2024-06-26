import { atom } from "jotai"

export const recentApps = atom([])
export const showRecentApps = atom({})
export const loading = atom(false)
export const searchKeyword = atom("")
export const showSearchApps = atom({})
export const searchedApps = atom([])
export const selectedAppCountry = atom("in")
export const showCloseBtn = atom(false)
export const showAppSelected = atom(false)
export const userSelectedApp = atom({})
export const popupVisibleAtom = atom(false)
export const pricingWrapper = atom(false)
export const isScrolled = atom(false)
export const pricingTabs = atom("offeringsTab")
export const activeMenuTab = atom("#app-audit")
export const showMobileMenu = atom(false)
export const focusAtom = atom({})
export const formSubmitted = atom(false)
export const formInputData = atom({
  name: "",
  email: "",
  phone: "",
  message: "",
  appURL: "",
})
export const selectedCountryAtom = atom({
  code: "in",
  name: "India",
  flag: "in.png",
})

