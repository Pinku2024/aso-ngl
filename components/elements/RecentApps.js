import { useEffect } from "react";
import { fetchAndStoreAppDataToBox, getRecentAppData } from "../util";
import { useAtom } from "jotai";
import {
  recentApps,
  selectedAppCountry,
  showAppSelected,
  showRecentApps,
  userSelectedApp,
} from "../../context/store";
const RecentApps = () => {
  const [recentlySelectedApps, setRecentlySelectedApps] = useAtom(recentApps);
  const [_, setShowRecentApps] = useAtom(showRecentApps);
  const [_1, setAppSelect] = useAtom(showAppSelected);
  const [_2, setUserSelectApp] = useAtom(userSelectedApp);
  const [country, setCountry] = useAtom(selectedAppCountry);
  useEffect(() => {
    setRecentlySelectedApps(getRecentAppData());
  }, []);
  return (
    <>
      <ul className="suggestions format-suggestions">
        <p className="info-search">Recently Selected Apps:</p>
        {recentlySelectedApps.map((item) => (
          <li
            key={item.packageName}
            className="li-suggestion-item"
            application-url={`${item["data-package-url"]}`}
            application-id={`${item["app-package-id"]}`}
            application-img-logo={`${item.icon_urls}`}
            device={`${item.device}`}
            onClick={(e) => {
              e.stopPropagation();

              if (item.device === "android") {
                setUserSelectApp(
                  fetchAndStoreAppDataToBox(
                    item["data-package-url"],
                    item["app-package-id"],
                    "android",
                    country
                  )
                );
              }
              if (item.device === "apple") {
                setUserSelectApp(
                  fetchAndStoreAppDataToBox(
                    item["data-package-url"],
                    item["app-package-id"],
                    "apple",
                    country
                  )
                );
              }
              setShowRecentApps({});
              setAppSelect(true);
            }}
          >
            <div className="show-device-icon">
              <div className="li-suggestion-item-logo">
                <img
                  src={item.icon_urls}
                  alt="app_icon"
                  className="app-icon-li-item"
                />
              </div>
              <div
                className="li-suggestion-item-info"
                dangerouslySetInnerHTML={{ __html: item.packageName }}
              >
                {/* {item.packageName} */}
              </div>
            </div>
            <div className="device-icon" device="${item.device}">
              <img
                src={item.deviceIcon}
                alt="device-logo"
                className="device-icon-logo"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecentApps;
