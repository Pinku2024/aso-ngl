import { useEffect, useState } from "react";
import { getRecentAppData } from "../util";
import { useAtom } from "jotai";
import { recentApps } from "../../context/store";
const RecentApps = () => {
  const [recentlySelectedApps, setRecentlySelectedApps] = useAtom(recentApps);
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
            onClick={() => {
              console.log(item.packageName, "clicked");
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
