import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const AppSearch = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const appSearchRef = useRef();
  // Function to close the popup
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const closePopup = () => {
    setIsPopupVisible(false);
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      const searchHolder = document.getElementById("suggestions-box1");
      if (appSearchRef.current && !appSearchRef.current.contains(e.target)) {
        searchHolder.classList.remove("format-suggestions");
      }
      const target = e.target;
      if (target.classList.contains("search-input")) {
        console.log("Search input clicked");
      } else if (target.classList.contains("close-search-form")) {
        console.log("Close search form button clicked");
      } else if (target.classList.contains("skeleton-box")) {
        console.log("Skeleton box clicked");
      } else {
        searchHolder.classList.remove("format-suggestions");
      }
    });
  });

  // function to handle the queries
  async function handleRequestsAndProcessData(requestPlay, requestIOS) {
    try {
      const response1 = await fetch(requestIOS);
      const response2 = await fetch(requestPlay);
      const iOSResponse = await response1.json();
      const playResponse = await response2.json();

      const mergedData = {
        iOSResponse: iOSResponse,
        playResponse: playResponse,
      };
      // console.log("Merged Data", mergedData);

      const fullAppData = mergedExtractedData(mergedData);
      const suggestionList = createListWithDevice(fullAppData);

      if (suggestionList.length > 0) {
        suggestionList.unshift('<p class="info-search">Search Results</p>');
        suggestionList.push(
          '<p class="info-search" style={{textAlign: "center"}}>Unable to locate your App? Try using your App ID or <Link href="#lp-contact">App URL</Link></p>'
        );
      }

      return suggestionList;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }

  // list shown in the search options/ suggestions box
  function createListWithDevice(data) {
    return data.map((item) => {
      if (item.appName !== undefined) {
        let deviceIcon;
        if (item.device == "apple")
          deviceIcon =
            "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f645042f50918e6e390f_app-store.svg";
        else
          deviceIcon =
            "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f644817f822625b18bb6_google-play-store.svg";
        return `<li class= "li-suggestion-item" application-url="${item.dataPackageUrl}" application-id="${item.appPackageId}" application-img-logo="${item.app_icon}" device="${item.device}"><div class="show-device-icon"><div class="li-suggestion-item-logo"><img src="${item.app_icon}" alt="app_icon" class="app-icon-li-item" /></div><div class="li-suggestion-item-info"><strong>${item.appName}</strong><span>${item.developer}</span></div></div></div> <div class="device-icon" device="${item.device}"><img src="${deviceIcon}" alt="device-logo" class="device-icon-logo"/></div></li>`;
      }
    });
  }
  return (
    <div ref={appSearchRef} className="app-search-box-holder">
      <div className="search-box_holder flex-custom width">
        <div className="code-left">
          <div id="search-box1" className="main-box-holder">
            <div className="search-box-suggestion">
              <div className="main-search-bar">
                <input
                  type="text"
                  autoComplete="off"
                  id="search-bar-input1"
                  className="search-input"
                  placeholder="Search your iOS or android app"
                />
                <button
                  id="close-search-form1"
                  className="hidden close-search-form"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="16px"
                    height="16px"
                    viewBox="0 0 16 16"
                    version="1.1"
                  >
                    <g id="surface1">
                      <path
                        style={{
                          fill: "#5a5a5c",
                          fillRule: "nonzero",
                          fillOpacity: 1,
                          stroke: "none",
                        }}
                        d="M 0.332031 0.332031 C 0.546875 0.121094 0.839844 -0.00390625 1.144531 -0.00390625 C 1.445312 -0.00390625 1.738281 0.121094 1.953125 0.332031 L 8 6.382812 L 14.046875 0.332031 C 14.496094 -0.113281 15.21875 -0.113281 15.667969 0.332031 C 16.113281 0.78125 16.113281 1.503906 15.667969 1.953125 L 9.617188 8 L 15.667969 14.046875 C 16.113281 14.496094 16.113281 15.21875 15.667969 15.667969 C 15.21875 16.113281 14.496094 16.113281 14.046875 15.667969 L 8 9.617188 L 1.953125 15.667969 C 1.503906 16.113281 0.78125 16.113281 0.332031 15.667969 C -0.113281 15.21875 -0.113281 14.496094 0.332031 14.046875 L 6.382812 8 L 0.332031 1.953125 C 0.121094 1.738281 -0.00390625 1.445312 -0.00390625 1.144531 C -0.00390625 0.839844 0.121094 0.546875 0.332031 0.332031 Z M 0.332031 0.332031 "
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="app-output-box">
                <div
                  id="searching-shimmer1"
                  className="hidden searching-shimmer"
                >
                  <ul className="o-vertical-spacing o-vertical-spacing--l">
                    <li className="blog-post o-media">
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
                    <li className="blog-post o-media">
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
                    <li className="blog-post o-media">
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
                    <li className="blog-post o-media">
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
                    <li className="blog-post o-media">
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
                    <li className="blog-post o-media">
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
                  </ul>
                </div>
                <ul
                  id="suggestions-box1"
                  className="suggestions"
                  onClick={(e) => handleClick(e)}
                ></ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card-2 contact apple-ios-app_store hidden">
          <div className="app-logo_holder small-icon">
            <img
              src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
              loading="lazy"
              alt=""
              id="Platform-form-logo"
              className="logo-image-lead small-icon-platform"
            />
          </div>
          <div className="app-logo_holder bottom-spacing-margin">
            <img
              id="iOS-form-logo"
              loading="lazy"
              height=""
              alt="ios-app-logo"
              src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
              className="logo-image-lead"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSearch;
