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
export const selectedCountryAtom = atom({
    code: "in",
    name: "India",
    flag: "in.png",
  });
