import { useState, useEffect, useRef } from "react"
import CountrySelect from "./elements/CountrySelect"
import Lottie from "lottie-react"
import asoGreen from "../public/assets/documents/aso-green.json"
import conversionMarketing from "../public/assets/documents/conversion-marketing.json"
import starRating from "../public/assets/documents/Five-Star-Rating.json"
import RecentApps from "./elements/RecentApps"
import { useAtom } from "jotai"
import {
  searchKeyword,
  showAppSelected,
  showRecentApps,
  showSearchApps,
  focusAtom,
  isScrolled,
} from "../context/store"
import SearchResults from "./elements/SearchResults"
import MHRScore from "./elements/mhrScore"
import AppInstalls from "./elements/appInstalls"
import CTR from "./elements/CTR"
const Services = () => {
  const [recentAppsVisible, setRecentAppsVisible] = useAtom(showRecentApps)
  const [activeSol, setActiveSol] = useState("solution1")
  const [selectedCountryCode, setSelectedCountryCode] = useState("in")
  const [searchAppVisible, setSearchAppVisible] = useAtom(showSearchApps)
  const [searchAppKeyword, setSearchAppKeyword] = useAtom(searchKeyword)
  const [appSelected] = useAtom(showAppSelected)
  const [inputFocused, setInputFocused] = useAtom(focusAtom)
  const [shouldScroll] = useAtom(isScrolled)

  const targetRef = useRef(null)
  useEffect(() => {
    if (shouldScroll && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [shouldScroll])

  return (
    <section
      ref={targetRef}
      id="services"
      className="tabsection"
    >
      <div className="container-11">
        <div className="title-wrap-2 horizontal lesspadding">
          <h2
            style={
              {
                transform:
                "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              }
            }
            className="heading tabsectiontitle"
          >
            Improve App&#x27;s Organic Visibility
          </h2>
          <p
            style={{
              transform:
                "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            }}
            className="paragraph-main-centre"
          >
            Our app marketing solutions for growing an app&#x27;s organic
            visibility
          </p>
        </div>

        <div
          data-current="Tab 2"
          data-easing="ease"
          data-duration-in="300"
          data-duration-out="100"
          className="tab-component w-tabs"
        >
          <div className="tabs-menu w-tab-menu">
            <div
              onClick={e => {
                // e.preventDefault()
                e.stopPropagation()
                setActiveSol("solution1")
              }}
              data-w-tab="Tab 2"
              className={`tab-button-2 w-inline-block w-tab-link ${
                activeSol === "solution1" ? "w--current" : ""
              }`}
            >
              <div className="tab-button-content-2">
                <div className="tab-button-title">
                  <div className="div-block-13">
                    <div className="div-block-49">
                      <img
                        loading="lazy"
                        src="/assets/imgs/Frame-2403.svg"
                        alt=""
                      />
                    </div>
                    <div className="text-block-4">Improve Installs</div>
                  </div>
                  <img
                    width="30"
                    height="30"
                    alt="Expanding list"
                    src="/assets/imgs/expand_less_black_24dp-1.svg"
                    loading="lazy"
                    className="chevron-2 hidden"
                  />
                </div>

                {activeSol === "solution1" && (
                  <div className="tab-button-desc-wrapper">
                    {" "}
                    <div
                      // ref={appSuggestionRef}
                      className="app-search-box-holder margin-top new-height mobile"
                    >
                      {!appSelected && (
                        <div className="search-box_holder flex-custom">
                          <div className="code-left">
                            <div className="html-embed-14 w-embed">
                              <div
                                id="search-box6"
                                className="main-box-holder mini-main-container"
                              >
                                <div className="search-box-suggestion">
                                  <div className="main-search-bar">
                                    <input
                                      type="text"
                                      autoComplete="off"
                                      id="search-bar-input6"
                                      className="search-input"
                                      placeholder="Search your iOS or android app"
                                      value={searchAppKeyword}
                                      onFocus={() => {
                                        setRecentAppsVisible(prev => {
                                          return {
                                            ...prev,
                                            ["suggestions-box6"]: true,
                                          }
                                        })
                                        setInputFocused(prev => {
                                          return {
                                            ...prev,
                                            ["suggestions-box6"]: true,
                                          }
                                        })
                                      }}
                                      onChange={e => {
                                        if (
                                          e.target.value.trim().length === 0
                                        ) {
                                          setRecentAppsVisible({})
                                          setSearchAppVisible({})
                                        }
                                        setRecentAppsVisible({})
                                        setSearchAppKeyword(e.target.value)
                                        setSearchAppVisible(prev => {
                                          return {
                                            ...prev,
                                            ["search-box6"]: true,
                                          }
                                        })
                                      }}
                                      // remove this once we move to the app select functionality
                                    />
                                    <button
                                      id="close-search-form6"
                                      className="close-search-form"
                                      onClick={() => {
                                        setRecentAppsVisible({})
                                        setSearchAppVisible({})
                                        setInputFocused({})
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
                                        <g id="surface6">
                                          <path
                                            style={{
                                              stroke: "none",
                                              fillRule: "nonzero",
                                              fill: "#5a5a5c",
                                              fillOpacity: 1,
                                            }}
                                            d="M 0.332031 0.332031 C 0.546875 0.121094 0.839844 -0.00390625 1.144531 -0.00390625 C 1.445312 -0.00390625 1.738281 0.121094 1.953125 0.332031 L 8 6.382812 L 14.046875 0.332031 C 14.496094 -0.113281 15.21875 -0.113281 15.667969 0.332031 C 16.113281 0.78125 16.113281 1.503906 15.667969 1.953125 L 9.617188 8 L 15.667969 14.046875 C 16.113281 14.496094 16.113281 15.21875 15.667969 15.667969 C 15.21875 16.113281 14.496094 16.113281 14.046875 15.667969 L 8 9.617188 L 1.953125 15.667969 C 1.503906 16.113281 0.78125 16.113281 0.332031 15.667969 C -0.113281 15.21875 -0.113281 14.496094 0.332031 14.046875 L 6.382812 8 L 0.332031 1.953125 C 0.121094 1.738281 -0.00390625 1.445312 -0.00390625 1.144531 C -0.00390625 0.839844 0.121094 0.546875 0.332031 0.332031 Z M 0.332031 0.332031 "
                                          ></path>
                                        </g>
                                      </svg>
                                    </button>
                                  </div>

                                  <div className="app-output-box">
                                    {recentAppsVisible["suggestions-box6"] && (
                                      <RecentApps />
                                    )}{" "}
                                    {searchAppVisible["search-box6"] && (
                                      <SearchResults />
                                    )}
                                  </div>
                                </div>
                                <CountrySelect
                                  showCode={true}
                                  setSelectedCountryCode={
                                    setSelectedCountryCode
                                  }
                                />
                              </div>
                            </div>
                            <div className="image-content-wrapper">
                              <div className="lottie-animation-2">
                                <Lottie
                                  animationData={asoGreen}
                                  loop={true}
                                  // style={{ height: 300, width: 300 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {appSelected && <AppInstalls mobile="mobile" />}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={e => {
                // e.preventDefault()
                e.stopPropagation()
                setActiveSol("solution2")
              }}
              data-w-tab="Tab 3"
              className={`tab-button-2 w-inline-block w-tab-link ${
                activeSol === "solution2" ? "w--current" : ""
              }`}
            >
              <div className="tab-button-content-2">
                <div className="tab-button-title">
                  <div className="div-block-13">
                    <div className="div-block-49">
                      <img
                        loading="lazy"
                        src="/assets/imgs/Frame-2402.svg"
                        alt=""
                      />
                    </div>
                    <div className="text-block-4">Improve Ratings</div>
                  </div>
                  <img
                    width="30"
                    height="60"
                    alt="Expanding list"
                    src="/assets/imgs/expand_less_black_24dp-1.svg"
                    loading="lazy"
                    className="chevron-2 hidden"
                  />
                </div>
                {activeSol === "solution2" && (
                  <div className="tab-button-desc-wrapper">
                    <div
                      // ref={appSuggestionRef}
                      className="app-search-box-holder margin-top new-height mobile"
                    >
                      {!appSelected && (
                        <div className="search-box_holder flex-custom width">
                          <div className="code-left">
                            <div className="html-embed-14 w-embed">
                              <div
                                id="search-box7"
                                className="main-box-holder mini-main-container"
                              >
                                <div className="search-box-suggestion">
                                  <div className="main-search-bar">
                                    <input
                                      type="text"
                                      autoComplete="off"
                                      id="search-bar-input7"
                                      className="search-input"
                                      placeholder="Search your iOS or android app"
                                      value={searchAppKeyword}
                                      onFocus={() => {
                                        setRecentAppsVisible(prev => {
                                          return {
                                            ...prev,
                                            ["suggestions-box7"]: true,
                                          }
                                        })
                                        setInputFocused(prev => {
                                          return {
                                            ...prev,
                                            ["suggestions-box7"]: true,
                                          }
                                        })
                                      }}
                                      onChange={e => {
                                        if (
                                          e.target.value.trim().length === 0
                                        ) {
                                          setRecentAppsVisible({})
                                          setSearchAppVisible({})
                                        }
                                        setRecentAppsVisible({})
                                        setSearchAppKeyword(e.target.value)
                                        setSearchAppVisible(prev => {
                                          return {
                                            ...prev,
                                            ["search-box7"]: true,
                                          }
                                        })
                                      }}
                                    />
                                    {inputFocused["suggestions-box7"] && (
                                      <button
                                        id="close-search-form7"
                                        className="close-search-form"
                                        onClick={() => {
                                          setRecentAppsVisible({})
                                          setSearchAppVisible({})
                                          setInputFocused({})
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
                                          <g id="surface7">
                                            <path
                                              style={{
                                                stroke: "none",
                                                fillRule: "nonzero",
                                                fill: "#5a5a5c",
                                                fillOpacity: 1,
                                              }}
                                              d="M 0.332031 0.332031 C 0.546875 0.121094 0.839844 -0.00390625 1.144531 -0.00390625 C 1.445312 -0.00390625 1.738281 0.121094 1.953125 0.332031 L 8 6.382812 L 14.046875 0.332031 C 14.496094 -0.113281 15.21875 -0.113281 15.667969 0.332031 C 16.113281 0.78125 16.113281 1.503906 15.667969 1.953125 L 9.617188 8 L 15.667969 14.046875 C 16.113281 14.496094 16.113281 15.21875 15.667969 15.667969 C 15.21875 16.113281 14.496094 16.113281 14.046875 15.667969 L 8 9.617188 L 1.953125 15.667969 C 1.503906 16.113281 0.78125 16.113281 0.332031 15.667969 C -0.113281 15.21875 -0.113281 14.496094 0.332031 14.046875 L 6.382812 8 L 0.332031 1.953125 C 0.121094 1.738281 -0.00390625 1.445312 -0.00390625 1.144531 C -0.00390625 0.839844 0.121094 0.546875 0.332031 0.332031 Z M 0.332031 0.332031 "
                                            ></path>
                                          </g>
                                        </svg>
                                      </button>
                                    )}
                                  </div>
                                  <div className="app-output-box">
                                    {recentAppsVisible["suggestions-box7"] && (
                                      <RecentApps />
                                    )}{" "}
                                    {searchAppVisible["search-box7"] && (
                                      <SearchResults />
                                    )}
                                  </div>
                                </div>
                                <CountrySelect
                                  showCode={true}
                                  setSelectedCountryCode={
                                    setSelectedCountryCode
                                  }
                                />
                              </div>
                            </div>
                            <div className="image-content-wrapper">
                              <div
                                className="lottie-animation-2"
                                style={{ transform: "translateY(100px)" }}
                              >
                                <Lottie
                                  animationData={starRating}
                                  loop={true}
                                  type="lottie"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {appSelected && <CTR mobile="mobile" />}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={e => {
                // e.preventDefault()
                e.stopPropagation()
                setActiveSol("solution3")
              }}
              data-w-tab="Tab 4"
              className={`tab-button-2 w-inline-block w-tab-link ${
                activeSol === "solution3" ? "w--current" : ""
              }`}
            >
              <div className="tab-button-content-2">
                <div className="tab-button-title">
                  <div className="div-block-13">
                    <div className="div-block-49">
                      <img
                        loading="lazy"
                        src="/assets/imgs/Frame-2400.svg"
                        alt=""
                      />
                    </div>
                    <div className="text-block-4">Improve Conversions</div>
                  </div>
                  <img
                    width="30"
                    height="30"
                    alt="Expanding list"
                    src="/assets/imgs/expand_less_black_24dp-1.svg"
                    loading="lazy"
                    className="chevron-2 hidden"
                  />
                </div>
                {activeSol === "solution3" && (
                  <div className="tab-button-desc-wrapper">
                    <div className="app-search-box-holder margin-top new-height mobile">
                      {!appSelected && (
                        <div className="search-box_holder flex-custom width">
                          <div className="code-left">
                            <div className="html-embed-14 w-embed">
                              <div
                                id="search-box8"
                                className="main-box-holder mini-main-container"
                              >
                                <div className="search-box-suggestion">
                                  <div className="main-search-bar">
                                    <input
                                      type="text"
                                      autoComplete="off"
                                      id="search-bar-input8"
                                      className="search-input"
                                      placeholder="Search your iOS or android app"
                                      value={searchAppKeyword}
                                      onFocus={() => {
                                        setRecentAppsVisible(prev => {
                                          return {
                                            ...prev,
                                            ["suggestions-box8"]: true,
                                          }
                                        })
                                        setInputFocused(prev => {
                                          return {
                                            ...prev,
                                            ["suggestions-box8"]: true,
                                          }
                                        })
                                      }}
                                      onChange={e => {
                                        if (
                                          e.target.value.trim().length === 0
                                        ) {
                                          setRecentAppsVisible({})
                                          setSearchAppVisible({})
                                        }
                                        setRecentAppsVisible({})
                                        setSearchAppKeyword(e.target.value)
                                        setSearchAppVisible(prev => {
                                          return {
                                            ...prev,
                                            ["search-box8"]: true,
                                          }
                                        })
                                      }}
                                    />
                                    {inputFocused["suggestions-box8"] && (
                                      <button
                                        id="close-search-form8"
                                        className="close-search-form"
                                        onClick={() => {
                                          setRecentAppsVisible({})
                                          setSearchAppVisible({})
                                          setInputFocused({})
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
                                          <g id="surface8">
                                            <path
                                              style={{
                                                stroke: "none",
                                                fillRule: "nonzero",
                                                fill: "#5a5a5c",
                                                fillOpacity: 1,
                                              }}
                                              d="M 0.332031 0.332031 C 0.546875 0.121094 0.839844 -0.00390625 1.144531 -0.00390625 C 1.445312 -0.00390625 1.738281 0.121094 1.953125 0.332031 L 8 6.382812 L 14.046875 0.332031 C 14.496094 -0.113281 15.21875 -0.113281 15.667969 0.332031 C 16.113281 0.78125 16.113281 1.503906 15.667969 1.953125 L 9.617188 8 L 15.667969 14.046875 C 16.113281 14.496094 16.113281 15.21875 15.667969 15.667969 C 15.21875 16.113281 14.496094 16.113281 14.046875 15.667969 L 8 9.617188 L 1.953125 15.667969 C 1.503906 16.113281 0.78125 16.113281 0.332031 15.667969 C -0.113281 15.21875 -0.113281 14.496094 0.332031 14.046875 L 6.382812 8 L 0.332031 1.953125 C 0.121094 1.738281 -0.00390625 1.445312 -0.00390625 1.144531 C -0.00390625 0.839844 0.121094 0.546875 0.332031 0.332031 Z M 0.332031 0.332031 "
                                            ></path>
                                          </g>
                                        </svg>
                                      </button>
                                    )}
                                  </div>

                                  <div className="app-output-box">
                                    {recentAppsVisible["suggestions-box8"] && (
                                      <RecentApps />
                                    )}
                                    {searchAppVisible["search-box8"] && (
                                      <SearchResults />
                                    )}
                                  </div>
                                </div>

                                <CountrySelect
                                  showCode={true}
                                  setSelectedCountryCode={
                                    setSelectedCountryCode
                                  }
                                />
                              </div>
                            </div>
                            <div className="image-content-wrapper">
                              <div className="lottie-animation-2">
                                <Lottie
                                  animationData={conversionMarketing}
                                  loop={true}
                                  // style={{ height: 300, width: 300 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {appSelected && <MHRScore mobile="mobile" />}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="tabs-content-2 align-top w-tab-content">
            {activeSol === "solution1" && (
              <div
                data-w-tab="Tab 2"
                className={`tab-pane w-tab-pane ${
                  activeSol === "solution1" ? "w--tab-active" : ""
                }`}
              >
                <div className="instruction-heading-wrapper">
                  <h3 className="heading-search hidden">
                    Search Your App to improve installs{" "}
                  </h3>
                </div>
                <div
                  // ref={appSuggestionRef}
                  className="app-search-box-holder margin-top new-height"
                >
                  {!appSelected && (
                    <div className="search-box_holder flex-custom width">
                      <div className="code-left">
                        <div className="html-embed-14 w-embed">
                          <div
                            id="search-box2"
                            className="main-box-holder mini-main-container"
                          >
                            <div className="search-box-suggestion">
                              <div className="main-search-bar">
                                <input
                                  type="text"
                                  autoComplete="off"
                                  id="search-bar-input2"
                                  className="search-input"
                                  placeholder="Search your iOS or android app"
                                  value={searchAppKeyword}
                                  onFocus={() => {
                                    setRecentAppsVisible(prev => {
                                      return {
                                        ...prev,
                                        ["suggestions-box2"]: true,
                                      }
                                    })
                                    setInputFocused(prev => {
                                      return {
                                        ...prev,
                                        ["suggestions-box2"]: true,
                                      }
                                    })
                                  }}
                                  onChange={e => {
                                    if (e.target.value.trim().length === 0) {
                                      setRecentAppsVisible({})
                                      setSearchAppVisible({})
                                    }
                                    setRecentAppsVisible({})
                                    setSearchAppKeyword(e.target.value)
                                    setSearchAppVisible(prev => {
                                      return {
                                        ...prev,
                                        ["search-box2"]: true,
                                      }
                                    })
                                  }}
                                />
                                {inputFocused["suggestions-box2"] && (
                                  <button
                                    id="close-search-form2"
                                    className="close-search-form"
                                    onClick={() => {
                                      setRecentAppsVisible({})
                                      setSearchAppVisible({})
                                      setInputFocused({})
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
                                      <g id="surface2">
                                        <path
                                          style={{
                                            stroke: "none",
                                            fillRule: "nonzero",
                                            fill: "#5a5a5c",
                                            fillOpacity: 1,
                                          }}
                                          d="M 0.332031 0.332031 C 0.546875 0.121094 0.839844 -0.00390625 1.144531 -0.00390625 C 1.445312 -0.00390625 1.738281 0.121094 1.953125 0.332031 L 8 6.382812 L 14.046875 0.332031 C 14.496094 -0.113281 15.21875 -0.113281 15.667969 0.332031 C 16.113281 0.78125 16.113281 1.503906 15.667969 1.953125 L 9.617188 8 L 15.667969 14.046875 C 16.113281 14.496094 16.113281 15.21875 15.667969 15.667969 C 15.21875 16.113281 14.496094 16.113281 14.046875 15.667969 L 8 9.617188 L 1.953125 15.667969 C 1.503906 16.113281 0.78125 16.113281 0.332031 15.667969 C -0.113281 15.21875 -0.113281 14.496094 0.332031 14.046875 L 6.382812 8 L 0.332031 1.953125 C 0.121094 1.738281 -0.00390625 1.445312 -0.00390625 1.144531 C -0.00390625 0.839844 0.121094 0.546875 0.332031 0.332031 Z M 0.332031 0.332031 "
                                        ></path>
                                      </g>
                                    </svg>
                                  </button>
                                )}
                              </div>
                              <div className="app-output-box">
                                {recentAppsVisible["suggestions-box2"] && (
                                  <RecentApps />
                                )}
                                {searchAppVisible["search-box2"] && (
                                  <SearchResults />
                                )}
                              </div>
                            </div>

                            <CountrySelect
                              showCode={true}
                              setSelectedCountryCode={setSelectedCountryCode}
                            />
                          </div>
                        </div>
                        <div className="image-content-wrapper">
                          <div className="lottie-animation-2">
                            <Lottie
                              animationData={asoGreen}
                              loop={true}
                              // style={{ height: 300, width: 300 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {appSelected && <AppInstalls />}
                </div>
              </div>
            )}
            {activeSol === "solution2" && (
              <div
                data-w-tab="Tab 3"
                className={`tab-pane w-tab-pane ${
                  activeSol === "solution2" ? "w--tab-active" : ""
                }`}
              >
                <div className="instruction-heading-wrapper">
                  <h3 className="heading-search hidden">
                    Search Your App to improve CTR
                  </h3>
                </div>
                <div
                  // ref={appSuggestionRef}
                  className="app-search-box-holder margin-top new-height"
                >
                  {!appSelected && (
                    <div className="search-box_holder flex-custom width">
                      <div className="code-left">
                        <div className="html-embed-14 w-embed">
                          <div
                            id="search-box3"
                            className="main-box-holder mini-main-container"
                          >
                            <div className="search-box-suggestion">
                              <div className="main-search-bar">
                                <input
                                  type="text"
                                  autoComplete="off"
                                  id="search-bar-input3"
                                  className="search-input"
                                  placeholder="Search your iOS or android app"
                                  value={searchAppKeyword}
                                  onFocus={() => {
                                    setRecentAppsVisible(prev => {
                                      return {
                                        ...prev,
                                        ["suggestions-box3"]: true,
                                      }
                                    })
                                    setInputFocused(prev => {
                                      return {
                                        ...prev,
                                        ["suggestions-box3"]: true,
                                      }
                                    })
                                  }}
                                  onChange={e => {
                                    if (e.target.value.trim().length === 0) {
                                      setRecentAppsVisible({})
                                      setSearchAppVisible({})
                                    }
                                    setRecentAppsVisible({})
                                    setSearchAppKeyword(e.target.value)
                                    setSearchAppVisible(prev => {
                                      return {
                                        ...prev,
                                        ["search-box3"]: true,
                                      }
                                    })
                                  }}
                                />
                                {inputFocused["suggestions-box3"] && (
                                  <button
                                    id="close-search-form3"
                                    className="close-search-form"
                                    onClick={() => {
                                      setRecentAppsVisible({})
                                      setSearchAppVisible({})
                                      setInputFocused({})
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
                                      <g id="surface3">
                                        <path
                                          style={{
                                            stroke: "none",
                                            fillRule: "nonzero",
                                            fill: "#5a5a5c",
                                            fillOpacity: 1,
                                          }}
                                          d="M 0.332031 0.332031 C 0.546875 0.121094 0.839844 -0.00390625 1.144531 -0.00390625 C 1.445312 -0.00390625 1.738281 0.121094 1.953125 0.332031 L 8 6.382812 L 14.046875 0.332031 C 14.496094 -0.113281 15.21875 -0.113281 15.667969 0.332031 C 16.113281 0.78125 16.113281 1.503906 15.667969 1.953125 L 9.617188 8 L 15.667969 14.046875 C 16.113281 14.496094 16.113281 15.21875 15.667969 15.667969 C 15.21875 16.113281 14.496094 16.113281 14.046875 15.667969 L 8 9.617188 L 1.953125 15.667969 C 1.503906 16.113281 0.78125 16.113281 0.332031 15.667969 C -0.113281 15.21875 -0.113281 14.496094 0.332031 14.046875 L 6.382812 8 L 0.332031 1.953125 C 0.121094 1.738281 -0.00390625 1.445312 -0.00390625 1.144531 C -0.00390625 0.839844 0.121094 0.546875 0.332031 0.332031 Z M 0.332031 0.332031 "
                                        ></path>
                                      </g>
                                    </svg>
                                  </button>
                                )}
                              </div>
                              <div className="app-output-box">
                                {recentAppsVisible["suggestions-box3"] && (
                                  <RecentApps />
                                )}{" "}
                                {searchAppVisible["search-box3"] && (
                                  <SearchResults />
                                )}
                              </div>
                            </div>
                            <CountrySelect
                              showCode={true}
                              setSelectedCountryCode={setSelectedCountryCode}
                            />
                          </div>
                        </div>
                        <div className="image-content-wrapper">
                          <div className="lottie-animation-2 height">
                            <Lottie
                              animationData={starRating}
                              loop={true}
                              // style={{ height: 300, width: 300 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {appSelected && <CTR />}
                </div>
              </div>
            )}
            {activeSol === "solution3" && (
              <div
                data-w-tab="Tab 4"
                className={`tab-pane w-tab-pane ${
                  activeSol === "solution3" ? "w--tab-active" : ""
                }`}
              >
                <div className="instruction-heading-wrapper">
                  <h3 className="heading-search hidden">
                    Search Your App to improve MHR
                  </h3>
                </div>
                <div className="app-search-box-holder margin-top new-height">
                  {!appSelected && (
                    <div className="search-box_holder flex-custom width">
                      <div className="code-left">
                        <div className="html-embed-14 w-embed">
                          <div
                            id="search-box4"
                            className="main-box-holder mini-main-container"
                          >
                            <div className="search-box-suggestion">
                              <div className="main-search-bar">
                                <input
                                  type="text"
                                  autoComplete="off"
                                  id="search-bar-input4"
                                  className="search-input"
                                  placeholder="Search your iOS or android app"
                                  value={searchAppKeyword}
                                  onFocus={() => {
                                    setRecentAppsVisible(prev => {
                                      return {
                                        ...prev,
                                        ["suggestions-box4"]: true,
                                      }
                                    })
                                    setInputFocused(prev => {
                                      return {
                                        ...prev,
                                        ["suggestions-box4"]: true,
                                      }
                                    })
                                  }}
                                  onChange={e => {
                                    if (e.target.value.trim().length === 0) {
                                      setRecentAppsVisible({})
                                      setSearchAppVisible({})
                                    }
                                    setRecentAppsVisible({})
                                    setSearchAppKeyword(e.target.value)
                                    setSearchAppVisible(prev => {
                                      return {
                                        ...prev,
                                        ["search-box4"]: true,
                                      }
                                    })
                                  }}
                                />
                                {inputFocused["suggestions-box4"] && (
                                  <button
                                    id="close-search-form4"
                                    className="close-search-form"
                                    onClick={() => {
                                      setRecentAppsVisible({})
                                      setSearchAppVisible({})
                                      setInputFocused({})
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
                                      <g id="surface4">
                                        <path
                                          style={{
                                            stroke: "none",
                                            fillRule: "nonzero",
                                            fill: "#5a5a5c",
                                            fillOpacity: 1,
                                          }}
                                          d="M 0.332031 0.332031 C 0.546875 0.121094 0.839844 -0.00390625 1.144531 -0.00390625 C 1.445312 -0.00390625 1.738281 0.121094 1.953125 0.332031 L 8 6.382812 L 14.046875 0.332031 C 14.496094 -0.113281 15.21875 -0.113281 15.667969 0.332031 C 16.113281 0.78125 16.113281 1.503906 15.667969 1.953125 L 9.617188 8 L 15.667969 14.046875 C 16.113281 14.496094 16.113281 15.21875 15.667969 15.667969 C 15.21875 16.113281 14.496094 16.113281 14.046875 15.667969 L 8 9.617188 L 1.953125 15.667969 C 1.503906 16.113281 0.78125 16.113281 0.332031 15.667969 C -0.113281 15.21875 -0.113281 14.496094 0.332031 14.046875 L 6.382812 8 L 0.332031 1.953125 C 0.121094 1.738281 -0.00390625 1.445312 -0.00390625 1.144531 C -0.00390625 0.839844 0.121094 0.546875 0.332031 0.332031 Z M 0.332031 0.332031 "
                                        ></path>
                                      </g>
                                    </svg>
                                  </button>
                                )}
                              </div>
                              <div className="app-output-box">
                                {recentAppsVisible["suggestions-box4"] && (
                                  <RecentApps />
                                )}
                                {searchAppVisible["search-box4"] && (
                                  <SearchResults />
                                )}
                              </div>
                            </div>
                            <CountrySelect
                              showCode={true}
                              setSelectedCountryCode={setSelectedCountryCode}
                            />
                          </div>
                        </div>
                        <div className="image-content-wrapper">
                          <div className="lottie-animation-2 height">
                            <Lottie
                              animationData={conversionMarketing}
                              loop={true}
                              // style={{ height: 300, width: 300 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {appSelected && <MHRScore />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
