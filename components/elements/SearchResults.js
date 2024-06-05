import { useAtom } from "jotai";
import {
  recentSelectedApp,
  searchedApps,
  searchKeyword,
  selectedAppCountry,
  showAppSelected,
  showSearchApps,
  userSelectedApp,
  pricingWrapper,
  popupVisibleAtom,
  isScrolled
} from "../../context/store";
import { prepareDataForRequests } from "../util";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
const searchShimmerArray = [0, 1, 2, 3, 4, 5];
const SearchResults = () => {
  const [countryCode, _1] = useAtom(selectedAppCountry);
  const [searchResults, setSearchResult] = useAtom(searchedApps);
  const [searchAppKeyword, _2] = useAtom(searchKeyword);
  const [searchAppVisible, setSearchAppVisible] = useAtom(showSearchApps);
  const [_4, setAppSelect] = useAtom(showAppSelected);
  const [_5, setUserSelectedApp] = useAtom(userSelectedApp);
  const [country] = useAtom(selectedAppCountry);
  const [isHidden, setIsHidden] = useAtom(pricingWrapper)
  const [_6, setIsPopupVisible] = useAtom(popupVisibleAtom);
  const [_7, setShouldScroll] = useAtom(isScrolled);
  const { data, isFetched, isPending, isError } = useQuery({
    queryKey: ["searchResults", searchAppKeyword, countryCode],
    queryFn: () => prepareDataForRequests(searchAppKeyword, countryCode),
    staleTime: Infinity,
  });
  if (isFetched) {
    setSearchResult(data);
  }
 
  function recentAppDataFromLocalStorage(appData) {
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

  function handleSelectedApp(data) {
    recentAppDataFromLocalStorage(data);
  }

  // ******** close suggestion list whenever click outside
  const appSuggestionRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const suggestion = appSuggestionRef.current;
      if (suggestion && !suggestion.contains(event.target)) {
        suggestion.classList.remove("format-suggestions");
        if (isHidden) {
          setIsHidden(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [appSuggestionRef]);

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
        <ul ref={appSuggestionRef} className="suggestions format-suggestions">
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
                  packageName: item.appName,
                  developer: item.developer,
                  icon_urls: item.app_icon,
                  device: item.device,
                  "data-package-url": item.dataPackageUrl,
                  "app-package-id": item.appPackageId,
                };
                if (searchAppVisible["search-box1"]) {
                  setIsPopupVisible(true)
                  setShouldScroll(true);
                }
                handleSelectedApp(data);
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
          <p className="info-search">
            Couldn't find your app try with{" "}
            <button className="audit-button">App ID</button> or{" "}
            <button className="audit-button">App URL</button>
          </p>
        </ul>
      )}
    </>
  );
};

export default SearchResults;
