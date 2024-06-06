import Image from "next/image"
import Link from "next/link"
import CountrySelect from "./elements/CountrySelect"
import { useState } from "react"
import { useAtom } from "jotai"
import {
  focusAtom,
  searchKeyword,
  showAppSelected,
  showRecentApps,
  showSearchApps,
  pricingWrapper,
  pricingTabs,
} from "../context/store"
import RecentApps from "./elements/RecentApps"
import SearchResults from "./elements/SearchResults"
import SelectedAppPricing from "./elements/SelectedAppPricing"

const OurPricing = () => {
  const [recentAppsVisible, setRecentAppsVisible] = useAtom(showRecentApps)
  const [searchAppVisible, setSearchAppVisible] = useAtom(showSearchApps)
  const [activeTab, setActiveTab] = useAtom(pricingTabs)
  const [appSelected] = useAtom(showAppSelected)
  const [searchAppKeyword, setSearchAppKeyword] = useAtom(searchKeyword)
  const [selectedCountryCode, setSelectedCountryCode] = useState("in")
  const [inputFocused, setInputFocused] = useAtom(focusAtom)
  const [isHidden, setIsHidden] = useAtom(pricingWrapper)

  const toggleHidden = () => {
    setIsHidden(!isHidden)
  }

  return (
    <>
      <div
        id="our-pricing"
        className="form-capture-section"
      >
        <div className="form-tab-wrapper">
          <div className="tab-wrapper vertical-centre-aligned">
            <div className="max-width-large align-center">
              <h2 className="heading tabsectiontitle">Our Pricing </h2>
            </div>
            <div className="max-width-xlarge align-center">
              <div
                data-duration-in="300"
                data-duration-out="100"
                data-current="Tab 2 Form"
                data-easing="ease"
                className="tabs_component--service w-tabs"
              >
                <div className="tabs_menu-service w-tab-menu">
                  <button
                    onClick={() => setActiveTab("offeringsTab")}
                    data-w-tab="Tab 1 form"
                    className={`tabs1_link-service first w-inline-block w-tab-link ${
                      activeTab === "offeringsTab" ? "w--current" : ""
                    }`}
                  >
                    <div>
                      Offerings Guide
                      <br />
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("pricingTab")}
                    data-w-tab="Tab 2 Form"
                    className={`tabs1_link-service _3rd w-inline-block w-tab-link ${
                      activeTab === "pricingTab" ? "w--current" : ""
                    }`}
                  >
                    <div>
                      Show Pricing by App
                      <br />
                    </div>
                  </button>
                </div>
                <div className="tabs_content w-tab-content">
                  <div
                    data-w-tab="Tab 1 form"
                    className={`tabs_tab-pane w-tab-pane ${
                      activeTab === "offeringsTab" ? "w--tab-active" : ""
                    }`}
                  >
                    <div className="tabs_content-wrapper-service">
                      <div className="max-width-full">
                        <div className="w-layout-grid tabs-layout_component">
                          <div className="list-wrapper margin">
                            <div className="pricing-package-grid">
                              <div
                                id="w-node-_5232b42b-7451-0536-8c39-cebc65da806c-f93c043d"
                                className="package-card"
                              >
                                <div className="top-part padding">
                                  <div className="image-content-wrapper">
                                    <div className="image-wrapper-2">
                                      <Image
                                        width={60}
                                        height={60}
                                        loading="lazy"
                                        alt=""
                                        src="/assets/imgs/keywordbased.svg"
                                        className="card-main-image"
                                      />
                                    </div>
                                    <div className="name-content-wrapper">
                                      <h2 className="titile-heading">
                                        Keyword based
                                      </h2>
                                      <div className="text-block-25">
                                        Achieve desired ranking for your
                                        specified keywords
                                      </div>
                                    </div>
                                  </div>
                                  <p className="card-paragraph margin">
                                    Pay only when your target keywords rank for
                                    the desired position
                                  </p>
                                </div>
                                <div className="card-package-content">
                                  <div className="heading card-package-features-new left-align">
                                    Offerings:
                                  </div>

                                  <div className="w-layout-grid grid-8">
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da807c-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* Pay based on the keywords that you’d
                                        like to target. */}
                                        Pay for targeted keywords.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da8080-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* Payout based on the achievements - top
                                        1, top 3, top 5 and top 8. */}
                                        Payout for top 1, 3, 5, and 8
                                        achievements.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da8084-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* We can also rank your app in similar app
                                        section of your competitors. */}
                                        Rank your app in competitors' similar
                                        app sections.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da8088-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* Minimum plan of 6 months. */}
                                        Minimum 6-month plan.
                                      </div>
                                    </div>
                                  </div>

                                  <div className="button-wrapper">
                                    <Link
                                      href="#request-a-quote"
                                      className="button-primary-4 width-max w-button"
                                    >
                                      Contact Us
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="w-node-_5232b42b-7451-0536-8c39-cebc65da808f-f93c043d"
                                className="package-card"
                              >
                                <div className="top-part padding">
                                  <div className="image-content-wrapper">
                                    <div className="image-wrapper-2">
                                      <Image
                                        width={60}
                                        height={60}
                                        loading="lazy"
                                        alt=""
                                        src="/assets/imgs/installbased.svg"
                                        className="card-main-image"
                                      />
                                    </div>
                                    <div className="name-content-wrapper">
                                      <h2 className="titile-heading">
                                        Install based
                                      </h2>
                                      <div className="text-block-25">
                                        Pay for the expansion of non-branded
                                        organic downloads by x%
                                      </div>
                                    </div>
                                  </div>
                                  <p className="card-paragraph margin">
                                    ASO on autopilot. Get blueprint based on
                                    your download goals.
                                  </p>
                                </div>
                                <div className="card-package-content">
                                  <div className="heading card-package-features-new left-align">
                                    Offerings:
                                  </div>
                                  <div className="w-layout-grid grid-8">
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da809f-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* Pay for x% growth in your non-brand
                                        organic downloads. */}
                                        Pay for x% growth in non-brand organic
                                        downloads.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80a3-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* Most of our ASO campaigns break even in
                                        12 months. */}
                                        ASO campaigns typically break even in 12
                                        months.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80a7-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* Only available for apps where an
                                        available market share is present. */}
                                        Available for apps with market share.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80ab-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* Minimum plan of 6 months. */}
                                        Minimum 6-month plan.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="button-wrapper">
                                    <Link
                                      href="#request-a-quote"
                                      className="button-primary-4 width-max w-button"
                                    >
                                      Contact Us
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="w-node-_5232b42b-7451-0536-8c39-cebc65da80b2-f93c043d"
                                className="package-card"
                              >
                                <div className="top-part padding">
                                  <div className="image-content-wrapper">
                                    <div className="image-wrapper-2">
                                      <Image
                                        width={60}
                                        height={60}
                                        loading="lazy"
                                        alt=""
                                        src="/assets/imgs/revenuesharing.svg"
                                        className="card-main-image"
                                      />
                                    </div>
                                    <div className="name-content-wrapper">
                                      <h2 className="titile-heading">
                                        Revenue sharing
                                      </h2>
                                      <div className="text-block-25">
                                        We drive revenue growth, and take a
                                        share of the increased revenue
                                      </div>
                                    </div>
                                  </div>
                                  <p className="card-paragraph margin">
                                    We help your revenue grow and share revenue
                                    on the incremental revenue.
                                  </p>
                                </div>
                                <div className="card-package-content">
                                  <div className="heading card-package-features-new left-align">
                                    Offerings:
                                  </div>
                                  <div className="w-layout-grid grid-8">
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80c2-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* We help your revenue grow and share
                                        revenue on the incremental revenue. */}
                                        We grow your revenue and share in the
                                        incremental gains.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80c6-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* Once you submit the app, we will have a
                                        call, regarding the baseline install and
                                        revenue numbers to see if you qualify. */}
                                        After app submission, we'll discuss
                                        baseline installs and revenue to check
                                        qualification.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80ca-f93c043d"
                                      className="packahe-feature-wrapper"
                                    >
                                      <Image
                                        width={23}
                                        height={23}
                                        loading="lazy"
                                        src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        className="ckeck-icon"
                                      />
                                      <div className="feature-pointer">
                                        {/* We take app quality and current
                                        revenue/user in consideration while
                                        deciding the revenue share. */}
                                        Revenue share depends on app quality and
                                        current revenue per user.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="button-wrapper aligned-3">
                                    <Link
                                      href="#request-a-quote"
                                      className="button-primary-4 width-max w-button"
                                    >
                                      Contact Us
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-tab="Tab 2 Form"
                    className={`tabs_tab-pane w-tab-pane ${
                      activeTab === "pricingTab" ? "w--tab-active" : ""
                    }`}
                  >
                    <div className="tabs_content-wrapper-service">
                      <div className="max-width-full">
                        <div
                          id="pricingBoxPr"
                          className="w-layout-grid tabs-layout_component"
                        >
                          <div className="search-box-wrapper">
                            <div className="app-search-box-holder">
                              {!appSelected && (
                                <div className="search-box_holder flex-custom width">
                                  <div className="code-left">
                                    <div className="html-embed-14 w-embed">
                                      <div
                                        id="search-box5"
                                        className="main-box-holder"
                                      >
                                        <div className="search-box-suggestion">
                                          <div className="main-search-bar">
                                            <input
                                              type="text"
                                              autoComplete="off"
                                              id="search-bar-input5"
                                              className="search-input"
                                              placeholder="Search your iOS or android app"
                                              value={searchAppKeyword}
                                              onFocus={() => {
                                                setRecentAppsVisible(prev => {
                                                  return {
                                                    ...prev,
                                                    ["suggestions-box5"]: true,
                                                  }
                                                })
                                                setInputFocused(prev => {
                                                  return {
                                                    ...prev,
                                                    ["suggestions-box5"]: true,
                                                  }
                                                })
                                                toggleHidden()
                                              }}
                                              onChange={e => {
                                                if (
                                                  e.target.value.trim()
                                                    .length === 0
                                                ) {
                                                  setRecentAppsVisible({})
                                                  setSearchAppVisible({})
                                                }
                                                setRecentAppsVisible({})
                                                setSearchAppKeyword(
                                                  e.target.value,
                                                )
                                                setSearchAppVisible(prev => {
                                                  return {
                                                    ...prev,
                                                    ["search-box5"]: true,
                                                  }
                                                })
                                              }}
                                              // remove this once we move to the app select functionality
                                            />
                                            {inputFocused[
                                              "suggestions-box5"
                                            ] && (
                                              <button
                                                id="close-search-form5"
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
                                                  <g id="surface5">
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
                                            {recentAppsVisible[
                                              "suggestions-box5"
                                            ] && <RecentApps />}
                                            {searchAppVisible[
                                              "search-box5"
                                            ] && <SearchResults />}
                                            {/* <ul
                                            id="suggestions-box5"
                                            className="suggestions"
                                            onClick={e => handleClickPrice(e)}
                                          ></ul> */}
                                          </div>
                                        </div>
                                        <CountrySelect
                                          setSelectedCountryCode={
                                            setSelectedCountryCode
                                          }
                                          // selectedApp={selectedApp}
                                          showCode={false}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {appSelected && (
                                <>
                                  <SelectedAppPricing />
                                  {/* <div
                                    id="instruction-Text-Wrapper-pr"
                                    className="instruction-text-wrapper hidden"
                                  ></div> */}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          id="instruction-Text-Wrapper-pr"
                          className={`instruction-text-wrapper ${
                            isHidden ? "" : "hidden"
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-w-id="2408ce64-3e73-6c5b-6f9c-1dd071cb463b"
        className="section bg-neutral-200"
      >
        <div className="container-default w-container">
          <div className="about-this-service-wrapper">
            <div className="split-content about-this-service-left">
              <div
                data-w-id="2408ce64-3e73-6c5b-6f9c-1dd071cb463f"
                style={{
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
                className="subtitle hidden"
              >
                about this service
              </div>
              <h2
                data-w-id="2408ce64-3e73-6c5b-6f9c-1dd071cb4641"
                style={{
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
              >
                Reduce Cost on UAC Campaigns
              </h2>
              <p
                data-w-id="a08ad5f5-0a38-fd3d-c3bc-bd33a525ad13"
                style={{
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
                className="paragraph about-this-service"
              >
                <Image
                  width={23}
                  height={23}
                  loading="lazy"
                  src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                  alt="Check Icon - NextLabs.io"
                  className="ckeck-icon"
                />
                UAC campaign costs are not fixed.
                <br />
                <Image
                  width={23}
                  height={23}
                  loading="lazy"
                  src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                  alt="Check Icon - NextLabs.io"
                  className="ckeck-icon"
                />
                Factors affecting cost:
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● App ratings
                (yours and competitors')
                <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● Most
                Helpful Review Section
                <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;● Number
                of bidding companies
                <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;●
                Engagement and retention rates
                <br />
                <Image
                  width={23}
                  height={23}
                  loading="lazy"
                  src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                  alt="Check Icon - NextLabs.io"
                  className="ckeck-icon"
                />
                You only pay if we reduce the cost.
                <br />
                <Image
                  width={10}
                  height={10}
                  loading="lazy"
                  src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                  alt="Check Icon - NextLabs.io"
                  className="ckeck-icon"
                />
                Fee is significantly lower than the cost reduction (x).
              </p>
              <div
                data-w-id="2408ce64-3e73-6c5b-6f9c-1dd071cb4645"
                style={{
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
                className="animation-div"
              >
                <Link
                  href="#request-a-quote"
                  className="button-primary w-button"
                >
                  {/* Find Out How */}
                  How? Let’s find out!
                </Link>
              </div>
            </div>
            <div className="images-wrapper about-this-service">
              <div className="image-wrapper about-this-service-1 new">
                <Image
                  width={415}
                  height={307}
                  src="/assets/imgs/Marketing-dashboard.svg"
                  alt=""
                  className="image about-this-service-1"
                />
              </div>
              <div className="image-wrapper about-this-service-2 new">
                <Image
                  width={415}
                  height={218}
                  src="/assets/imgs/Dashboard-float.svg"
                  alt=""
                  className="image about-this-service-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OurPricing
