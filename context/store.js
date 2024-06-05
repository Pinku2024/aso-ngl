import { atom } from "jotai";

export const recentApps = atom([]);
export const showRecentApps = atom({});
export const loading = atom(false);
export const searchKeyword = atom("");
export const showSearchApps = atom({});
export const searchedApps = atom([]);
export const selectedAppCountry = atom("in");
export const showCloseBtn = atom(false);
export const showAppSelected = atom(false);
export const userSelectedApp = atom({});
export const popupVisibleAtom = atom(false);
export const pricingWrapper = atom(false);
export const isScrolled = atom(false)
export const pricingTabs = atom("offeringsTab")
export const selectedCountryAtom = atom({
  code: "in",
  name: "India",
  flag: "in.png",
});

export const focusAtom = atom({});
