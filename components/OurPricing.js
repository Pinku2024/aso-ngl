import Image from "next/image";
import Link from "next/link";
import CountrySelect from "./elements/CountrySelect";
import { useEffect, useState, useRef } from "react";
// import { useSelectedApp } from "../context/EventContext";
import { useAtom } from "jotai";
import {
  searchKeyword,
  showAppSelected,
  showCloseBtn,
  showRecentApps,
  showSearchApps,
} from "../context/store";
import RecentApps from "./elements/RecentApps";
import SearchResults from "./elements/SearchResults";
import SelectedAppPricing from "./elements/SelectedAppPricing";
  
const OurPricing = () => {
  const [recentAppsVisible, setRecentAppsVisible] = useAtom(showRecentApps);
  const [searchAppVisible, setSearchAppVisible] = useAtom(showSearchApps);
  const [activeTab, setActiveTab] = useState("tab2");
  const [appSelected, setAppSelected] = useAtom(showAppSelected);
  const [searchAppKeyword, setSearchAppKeyword] = useAtom(searchKeyword);
  const [selectedCountryCode, setSelectedCountryCode] = useState("in");
  // const { appSelect } = useSelectedApp();
  const [showInputCloseBtn, setShowInputCloseBtn] = useAtom(showCloseBtn);

  // useEffect(() => {
  //   if (appSelect !== null) {
  //     setTimeout(() => {
  //       handleClickPrice(appSelect);
  //     }, 500);
  //   }
  // }, [appSelect]);

  const handleClickPrice = (event) => {
    let { appPackageURL, applicationId, imageURL, device } =
      selectAppHandler(event);
    let mainBoxHolder = event.target.closest(".main-box-holder");
    calculatePriceForSelectedApp(
      appPackageURL,
      applicationId,
      imageURL,
      device,
      mainBoxHolder
    );
  };

  function selectAppHandler(event) {
    const selectedLi = event.target.closest("li.li-suggestion-item");
    const mainBoxHolder = selectedLi.closest(".main-box-holder");
    return getDetailsOfSelectedLi(selectedLi, mainBoxHolder);
  }

  function getDetailsOfSelectedLi(selectedItem, mainBoxHolder) {
    const inputBox = mainBoxHolder.querySelector(".search-input");
    const keyword = inputBox.value;
    // const country = mainBoxHolder.querySelector('.country-select-button').getAttribute('country-code');
    const country = selectedCountryCode;
    const applicationId = selectedItem.getAttribute("application-id");
    const imageURL = selectedItem.getAttribute("application-img-logo");
    let appPackageURL = selectedItem.getAttribute("application-url");
    const device = selectedItem.getAttribute("device");
    const appName = selectedItem.querySelector(
      ".li-suggestion-item-info"
    ).innerHTML;
    if (device !== "apple")
      appPackageURL = appPackageURL.split("&gl=")[0] + "&gl=" + country;
    inputBox.setAttribute("application-id", applicationId);
    inputBox.setAttribute("application-img-logo", imageURL);
    inputBox.setAttribute("application-url", appPackageURL);
    inputBox.setAttribute("device", device);
    const appData = {
      packageName: appName,
      icon_urls: imageURL,
      "app-package-id": applicationId,
      "data-package-url": appPackageURL,
      device: device,
    };
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

    // if (device == "apple") {
    //   dataLayer.push({ "event": "ios_app_select", "keyword": keyword, "gtm.elementId": applicationId, "gtm.elementUrl": appPackageURL, "gtm.uniqueAnalyticsReports": "AnalyticsLiveWeb_nl" });
    // } else {
    //   dataLayer.push({ "event": "play_app_select", "keyword": keyword, "gtm.elementId": applicationId, "gtm.elementUrl": appPackageURL, "gtm.uniqueAnalyticsReports": "AnalyticsLiveWeb_nl" });
    // }
    try {
      mainBoxHolder
        .querySelector(".suggestions")
        .classList.remove("format-suggestions");
    } catch {}
    try {
      mainBoxHolder
        .querySelector(".close-search-form")
        .classList.remove("hidden");
    } catch {}
    return { appPackageURL, applicationId, imageURL, device };
  }

  async function calculatePriceForSelectedApp(
    appPackageURL,
    applicationId,
    imageURL,
    device,
    mainBoxHolder
  ) {
    const search_keyword = mainBoxHolder.querySelector(".search-input").value;
    // const country = mainBoxHolder.querySelector('.country-select-button').getAttribute("country-code");
    const country = selectedCountryCode;
    let outerSection = document.querySelector("#app-pricing-box_Pr");
    let image = outerSection.querySelector("#App-Icon");
    console.log("Image", image);
    image.src = imageURL;
    image.setAttribute("image-data", appPackageURL);
    outerSection.classList.remove("hidden");
    let deviceIcon = outerSection.querySelector("#App-Platform");
    const appName = outerSection.querySelector("#App-Name");
    const appInfo = outerSection.querySelector("#App-Info");
    try {
      document.querySelector("#custom-contact-btn").classList.remove("hidden");
    } catch {}
    if (device.toLowerCase() == "apple") {
      const row_data = await fetchAppleAppData(appPackageURL, country);
      if (row_data) {
        appName.innerHTML = row_data.trackCensoredName;
        appInfo.innerHTML =
          "&#11088; " +
          row_data.averageUserRating.toFixed(2) +
          ", " +
          row_data.primaryGenreName;
        try {
          await handleAppleDeviceApp(
            deviceIcon,
            row_data,
            search_keyword,
            applicationId,
            appPackageURL
          );
        } catch (error) {
          window.alert("Error:", error);
        }
      } else {
        window.alert("Warning! Please select the app from the dropdown menu.");
      }
    } else {
      const responseData = await fetchPlayStoreAppData(applicationId, country);
      if (responseData.url) {
        appName.innerHTML = responseData.title;
        appInfo.innerHTML =
          "&#11088; " +
          parseFloat(responseData.score).toFixed(2) +
          ", " +
          responseData.genre;
        try {
          await handlePlayStoreDeviceApp(
            deviceIcon,
            responseData,
            search_keyword,
            applicationId,
            appPackageURL,
            country
          );
        } catch (error) {
          window.alert("Error:", error);
        }
      }
    }
  }

  // *********** --------------------------------------
  async function fetchAppleAppData(appPackageURL, t) {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const regex = /\/id(\d+)/;
    const id = appPackageURL.match(regex)[1];
    const requestURL = `https://itunes.apple.com/lookup?id=${id}&country=${t}`;
    try {
      const response = await fetch(requestURL, requestOptions);
      const data = await response.json();
      return data["results"][0];
    } catch (error) {
      throw new Error(`Error fetching Apple app data: ${error}`);
    }
  }

  // --------------------------------------------------
  async function handleAppleDeviceApp(
    deviceIcon,
    row_data,
    search_keyword,
    applicationId,
    appPackageURL
  ) {
    const allParagraph = document.querySelectorAll(".feature-pointer");
    try {
      allParagraph[2].parentNode.classList.add("hidden");
      allParagraph[5].parentNode.classList.add("hidden");
    } catch {}
    deviceIcon.src =
      "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f645042f50918e6e390f_app-store.svg";
    const dataObject = getDataObjectForApple(row_data);
    allParagraph[0].innerHTML =
      "Improve visitors - using keyword ranks and ML based keyword field recommendations.";
    allParagraph[3].innerHTML =
      "Conversion improvement - by focusing on A/B testing with app Metadata. i.e. Title, Description, etc.";
    const priceData = await fetchPriceData(
      "https://nextgrowthlabs.com/wp-json/my-api/v1/apple-price-request",
      dataObject
    );
    updatePriceToPage(priceData, search_keyword, applicationId, appPackageURL);
  }
  async function handlePlayStoreDeviceApp(
    deviceIcon,
    responseData,
    search_keyword,
    applicationId,
    appPackageURL,
    country
  ) {
    deviceIcon.src =
      "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f644817f822625b18bb6_google-play-store.svg";
    let dataObject = getDataObjectForPlay(responseData);
    const MHRScore = await fetchMHRScore(applicationId, country);
    dataObject.MHR = MHRScore;
    const allParagraph = document.querySelectorAll(".feature-pointer");
    allParagraph[0].innerHTML =
      "Improve visitors - using keyword ranks and similar app section ML based rating improvement plan.";
    allParagraph[3].innerHTML =
      "Conversion improvement - by focusing on MHR score, A/B testing.";
    const priceData = await fetchPriceData(
      "https://nextgrowthlabs.com/wp-json/my-api/v1/play-price-request",
      dataObject
    );
    updatePriceToPage(priceData, search_keyword, applicationId, appPackageURL);
  }
  // --------------------------------------------------
  async function fetchPlayStoreAppData(applicationId, t) {
    const url = `https://store.maakeetoo.com/apps/details/?id=${applicationId}&gl=${t}`;
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching Play Store app data: ${error}`);
    }
  }

  // --------------------------------------------------
  function getDataObjectForApple(row_data) {
    let userRating = row_data.averageUserRating.toFixed(2);
    let dataObject = {
      TitleLength: row_data.trackCensoredName.length,
      Size: row_data.fileSizeBytes,
      ImageCount: row_data.screenshotUrls.length,
      DescriptionLength: row_data.description.length,
      Rating: userRating < 1.0 ? 1.2 : userRating,
      RatingCount: row_data.userRatingCount,
    };
    return dataObject;
  }
  function getDataObjectForPlay(responseData) {
    let dataObject = {
      Score:
        parseFloat(responseData.score).toFixed(1) < 1.0
          ? 1.2
          : responseData.score,
      DownloadEstimate: responseData.maxInstalls,
      ImageCount: responseData.screenshots.length,
      VideoPresent: responseData.video ? true : false,
      Size: responseData.size || 123456,
      MHR: 20,
    };
    return dataObject;
  }

  // MHR request
  async function fetchMHRScore(applicationId, country) {
    const url = `https://store.maakeetoo.com/apps/mhr-score/?id=${applicationId}&gl=${country}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const todayDate = new Date();
      todayDate.setDate(todayDate.getDate() - 1);
      const yesterdayDate = todayDate.toISOString().substr(0, 10);
      const entry = data.find((entry) => entry.date === yesterdayDate);
      return entry ? entry.score : 30;
    } catch (error) {
      throw new Error(`Error fetching MHR score: ${error}`);
    }
  }
  // -------------- Price Data -----------------------------
  async function fetchPriceData(url, dataObject) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      });
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching price data: ${error}`);
    }
  }

  // Updating Price and Slider
  const [priceData, setPriceData] = useState();
  const [sliderValue, setSliderValue] = useState(5000);
  const [minValue, setMinValue] = useState(1000);
  const [maxValue, setMaxValue] = useState(30000);
  const [loading, setLoading] = useState(true);

  // Function to update the price and slider values
  const updatePriceToPage = (newPriceData) => {
    setLoading(true);
    const max = parseInt((parseInt(newPriceData) * 7) / 1000) * 1000;
    const min = parseInt(parseInt(newPriceData) / 2 / 500) * 500;
    setPriceData(newPriceData);
    setSliderValue(newPriceData);
    setMinValue(min);
    setMaxValue(max);
    setLoading(false);
  };

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
  };

  // Handle click outside of the suggestions
  const appSuggestionRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        appSuggestionRef.current &&
        !appSuggestionRef.current.contains(event.target)
      ) {
        const suggestion =
          appSuggestionRef.current.querySelector(".suggestions");
        if (suggestion) {
          suggestion.classList.remove("format-suggestions");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                      Offerings Guide
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
                              {!appSelected && (
                                <div className="search-box_holder flex-custom width">
                                  <div className="code-left">
                                    <div className="html-embed-14 w-embed">
                                      <div
                                        id="search-box5"
                                        className="main-box-holder"
                                      >
                                        <div
                                          ref={appSuggestionRef}
                                          className="search-box-suggestion"
                                        >
                                          <div className="main-search-bar">
                                            <input
                                              type="text"
                                              autoComplete="off"
                                              id="search-bar-input5"
                                              className="search-input"
                                              placeholder="Search your iOS or android app"
                                              value={searchAppKeyword}
                                              onFocus={() => {
                                                setShowInputCloseBtn(true);
                                                setRecentAppsVisible((prev) => {
                                                  return {
                                                    ...prev,
                                                    ["suggestions-box5"]: true,
                                                  };
                                                });
                                              }}
                                              onChange={(e) => {
                                                if (
                                                  e.target.value.trim()
                                                    .length === 0
                                                ) {
                                                  setRecentAppsVisible({});
                                                  setSearchAppVisible({});
                                                }
                                                setRecentAppsVisible({});
                                                setSearchAppKeyword(
                                                  e.target.value
                                                );
                                                setSearchAppVisible((prev) => {
                                                  return {
                                                    ...prev,
                                                    ["search-box5"]: true,
                                                  };
                                                });
                                              }}
                                              // remove this once we move to the app select functionality
                                            />
                                            {showInputCloseBtn && (
                                              <button
                                                id="close-search-form5"
                                                className="close-search-form"
                                                onClick={() => {
                                                  setRecentAppsVisible({});
                                                  setSearchAppVisible({});
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
                                  {/* <div
                                    id="app-pricing-box_Pr"
                                    className="card-2 contact google_play-store new"
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
                                          {loading ? (
                                            <h4
                                              id="Pricing-Amount"
                                              className="calculated-pricing"
                                            >
                                              <span className="suffix">
                                                Please wait.. We are getting you
                                                best price
                                              </span>
                                            </h4>
                                          ) : (
                                            <h4
                                              id="Pricing-Amount"
                                              className="calculated-pricing"
                                            >
                                              ${sliderValue}
                                              <span className="suffix">
                                                /month onwards
                                              </span>
                                            </h4>
                                          )}
                                        </div>
                                        <div>
                                          <div className="html-embed-35 w-embed">
                                            <input
                                              type="range"
                                              min={minValue}
                                              max={maxValue}
                                              value={sliderValue}
                                              onChange={handleSliderChange}
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
                                            href="#request-a-quote"
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
                                              href="#request-a-quote"
                                              className="button-primary-4 width-max alternate w-button"
                                            >
                                              Let’s discuss
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div> */}
                                  <SelectedAppPricing />
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

              {/* <p
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
              </p> */}
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
