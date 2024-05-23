import Image from "next/image";
import Link from "next/link";
import CountrySelect from "./elements/CountrySelect";
import { useEffect, useState } from "react";
const OurPricing = () => {
  const [activeTab, setActiveTab] = useState("tab2");
  const [appSelected, setAppSelected] = useState(false);
  // const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCountryCode, setSelectedCountryCode] = useState("us");

  return (
    <>
      <div id="our-pricing" className="form-capture-section">
        <div className="form-tab-wrapper">
          <div className="tab-wrapper vertical-centre-aligned">
            <div className="max-width-large align-center">
              <h2
                data-w-id="5232b42b-7451-0536-8c39-cebc65da8058"
                className="heading tabsectiontitle"
              >
                Our Pricing{" "}
              </h2>
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
                    onClick={() => setActiveTab("tab1")}
                    data-w-tab="Tab 1 form"
                    className={`tabs1_link-service first w-inline-block w-tab-link ${
                      activeTab === "tab1" ? "w--current" : ""
                    }`}
                  >
                    <div>
                      Pricing Guide
                      <br />
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("tab2")}
                    data-w-tab="Tab 2 Form"
                    className={`tabs1_link-service _3rd w-inline-block w-tab-link ${
                      activeTab === "tab2" ? "w--current" : ""
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
                      activeTab === "tab1" ? "w--tab-active" : ""
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
                                    Key Offerings:
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
                                        Pay based on the keywords that you’d
                                        like to target.
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
                                        Payout based on the achievements - top
                                        1, top 3, top 5 and top 8.
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
                                        We can also rank your app in similar app
                                        section of your competitors.
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
                                        Minimum plan of 6 months.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="button-wrapper">
                                    <Link
                                      href="#"
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
                                    Key Offerings:
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
                                        Pay for x% growth in your non-brand
                                        organic downloads.
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
                                        Most of our ASO campaigns break even in
                                        12 months.
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
                                        Only available for apps where an
                                        available market share is present.
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
                                        Minimum plan of 6 months.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="button-wrapper">
                                    <Link
                                      href="#"
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
                                    Key Offerings:
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
                                        We help your revenue grow and share
                                        revenue on the incremental revenue.
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
                                        Once you submit the app, we will have a
                                        call, regarding the baseline install and
                                        revenue numbers to see if you qualify.
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
                                        We take app quality and current
                                        revenue/user in consideration while
                                        deciding the revenue share.
                                      </div>
                                    </div>
                                  </div>
                                  <div className="button-wrapper aligned-3">
                                    <Link
                                      href="#"
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
                      activeTab === "tab2" ? "w--tab-active" : ""
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
                                            onFocus={() => setAppSelected(true)}
                                          />
                                          <button
                                            id="close-search-form5"
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
                                        </div>
                                        <div className="app-output-box">
                                          <div
                                            id="searching-shimmer5"
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
                                            </ul>
                                          </div>
                                          <ul
                                            id="suggestions-box5"
                                            className="suggestions"
                                          ></ul>
                                        </div>
                                      </div>
                                      <CountrySelect
                                        setSelectedCountryCode={setSelectedCountryCode}
                                        // selectedApp={selectedApp}
                                        showCode={false}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>


                              {appSelected && (
                                <>
                                  <div
                                    id="app-pricing-box_Pr"
                                    className="card-2 contact google_play-store new hidden"
                                  >
                                    <div className="package-card logic">
                                      <div className="top-part padding">
                                        <div className="image-content-wrapper centre-aligned centre-alignmed">
                                          <div className="app-logo-info_holder">
                                            <div className="app-logo_holder small-icon pricing">
                                              <Image
                                                width={140}
                                                height={140}
                                                id="App-Platform"
                                                loading="lazy"
                                                src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                                                alt=""
                                                className="logo-image-lead small-icon-platform"
                                              />
                                            </div>
                                            <div className="app-logo_holder bottom-spacing-margin pricing">
                                              <Image
                                                width={140}
                                                height={140}
                                                id="App-Icon"
                                                loading="lazy"
                                                alt="ios-app-logo"
                                                src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                                                className="logo-image-lead"
                                              />
                                            </div>
                                          </div>
                                          <div className="name-content-wrapper left-margin">
                                            <h2
                                              id="App-Name"
                                              className="titile-heading centre-alignmed"
                                            >
                                              App Name{" "}
                                            </h2>
                                            <div
                                              id="App-Info"
                                              className="text-block-25"
                                            >
                                              Social Rating on App Platform
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="card-package-content pricing">
                                        <div className="heading card-package-features-new">
                                          How we improve?
                                        </div>
                                        <div className="grid-wrapper-flex">
                                          <div className="w-layout-grid grid-8">
                                            <div
                                              id="w-node-_5232b42b-7451-0536-8c39-cebc65da80f2-f93c043d"
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
                                              <div
                                                id="Conditional-Android-iOS-1"
                                                className="feature-pointer"
                                              >
                                                Improve visitors - using keyword
                                                ranks and similar app section ML
                                                based rating improvement plan.{" "}
                                              </div>
                                            </div>
                                            <div
                                              id="w-node-_5232b42b-7451-0536-8c39-cebc65da80f6-f93c043d"
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
                                                Complimentary tools for tracking
                                                and establishing performance
                                                goals (KPIs)
                                              </div>
                                            </div>
                                            <div
                                              id="w-node-_5232b42b-7451-0536-8c39-cebc65da80fa-f93c043d"
                                              className="packahe-feature-wrapper hidden"
                                            >
                                              <Image
                                                width={23}
                                                height={23}
                                                loading="lazy"
                                                src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                                alt="Check Icon - NextLabs.io"
                                                className="ckeck-icon"
                                              />
                                              <div
                                                id="Conditional-Statement-1"
                                                className="feature-pointer"
                                              >
                                                Get into Similar App Section of
                                                competitors.
                                              </div>
                                            </div>
                                          </div>
                                          <div className="w-layout-grid grid-8">
                                            <div
                                              id="w-node-_5232b42b-7451-0536-8c39-cebc65da80ff-f93c043d"
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
                                              <div
                                                id="Conditional-Android-iOS-2"
                                                className="feature-pointer"
                                              >
                                                Conversion improvement - by
                                                focusing on MHR score, A/B
                                                testing.
                                              </div>
                                            </div>
                                            <div
                                              id="w-node-_5232b42b-7451-0536-8c39-cebc65da8103-f93c043d"
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
                                                Enhance engagement and retention
                                                by utilizing your analytics tool
                                                through the our BI pipeline.
                                              </div>
                                            </div>
                                            <div
                                              id="w-node-_5232b42b-7451-0536-8c39-cebc65da8107-f93c043d"
                                              className="packahe-feature-wrapper hidden"
                                            >
                                              <Image
                                                width={23}
                                                height={23}
                                                loading="lazy"
                                                src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                                alt="Check Icon - NextLabs.io"
                                                className="ckeck-icon"
                                              />
                                              <div
                                                id="Conditional-Statement-2"
                                                className="feature-pointer"
                                              >
                                                Get Ranked on App Packs
                                                 Section.
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="calculated-pricing-component_wrapper">
                                          <div className="pricing-info-text">
                                            Recommended Budget
                                          </div>
                                          <h4
                                            id="Pricing-Amount"
                                            className="calculated-pricing"
                                          >
                                            <span className="suffix">
                                              Please wait.. We are getting you
                                              best price
                                            </span>
                                          </h4>
                                        </div>
                                        <div>
                                          <div className="html-embed-35 w-embed">
                                            <input
                                              type="range"
                                              min="1000"
                                              max="30000"
                                              defaultValue="5000"
                                              className="slider"
                                              id="rangeSlider"
                                            />
                                          </div>
                                        </div>
                                        <div
                                          id="custom-contact-btn"
                                          className="button-wrapper"
                                        >
                                          <Link
                                            href="#"
                                            className="button-primary-4 width-max w-button"
                                          >
                                            Contact Us
                                          </Link>
                                        </div>
                                        <div className="personal-plan-offer">
                                          <h5 className="personal-plan-heading">
                                            Want a personal plan?
                                          </h5>
                                          <div className="custom-plan-paragraph">
                                            Want a full proposal or have a
                                            different budget in mind? We cater
                                            to budgets of all sizes.
                                          </div>
                                          <div className="button-wrapper bottom">
                                            <Link
                                              href="#"
                                              className="button-primary-4 width-max alternate w-button"
                                            >
                                              Let’s discuss
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    id="instruction-Text-Wrapper-pr"
                                    className="instruction-text-wrapper hidden"
                                  ></div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
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
                data-w-id="2408ce64-3e73-6c5b-6f9c-1dd071cb4643"
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
                It&#x27;s often assumed that UAC campaign cost is fixed.
                However, it&#x27;s not. Ratings of your app and that of your
                competitors, Most Helpful Review Section, number of companies
                that are bidding and engagement/retention influences the overall
                cost.{" "}
                <span className="text-bold">
                  You pay only if we reduce the cost.
                </span>{" "}
                So, if the cost reduction is{" "}
                <span className="text-bold">x</span>, then you pay a fee that is
                much lower than x.
                <br />
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
                  Find Out How
                </Link>
              </div>
            </div>
            <div className="images-wrapper about-this-service">
              <div className="image-wrapper about-this-service-1 new">
                <Image
                  width={415}
                  height={307}
                  // layout="responsive"
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
  );
};

export default OurPricing;
