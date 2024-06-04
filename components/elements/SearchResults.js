import { useAtom } from "jotai";
import {
  recentSelectedApp,
  searchedApps,
  searchKeyword,
  selectedAppCountry,
  showAppSelected,
  showSearchApps,
  userSelectedApp,
} from "../../context/store";
import { prepareDataForRequests } from "../util";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
const searchShimmerArray = [0, 1, 2, 3, 4, 5];
const SearchResults = () => {
  const [countryCode, _1] = useAtom(selectedAppCountry);
  const [searchResults, setSearchResult] = useAtom(searchedApps);
  const [searchAppKeyword, _2] = useAtom(searchKeyword);
  const [_3, setSearchAppVisible] = useAtom(showSearchApps);
  const [_4, setAppSelect] = useAtom(showAppSelected);
  const [_5, setUserSelectedApp] = useAtom(userSelectedApp);
  const [country, setCountry] = useAtom(selectedAppCountry);
  const [appDataLocal, setAppDataLocal] = useAtom(recentSelectedApp)
  console.log("local", appDataLocal)
  const { data, isFetched, isPending, isError } = useQuery({
    queryKey: ["searchResults", searchAppKeyword, countryCode],
    queryFn: () => prepareDataForRequests(searchAppKeyword, countryCode),
    staleTime: Infinity,
  });
  if (isFetched) {
    setSearchResult(data);
  }

  function recentAppDataFromLocalStorage(appData) {
    console.log("Set local data", appData)
    let oldAppData = localStorage.getItem("Recent Selected App");
    if (oldAppData) {
      let Array = JSON.parse(oldAppData);
      Array.unshift(appData);
      let uniqueArray = Array.filter(
        (item, index) =>
          Array.findIndex(
            (obj) => JSON.stringify(obj) === JSON.stringify(item)
          ) === index
      );
      localStorage.setItem("Recent Selected App", JSON.stringify(uniqueArray));
    } else {
      localStorage.setItem("Recent Selected App", JSON.stringify([appData]));
    }
  }
  // useEffect(() => {
  //   if (appDataLocal !== "" ) {
  //     console.log("appDataLoca", appDataLocal)
  //     recentAppDataFromLocalStorage(appDataLocal);
  //   }
  // }, [appDataLocal]);

  function handleSelectApp(data){
    console.log("Data", data)
    recentAppDataFromLocalStorage(data);
  }
  return (
    <>
      {isPending && (
        <div id="searching-shimmer1" className="searching-shimmer">
          <ul className="o-vertical-spacing o-vertical-spacing--l">
            {searchShimmerArray.map((item) => (
              <li key={item} className="blog-post o-media">
                <div className="o-media__figure">
                  <span className="skeleton-box"></span>
                </div>
                <div className="o-media__body">
                  <div className="o-vertical-spacing">
                    <h3 className="blog-post__headline">
                      <span
                        className="skeleton-box"
                        style={{ width: "55%" }}
                      ></span>
                    </h3>
                    <p>
                      <span
                        className="skeleton-box"
                        style={{ width: "80%" }}
                      ></span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isError && (
        <ul className="suggestions format-suggestions">
          <p className="info-search">App Not Found</p>
          <li className="li-suggestion-item">Could not find your app</li>
        </ul>
      )}
      {!isPending && isFetched && searchResults.length > 0 && (
        <ul className="suggestions format-suggestions">
          <p className="info-search">Search Results:</p>
          {searchResults.map((item) => (
            <li
              className="li-suggestion-item"
              application-url={item.dataPackageUrl}
              application-id={item.appPackageId}
              application-img-logo={item.app_icon}
              device={item.device}
              key={item.app_icon}
              onClick={(e) => {
                e.stopPropagation();
                const data = {
                  packageName:item.appName,
                  developer: item.developer,
                    icon_urls: item.app_icon,
                    device: item.device,
                    "data-package-url": item.dataPackageUrl,
                    "app-package-id": item.appPackageId, 
                }
                handleSelectApp(data)
                if (item.device === "android") {
                  setUserSelectedApp({
                    appPackageURL: item.dataPackageUrl,
                    applicationId: item.appPackageId,
                    device: "android",
                    country,
                  });
                }
                if (item.device === "apple") {
                  setUserSelectedApp({
                    appPackageURL: item.dataPackageUrl,
                    applicationId: item.appPackageId,
                    device: "apple",
                    country,
                  });
                }

                setAppSelect(true);
                setSearchAppVisible({});
                
              }}
            >
              <div className="show-device-icon">
                <div className="li-suggestion-item-logo">
                  <img
                    src={item.app_icon}
                    alt="app_icon"
                    className="app-icon-li-item"
                  />
                </div>
                <div className="li-suggestion-item-info">
                  <strong>{item.appName}</strong>
                  <span>{item.developer}</span>
                </div>
              </div>
              <div className="device-icon" device={item.device}>
                <img
                  src={item.deviceIcon}
                  alt="device-logo"
                  className="device-icon-logo"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchResults;
