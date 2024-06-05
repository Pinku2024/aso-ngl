import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import CountrySelect from "./elements/CountrySelect";
import { useAtom } from "jotai";
import {
  searchKeyword,
  showRecentApps,
  showSearchApps,
  popupVisibleAtom,
  showAppSelected,
  focusAtom,
} from "../context/store";
import RecentApps from "./elements/RecentApps";
import SearchResults from "./elements/SearchResults";

const Audit = () => {
  const [recentAppsVisible, setRecentAppsVisible] = useAtom(showRecentApps);
  const [searchAppKeyword, setSearchAppKeyword] = useAtom(searchKeyword);
  const [searchAppVisible, setSearchAppVisible] = useAtom(showSearchApps);
  const [_, setPopupVisible] = useAtom(popupVisibleAtom);
  const [selectedCountryCode, setSelectedCountryCode] = useState("us");
  const [appSelected, _3] = useAtom(showAppSelected);
  const [inputFocused, setInputFocused] = useAtom(focusAtom);
  const inputRef = useRef();
  // Function to close the popup
  const togglePopup = () => {
    setPopupVisible(true);
  };
  const clearInput = () => {
    setSearchAppKeyword('');
  };

  return (
    <>
      <section id="app-audit" className="section service over-flow-new">
        <div className="container-hero-logos new-bg w-container">
          <article className="home-hero-wrapper flex-vertical new-spacing">
            <div className="split-content home-hero-left flex-centre margin-new">
              <h1 className="heading-hero new-centre-aligned">
                <strong>App Store Optimization</strong>
              </h1>
              <p className="paragraph home-hero new-centre-aligned width">
                {/* Since 2016, we&#x27;ve been at the forefront of App Marketing.
                Some of world&#x27;s top brands too read these lines, before
                contacting and working with us. The next 5 minutes you spend
                reading about us will give you a glimpse to our approach. Want a
                customised presentation? Let us know. */}
                Since 2016, we&#x27;ve been leading the way in App Marketing.
                Many of the world&#x27;s top brands have read these lines before
                reaching out to work with us. Spend the next five minutes
                learning about our approach.
                <br />
                <strong style={{ fontWeight: "bolder", color: "#5c5cbf" }}>
                  Want a customised presentation? Let us know.
                </strong>
              </p>
            </div>

            <div className="app-search-box-holder">
              <div className="search-box_holder flex-custom width">
                <div className="code-left">
                  <div className="html-embed-8 w-embed">
                    <div id="search-box1" className="main-box-holder">
                      <div className="search-box-suggestion">
                        <div className="main-search-bar">
                          <input
                            type="text"
                            autoComplete="off"
                            id="search-bar-input1"
                            className="search-input"
                            placeholder="Search your iOS or android app"
                            value={searchAppKeyword}
                            ref={inputRef}
                            onFocus={() => {
                              setRecentAppsVisible((prev) => {
                                return {
                                  ...prev,
                                  ["suggestions-box1"]: true,
                                };
                              });
                              setInputFocused((prev) => {
                                return {
                                  ...prev,
                                  ["search-box1"]: true,
                                };
                              });
                            }}
                            onChange={(e) => {
                              if (e.target.value.trim().length === 0) {
                                setRecentAppsVisible({});
                                setSearchAppVisible({});
                              }
                              setRecentAppsVisible({});
                              setSearchAppKeyword(e.target.value);
                              setSearchAppVisible((prev) => {
                                return {
                                  ...prev,
                                  ["search-box1"]: true,
                                };
                              });
                            }}
                          />
                          {inputFocused["search-box1"] && (
                            <button
                              id="close-search-form1"
                              className="close-search-form"
                              onClick={() => {
                                setRecentAppsVisible({});
                                setSearchAppVisible({});
                                setInputFocused({});
                                clearInput()
                              }}
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
                          )}
                        </div>
                        <div className="app-output-box">
                          {recentAppsVisible["suggestions-box1"] && (
                            <RecentApps />
                          )}
                          {searchAppVisible["search-box1"] && (
                            <SearchResults  />
                          )}
                        </div>
                      </div>
                      <CountrySelect
                        setSelectedCountryCode={setSelectedCountryCode}
                        showCode={false}
                      />
                      <button
                        type="submit"
                        className="audit-button"
                        id="Audit-App-button"
                        onClick={() => {
                          if (appSelected) {
                            console.log(appSelected);
                            togglePopup();
                          } else {
                            inputRef.current.focus();
                          }
                        }}
                      >
                        Start Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Audit;
