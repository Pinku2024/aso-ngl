import { atom } from "jotai";

export const recentApps = atom([]);
export const showRecentApps = atom({});
export const loading = atom(false);
export const searchKeyword = atom("");
export const showSearchApps = atom({});
export const searchedApps = atom([]);
export const selectedAppCountry = atom("in");
export const showCloseBtn = atom(false);
