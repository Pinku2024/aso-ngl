import { useEffect, useState } from "react";
import CountrySelect from "./elements/CountrySelect";
import Lottie from "lottie-react";
import asoGreen from "../public/assets/documents/aso-green.json";
import conversionMarketing from "../public/assets/documents/conversion-marketing.json";
import starRating from "../public/assets/documents/Five-Star-Rating.json";
const Services = () => {
  const [activeSol, setActiveSol] = useState("solution1");
  const [selectedCountryCode, setSelectedCountryCode] = useState("us");
  function appSearch(event) {
    async function prepareDataForRequests(mainWorkingBox) {
      const inputElement = event;
      // const inputElement = mainWorkingBox.querySelector(".search-input");
      const appSearchCloseBtn =
        mainWorkingBox.querySelector(".close-search-form");
      try {
        appSearchCloseBtn.classList.remove("hidden");
      } catch {}
      let currentNameIOS = inputElement.value;
      let currentNamePlay = encodingName(inputElement.value);
      let country = selectedCountryCode;
      // let country = mainWorkingBox
      //   .querySelector(".country-select-button")
      //   .getAttribute("country-code");
      if (currentNameIOS.trim().length < 2 && currentNameIOS.trim() === "") {
        mainWorkingBox.querySelector(".suggestions").innerHTML = "";
        return false;
      }
      const newKeyword = currentNameIOS.split(" ").join("+");
      const requestIOS = `https://itunes.apple.com/search?media=software&entity=software%2CiPadSoftware%2CsoftwareDeveloper&term=${newKeyword}&country=${country}&limit=30`;
      if (
        requestIOS.trim() ===
        `https://itunes.apple.com/search?media=software&entity=software%2CiPadSoftware%2CsoftwareDeveloper&term=&country=&limit=30`
      ) {
        mainWorkingBox.querySelector(".suggestions").innerHTML = "";
        return false;
      }
      let requestPlay = `https://store.maakeetoo.com/apps/search/?q=${currentNamePlay}&gl=${country}`;
      if (
        requestPlay.trim() ===
        `https://store.maakeetoo.com/apps/search/?q=&gl=${country}`
      ) {
        mainWorkingBox.querySelector(".suggestions").innerHTML = "";
        return false;
      }
      let listData = await handleRequestsAndProcessData(
        requestPlay,
        requestIOS
      );
      if (listData.length > 0) {
        mainWorkingBox.querySelector(".suggestions").innerHTML = "";
        mainWorkingBox
          .querySelector(".suggestions")
          .classList.add("format-suggestions");
      }
      mainWorkingBox
        .querySelector(".searching-shimmer")
        .classList.add("hidden");
      mainWorkingBox
        .querySelector(".suggestions")
        .insertAdjacentHTML("beforeend", listData.join(""));
    }
  }

  useEffect(() => {
    if (activeSol === "solution1") {
      const installRangeSliderMb = document.querySelector("#install-slider2");
      installRangeSliderMb.addEventListener("input", (event) => {
        handleInstallRangeSliderFn(event);
      });
    }
    if (activeSol === "solution2") {
      const ratingRangeSliderMb = document.querySelector("#rating-slider2");
      ratingRangeSliderMb.addEventListener("input", (event) => {
        handleRatingSliderFn(event);
      });
    }
    if (activeSol === "solution1") {
      const installRangeSlider = document.querySelector("#install-slider");
      installRangeSlider.addEventListener("input", (event) => {
        handleInstallRangeSliderFn(event);
      });
    }
    function handleInstallRangeSliderFn(event) {
      const sliderValue = parseInt(event.target.value);
      event.target.nextSibling.innerHTML = sliderValue + " Days";
      const contentBox = event.target.closest(".app-info-display");
      const resultTextBox = contentBox.querySelector(".result-text-box");
      const ourSuggestionList = contentBox.querySelectorAll(
        ".review-suggestion-list li"
      );
      if (sliderValue <= 90) {
        ourSuggestionList[0].classList.remove("hidden");
        ourSuggestionList[1].classList.add("hidden");
        ourSuggestionList[2].classList.add("hidden");
      } else if (sliderValue <= 180) {
        ourSuggestionList[0].classList.remove("hidden");
        ourSuggestionList[1].classList.remove("hidden");
        ourSuggestionList[2].classList.add("hidden");
      } else {
        for (let li of ourSuggestionList) {
          li.classList.remove("hidden");
        }
      }
      const fullAppData = JSON.parse(localStorage.getItem("selectedAppData"));
      if (fullAppData.apple !== undefined) {
      } else {
        displayCalculatedInstallsToUser(
          resultTextBox,
          fullAppData.android,
          sliderValue
        );
      }
    }
    function displayCalculatedInstallsToUser(box, appData, sliderValue) {
      const maxInstalls = calculateNextMilestone(appData.minInstalls);
      const exactInstalls = appData.maxInstalls;
      const result = (maxInstalls - exactInstalls) / sliderValue;
      const formattedResult = result.toFixed(0);
      box.querySelector("h5").innerHTML =
        "To achieve the target, you need to attain " +
        Number(formattedResult).toLocaleString() +
        " installs daily for the next " +
        sliderValue +
        " days.";
      box.classList.remove("hidden");
    }
    if (activeSol === "solution2") {
      const ratingRangeSlider = document.querySelector("#rating-slider");
      ratingRangeSlider.addEventListener("input", (event) => {
        handleRatingSliderFn(event);
      });
    }
    function handleRatingSliderFn(event) {
      const sliderValue = parseFloat(event.target.value);
      const contentBox = event.target.closest(".app-info-display");
      const nextTarget = contentBox.querySelector(".next-milestone span");
      nextTarget.innerHTML = sliderValue;
      let minValue = event.target.getAttribute("min-value");
      minValue = parseFloat(minValue);
      event.target.nextSibling.innerHTML = sliderValue;
      if (sliderValue < minValue) {
        event.target.value = minValue;
        event.target.nextSibling.innerHTML = minValue;
        nextTarget.innerHTML = minValue;
      }
      const resultTextBox = contentBox.querySelector(".result-text-box");
      const currentRank = contentBox.querySelector(".current-milestone span");
      const ourSuggestionList = contentBox.querySelectorAll(
        ".review-suggestion-list li"
      );
      const currentValue = parseFloat(currentRank.innerText);
      const difference = sliderValue - currentValue;
      if (difference <= 0.01) {
        for (let li of ourSuggestionList) {
          li.classList.add("hidden");
        }
        resultTextBox.classList.add("hidden");
        return false;
      } else if (difference <= 0.2) {
        ourSuggestionList[0].classList.remove("hidden");
        ourSuggestionList[1].classList.add("hidden");
        ourSuggestionList[2].classList.add("hidden");
      } else {
        for (let li of ourSuggestionList) {
          li.classList.remove("hidden");
        }
      }
      const fullAppData = JSON.parse(localStorage.getItem("selectedAppData"));
      if (fullAppData.apple !== undefined) {
        displayCalculatedRankToUserApple(
          resultTextBox,
          fullAppData.apple,
          sliderValue
        );
      } else {
        displayCalculatedRankToUser(
          resultTextBox,
          fullAppData.android.histogram,
          sliderValue
        );
      }
    }
    function displayCalculatedRankToUserApple(box, appData, targetRating) {
      const totalStar = (
        appData.userRatingCount * appData.averageUserRating
      ).toFixed(0);
      const totalRating = appData.userRatingCount;
      const day = 60;
      const star = 5;
      const retention = 50;
      const averageRating = totalStar / totalRating;
      const result =
        ((targetRating * totalRating - totalStar) /
          (day * (star - targetRating)) /
          retention) *
        100;
      const formattedResult = result.toFixed(0);
      box.querySelector("h5").innerHTML =
        "To achieve the target, you need to attain " +
        Number(formattedResult).toLocaleString() +
        " ratings daily for the next 60 days.";
      box.classList.remove("hidden");
    }
    function displayCalculatedRankToUser(box, reviewData, targetRating) {
      let totalStar = 0;
      let totalRating = 0;
      for (let p in reviewData) {
        let rat = parseInt(reviewData[p]);
        totalStar += rat * parseInt(p);
        totalRating += rat;
      }
      const day = 60;
      const star = 5;
      const retention = 50;
      const averageRating = totalStar / totalRating;
      const result =
        ((targetRating * totalRating - totalStar) /
          (day * (star - targetRating)) /
          retention) *
        100;
      const formattedResult = result.toFixed(0);
      box.querySelector("h5").innerHTML =
        "To achieve the target, you need to attain " +
        Number(formattedResult).toLocaleString() +
        " ratings daily for the next 60 days.";
      box.classList.remove("hidden");
    }
  });

  useEffect(() => {
    function setupautoComplete(iOSOuterBox) {
      let iOSautoCompleteTimer;
      const inputElement = iOSOuterBox.querySelector(".search-input");
      const appSearchCloseBtn = iOSOuterBox.querySelector(".close-search-form");
      inputElement.addEventListener("input", (event) => {
        if (event.target.value.trim() === "" && event.target.value.length < 1) {
          console.log("Keyword Not Found!");
          return false;
        }
        iOSOuterBox
          .querySelector(".searching-shimmer")
          .classList.remove("hidden");
        try {
          iOSOuterBox
            .querySelector(".suggestions")
            .classList.remove("format-suggestions");
        } catch {}
        try {
          //Hiding Contact form
          document
            .querySelector(".apple-ios-app_store")
            .classList.add("hidden");
        } catch {}
        try {
          appSearchCloseBtn.classList.add("hidden");
        } catch {}
        clearTimeout(iOSautoCompleteTimer);
        iOSautoCompleteTimer = setTimeout(function () {
          prepareDataForRequests(iOSOuterBox);
        }, 500);
      });
    }
    function encodingName(e) {
      return encodeURIComponent(e);
    }
    async function prepareDataForRequests(mainWorkingBox) {
      const inputElement = mainWorkingBox.querySelector(".search-input");
      const appSearchCloseBtn =
        mainWorkingBox.querySelector(".close-search-form");
      try {
        appSearchCloseBtn.classList.remove("hidden");
      } catch {}
      let currentNameIOS = inputElement.value;
      let currentNamePlay = encodingName(inputElement.value);
      let country = selectedCountryCode;
      // let country = mainWorkingBox
      //   .querySelector(".country-select-button")
      //   .getAttribute("country-code");
      if (currentNameIOS.trim().length < 2 && currentNameIOS.trim() === "") {
        mainWorkingBox.querySelector(".suggestions").innerHTML = "";
        return false;
      }
      const newKeyword = currentNameIOS.split(" ").join("+");
      const requestIOS = `https://itunes.apple.com/search?media=software&entity=software%2CiPadSoftware%2CsoftwareDeveloper&term=${newKeyword}&country=${country}&limit=30`;
      if (
        requestIOS.trim() ===
        `https://itunes.apple.com/search?media=software&entity=software%2CiPadSoftware%2CsoftwareDeveloper&term=&country=&limit=30`
      ) {
        mainWorkingBox.querySelector(".suggestions").innerHTML = "";
        return false;
      }
      let requestPlay = `https://store.maakeetoo.com/apps/search/?q=${currentNamePlay}&gl=${country}`;
      if (
        requestPlay.trim() ===
        `https://store.maakeetoo.com/apps/search/?q=&gl=${country}`
      ) {
        mainWorkingBox.querySelector(".suggestions").innerHTML = "";
        return false;
      }
      let listData = await handleRequestsAndProcessData(
        requestPlay,
        requestIOS
      );
      if (listData.length > 0) {
        mainWorkingBox.querySelector(".suggestions").innerHTML = "";
        mainWorkingBox
          .querySelector(".suggestions")
          .classList.add("format-suggestions");
      }
      mainWorkingBox
        .querySelector(".searching-shimmer")
        .classList.add("hidden");
      mainWorkingBox
        .querySelector(".suggestions")
        .insertAdjacentHTML("beforeend", listData.join(""));
    }

    async function handleRequestsAndProcessData(requestPlay, requestIOS) {
      try {
        const response1 = await fetch(requestIOS);
        const response2 = await fetch(requestPlay);
        const iOSResponse = await response1.json();
        const playResponse = await response2.json();

        const mergedData = {
          iOSResponse,
          playResponse,
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
          return `<li class="li-suggestion-item" application-url="${item.dataPackageUrl}" application-id="${item.appPackageId}" application-img-logo="${item.app_icon}" device="${item.device}"><div class="show-device-icon"><div class="li-suggestion-item-logo"><img src="${item.app_icon}" alt="app_icon" class="app-icon-li-item" layout="responsive" /></div><div class="li-suggestion-item-info"><strong>${item.appName}</strong><span>${item.developer}</span></div></div> <div class="device-icon" device="${item.device}"><img src="${deviceIcon}" alt="device-logo" class="device-icon-logo"/></div></li>`;
        }
      });
    }

    function clearSearchBar(mainBoxHolder) {
      console.log(mainBoxHolder);
      let inputBox = mainBoxHolder.querySelector(".search-input");
      inputBox.value = "";
      inputBox.removeAttribute("application-url");
      inputBox.removeAttribute("application-id");
      inputBox.removeAttribute("application-img-logo");
      try {
        mainBoxHolder
          .querySelector(".suggestions")
          .classList.remove("format-suggestions");
      } catch {}
      mainBoxHolder.querySelector(".suggestions").innerHTML = "";
    }

    function clearFormElement() {
      document.querySelector(".apple-ios-app_store").classList.add("hidden");
      const imageBox = document.querySelector("#iOS-form-logo");
      imageBox.src = "";
      imageBox.setAttribute("image-data", "");
    }

    function mergedExtractedData(rowData) {
      let appDataMain = [];
      let appDataA = [];
      let appDataP = [];
      rowData.iOSResponse.results.map((item) => {
        if (item.trackViewUrl) {
          let iosData = {
            dataPackageUrl: item.trackViewUrl,
            appPackageId: item.trackViewUrl.split("/")[5],
            app_icon: item.artworkUrl100,
            appName: item.trackName,
            developer: "By " + item.artistName,
            device: "apple",
            deviceIcon: "apple_icon.svg",
          };
          appDataA.push(iosData);
        }
      });
      rowData.playResponse.map((item) => {
        let playData = {
          dataPackageUrl:
            "https://play.google.com/store/apps/details?id=" + item.package_id,
          appPackageId: item.package_id,
          app_icon: item.app_icon,
          appName: item.title,
          developer: "By " + item.developer_name,
          device: "android",
          deviceIcon: "android_icon.svg",
        };
        appDataP.push(playData);
      });
      appDataA.map((app, index) => {
        appDataMain.push(appDataA[index]);
        if (appDataP[index]) {
          appDataMain.push(appDataP[index]);
        }
      });
      if (appDataA.length === 0) appDataMain = appDataP;
      return appDataMain;
    }

    // document.getElementById("search-bar-input1").focus();
    const iOSOuterBoxes = document.querySelectorAll(".main-box-holder");
    const closeSearchBtn = document.querySelectorAll(".close-search-form");
    closeSearchBtn.forEach((close) => {
      close.addEventListener("click", (event) => {
        event.target.classList.add("hidden");
        clearSearchBar(event.target.closest(".main-box-holder"));
        clearFormElement();
      });
    });
    iOSOuterBoxes.forEach((iOSOuterBox) => {
      setupautoComplete(iOSOuterBox);
    });
  });

  function selectAppHandler(event) {
    const selectedLi = event.target.closest("li.li-suggestion-item");
    const mainBoxHolder = selectedLi.closest(".main-box-holder");
    console.log("select function executed");
    return getDetailsOfSelectedLi(selectedLi, mainBoxHolder);
  }

  function getDetailsOfSelectedLi(selectedItem, mainBoxHolder) {
    const inputBox = mainBoxHolder.querySelector(".search-input");
    const keyword = inputBox.value;
    const applicationId = selectedItem.getAttribute("application-id");
    const imageURL = selectedItem.getAttribute("application-img-logo");
    const appPackageURL = selectedItem.getAttribute("application-url");
    const device = selectedItem.getAttribute("device");
    const appName = selectedItem.querySelector(
      ".li-suggestion-item-info"
    ).innerHTML;
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
    if (device == "apple") {
      dataLayer.push({
        event: "ios_app_select",
        keyword: keyword,
        "gtm.elementId": applicationId,
        "gtm.elementUrl": appPackageURL,
        "gtm.uniqueAnalyticsReports": "AnalyticsLiveWeb_nl",
      });
    } else {
      dataLayer.push({
        event: "play_app_select",
        keyword: keyword,
        "gtm.elementId": applicationId,
        "gtm.elementUrl": appPackageURL,
        "gtm.uniqueAnalyticsReports": "AnalyticsLiveWeb_nl",
      });
    }
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

  // handle event *****************************************
  const handleClick = (event) => {
    let { appPackageURL, applicationId, imageURL, device } =
      selectAppHandler(event);
    displayAppRelatedBox(appPackageURL, imageURL, device);
    let mainBoxHolder = event.target.closest(".main-box-holder");
    const country = mainBoxHolder
      .querySelector(".country-select-button")
      .getAttribute("country-code");
    updateOtherSectionToSelectedApp(
      appPackageURL,
      applicationId,
      imageURL,
      device,
      country
    );
  };

  // ******************************************************
  function displayAppRelatedBox(packageURL, appLogo, device) {
    if (packageURL !== undefined) {
      const formHolder = document.querySelector(".form-holder");
      formHolder.style.display = "block";
      let form = formHolder.querySelector("#wf-form-ContactUsForm2");
      form.setAttribute("app-url", packageURL);
    } else {
      window.alert("Warning! Please select the app from the dropdown menu.");
    }
  }
  // ***************************************************************
  async function updateOtherSectionToSelectedApp(
    appPackageURL,
    applicationId,
    imageURL,
    device,
    country
  ) {
    const countryResult = countries.find(
      (cn) => cn.code === country.toLowerCase()
    );
    const countryName = country ? countryResult.name : country;
    const flag = countryFlagImages[country];
    countrySelectBtn.forEach((button) => {
      const result = button.offsetWidth > 200 ? true : false;
      let cName = result ? countryName : country.toUpperCase();
      button.setAttribute("country-code", country);
      button.setAttribute("country-name", cName);
      const oldSpanElement = button.firstElementChild;
      // Create a new span element
      const newSpan = document.createElement("span");
      // Create a text node for the country code
      const countryCodeNode = document.createTextNode(cName);
      // Append the img and text nodes to the new span element
      const clonedFlag = flag.cloneNode(true);
      newSpan.appendChild(clonedFlag);
      newSpan.appendChild(countryCodeNode);
      // Replace the existing span element with the new span element
      button.replaceChild(newSpan, oldSpanElement);
    });
    calculatePriceForSelectedApp(
      appPackageURL,
      applicationId,
      imageURL,
      device,
      document.querySelector("#search-box1")
    );
    document.querySelector("#custom-contact-btn").classList.add("hidden");
    let pricingBtn = document.querySelector("#solutions");
    pricingBtn.click();
    pricingBtn.scrollIntoView({ behavior: "smooth" });
    const response = await fetchAndStoreAppDataToBox(
      appPackageURL,
      applicationId,
      device,
      country
    );
    const allMiniContainer = document.querySelectorAll(".mini-main-container");
    showResponseToAllSmallBox(response, device, allMiniContainer);
    try {
      closeSearchBtn.forEach((close) => {
        close.classList.remove("hidden");
      });
    } catch {}
  }

  return (
    <section id="services" className="tabsection">
      <div className="container-11">
        <div className="title-wrap-2 horizontal lesspadding">
          <h2
            data-w-id="0862d6f9-a925-7b8c-65e6-58a2fd5c72b5"
            className="heading tabsectiontitle"
          >
            Improve App&#x27;s Organic Visibility
          </h2>
          <p
            data-w-id="0862d6f9-a925-7b8c-65e6-58a2fd5c72b7"
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveSol("solution1");
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
                    {/* <div className="tab-button-desc">
                      Rank on your target keywords, get into similar and related
                      app section and improve chart rankings.
                    </div> */}

                    <div className="app-search-box-holder margin-top new-height mobile">
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
                                    onChange={(e) => {
                                      appSearch(e);
                                    }}
                                  />
                                  <button
                                    id="close-search-form6"
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
                                  <div
                                    id="searching-shimmer6"
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
                                    id="suggestions-box6"
                                    className="suggestions"
                                  ></ul>
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
                                style={{ height: 300, width: 300 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="app-info-display installs mobile hidden">
                        <div className="w-embed w-script">
                          <div className="app-basic-info-box">
                            <div className="app-img-box">
                              <img
                                src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                                alt="application logo"
                                className="app-image"
                              />
                            </div>
                            <div className="app-information">
                              <div>
                                <h4></h4>
                              </div>
                              <div>
                                <img src="/assets/imgs/target.svg" alt="R: " />
                                <strong></strong>
                                <em> </em>
                              </div>
                              <div className="app-developer-name"></div>
                            </div>
                          </div>
                          <div className="milestones">
                            <h4>Next Milestone</h4>
                            <div className="milestones-images">
                              <div className="current-milestone">
                                <img
                                  src="/assets/imgs/milestonereached.svg"
                                  alt="currentIMG"
                                />
                                <span></span>
                              </div>
                              <img
                                src="/assets/imgs/Arrow-vector-blue.svg"
                                alt="Arrow"
                              />
                              <div className="next-milestone">
                                <img
                                  src="/assets/imgs/milestonetarget.svg"
                                  alt="nextIMG"
                                />
                                <span></span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="slider-intro-text">
                              <h4>
                                How fast do you want to reach the next Target.
                              </h4>
                            </div>
                            <div
                              className="range-slider-box"
                              style={{ margin: "16px 0" }}
                            >
                              <input
                                type="range"
                                name="range-slider"
                                id="install-slider2"
                                className="app-range-slider"
                                min="30"
                                max="360"
                                step="10"
                                onChange={() => {
                                  console.log("input value change");
                                }}
                                defaultValue="180"
                              />
                              <strong>180 Days</strong>
                            </div>
                          </div>
                          <div className="result-text-box hidden">
                            <h5>
                              To achieve the target, you need to attain{" "}
                              <em>6,000</em> installs daily for the next
                              <em>180</em> days.
                            </h5>
                          </div>
                          <ul className="review-suggestion-list">
                            <h4>Our Suggestion to Improve Installs</h4>
                            <li className="review-first-line">
                              Detailed Keyword Research.
                            </li>
                            <li className="review-second-line">
                              Content Gap Analysis.
                            </li>
                            <li className="review-third-line hidden">
                              On-Page Recommendation.
                            </li>
                          </ul>
                          <div className="main-button-box">
                            <button type="submit" className="back-button">
                              Back
                            </button>
                            <button className="contact-button-display-form">
                              Submit App
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveSol("solution2");
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
                    {/* <div className="tab-button-desc">
                      How to get more percentage of people click on your result?
                      1000s of users can give you precise feedback on the same.
                    </div> */}

                    <div className="app-search-box-holder margin-top new-height mobile">
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
                                    onChange={() => {
                                      appSearch();
                                    }}
                                    placeholder="Search your iOS or android app"
                                  />
                                  <button
                                    id="close-search-form7"
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
                                </div>
                                <div className="app-output-box">
                                  <div
                                    id="searching-shimmer7"
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
                                    id="suggestions-box7"
                                    className="suggestions"
                                  ></ul>
                                </div>
                              </div>
                              <CountrySelect
                                showCode={true}
                                setSelectedCountryCode={setSelectedCountryCode}
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
                      <div className="app-info-display ctr mobile hidden">
                        <div className="w-embed w-script">
                          <div className="app-basic-info-box">
                            <div className="app-img-box">
                              <img
                                src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                                alt="application logo"
                                className="app-image"
                              />
                            </div>
                            <div className="app-information">
                              <div>
                                <h4></h4>
                              </div>
                              <div>
                                <img src="/assets/imgs/target.svg" alt="R: " />
                                <strong></strong>
                                <em> </em>
                              </div>
                              <div className="app-developer-name"></div>
                            </div>
                          </div>
                          <div className="milestones">
                            <h4>Next Milestone</h4>
                            <div className="milestones-images">
                              <div className="current-milestone">
                                <img
                                  src="/assets/imgs/current.svg"
                                  alt="currentIMG"
                                />
                                <span> 2.4</span>
                              </div>
                              <img
                                src="/assets/imgs/Arrow-vector-blue.svg"
                                alt="Arrow"
                              />
                              <div className="next-milestone">
                                <img
                                  src="/assets/imgs/target.svg"
                                  alt="nextIMG"
                                />
                                <span>4.9</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="slider-intro-text">
                              <h4>
                                What rating are you aiming for within the
                                upcoming 60 days?
                              </h4>
                            </div>
                            <div className="range-slider-box">
                              <input
                                type="range"
                                name="range-slider"
                                id="rating-slider2"
                                className="app-range-slider"
                                min="0.0"
                                max="5"
                                step="0.05"
                                onChange={() => {
                                  console.log("input value change");
                                }}
                                defaultValue="2.9"
                              />
                              <strong>2.9</strong>
                            </div>
                          </div>
                          <div className="result-text-box hidden">
                            <h5>
                              To achieve the target, you need to attain 6,000
                              ratings daily for the next 60 days.
                            </h5>
                          </div>
                          <ul className="review-suggestion-list">
                            <h4>Our Suggestion to Improve Ratting</h4>
                            <li className="review-first-line hidden">
                              Sementic Anomalies.
                            </li>
                            <li className="review-second-line hidden">
                              ML based rating prompts.
                            </li>
                            <li className="review-third-line hidden">
                              Integrate our SDK, or allow API access to your
                              analytics.
                            </li>
                          </ul>
                          <div className="main-button-box">
                            <button type="submit" className="back-button">
                              Back
                            </button>
                            <button className="contact-button-display-form">
                              Submit App
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveSol("solution3");
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
                    {/* <div className="tab-button-desc">
                      Get a higher store listing conversion. Focus on MHR (Most
                      helpful review section), on page assets, description. For
                      instance, did you know that you can change the font size,
                      and font Color?
                    </div> */}
                    <div className="app-search-box-holder margin-top new-height mobile">
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
                                    onChange={() => {
                                      appSearch();
                                    }}
                                  />
                                  <button
                                    id="close-search-form8"
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
                                </div>
                                <div className="app-output-box">
                                  <div
                                    id="searching-shimmer8"
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
                                    id="suggestions-box8"
                                    className="suggestions"
                                  ></ul>
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
                                animationData={conversionMarketing}
                                loop={true}
                                style={{ height: 300, width: 300 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="app-info-display mhr mobile hidden">
                        <div className="w-embed">
                          <div className="app-basic-info-box">
                            <div className="app-img-box">
                              <img
                                src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                                alt="application logo"
                                className="app-image"
                              />
                            </div>
                            <div className="app-information">
                              <div>
                                <h4></h4>
                              </div>
                              <div>
                                <img src="/assets/imgs/target.svg" alt="R: " />
                                <strong></strong>
                                <em> </em>
                              </div>
                              <div className="app-developer-name"></div>
                            </div>
                          </div>
                          <ul className="conversion-suggestion-list">
                            <h4>Our Deep Recommendation</h4>
                            <li className="conversion-first-line">
                              Nice that you have added 8 Screenshots.
                            </li>
                            <li className="conversion-second-line">
                              Great! Work Adding Video to your Store listing.
                            </li>
                            <li className="conversion-third-line">
                              MHR Score is 40, This is not good for your ASO
                              strategy.
                            </li>
                          </ul>
                          <div className="main-button-box">
                            <button type="submit" className="back-button">
                              Back
                            </button>
                            <button className="contact-button-display-form">
                              Submit App
                            </button>
                          </div>
                        </div>
                      </div>
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
                <div className="app-search-box-holder margin-top new-height">
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
                                onChange={() => {
                                  appSearch();
                                }}
                              />
                              <button
                                id="close-search-form2"
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
                            </div>
                            <div className="app-output-box">
                              <div
                                id="searching-shimmer2"
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
                                id="suggestions-box2"
                                className="suggestions"
                              ></ul>
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
                            style={{ height: 300, width: 300 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="app-info-display installs hidden">
                    <div className="w-embed w-script">
                      <div className="app-basic-info-box">
                        <div className="app-img-box">
                          <img
                            src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                            alt="application logo"
                            className="app-image"
                          />
                        </div>
                        <div className="app-information">
                          <div>
                            <h4></h4>
                          </div>
                          <div>
                            <img src="/assets/imgs/target.svg" alt="R: " />
                            <strong></strong>
                            <em> </em>
                          </div>
                          <div className="app-developer-name"></div>
                        </div>
                      </div>
                      <div className="milestones">
                        <h4>Next Milestone</h4>
                        <div className="milestones-images">
                          <div className="current-milestone">
                            <img
                              src="/assets/imgs/milestonereached.svg"
                              alt="currentIMG"
                            />
                            <span></span>
                          </div>
                          <img
                            src="/assets/imgs/Arrow-vector-blue.svg"
                            alt="Arrow"
                          />
                          <div className="next-milestone">
                            <img
                              src="/assets/imgs/milestonetarget.svg"
                              alt="nextIMG"
                            />
                            <span></span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="slider-intro-text">
                          <h4>
                            How fast do you want to reach the next Target.
                          </h4>
                        </div>
                        <div
                          className="range-slider-box"
                          style={{ margin: "16px 0" }}
                        >
                          <input
                            type="range"
                            name="range-slider"
                            id="install-slider"
                            className="app-range-slider"
                            min="30"
                            max="360"
                            step="10"
                            defaultValue="180"
                            onChange={() => {
                              console.log("input value change");
                            }}
                          />
                          <strong>180 Days</strong>
                        </div>
                      </div>
                      <div className="result-text-box hidden">
                        <h5>
                          To achieve the target, you need to attain{" "}
                          <em>6,000</em> installs daily for the next
                          <em>180</em> days.
                        </h5>
                      </div>
                      <ul className="review-suggestion-list">
                        <h4>Our Suggestion to Improve Installs</h4>
                        <li className="review-first-line">
                          Detailed Keyword Research.
                        </li>
                        <li className="review-second-line">
                          Content Gap Analysis.
                        </li>
                        <li className="review-third-line hidden">
                          On-Page Recommendation.
                        </li>
                      </ul>
                      <div className="main-button-box">
                        <button type="submit" className="back-button">
                          Back
                        </button>
                        <button className="contact-button-display-form">
                          Submit App
                        </button>
                      </div>
                    </div>
                  </div>
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
                <div className="app-search-box-holder margin-top new-height">
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
                                onChange={() => {
                                  appSearch();
                                }}
                              />
                              <button
                                id="close-search-form3"
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
                            </div>
                            <div className="app-output-box">
                              <div
                                id="searching-shimmer3"
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
                                id="suggestions-box3"
                                className="suggestions"
                              ></ul>
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
                            style={{ height: 300, width: 300 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="app-info-display ctr hidden">
                    <div className="w-embed w-script">
                      <div className="app-basic-info-box">
                        <div className="app-img-box">
                          <img
                            src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                            alt="application logo"
                            className="app-image"
                          />
                        </div>
                        <div className="app-information">
                          <div>
                            <h4></h4>
                          </div>
                          <div>
                            <img src="/assets/imgs/target.svg" alt="R: " />
                            <strong></strong>
                            <em> </em>
                          </div>
                          <div className="app-developer-name"></div>
                        </div>
                      </div>
                      <div className="milestones">
                        <h4>Next Milestone</h4>
                        <div className="milestones-images">
                          <div className="current-milestone">
                            <img
                              src="/assets/imgs/current.svg"
                              alt="currentIMG"
                            />
                            <span> 2.4</span>
                          </div>
                          <img
                            src="/assets/imgs/Arrow-vector-blue.svg"
                            alt="Arrow"
                          />
                          <div className="next-milestone">
                            <img src="/assets/imgs/target.svg" alt="nextIMG" />
                            <span>4.9</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="slider-intro-text">
                          <h4>
                            What rating are you aiming for within the upcoming
                            60 days?
                          </h4>
                        </div>
                        <div className="range-slider-box">
                          <input
                            type="range"
                            name="range-slider"
                            id="rating-slider"
                            className="app-range-slider"
                            min="0.0"
                            max="5"
                            step="0.05"
                            defaultValue="2.9"
                            onChange={() => {
                              console.log("input value change");
                            }}
                          />
                          <strong>2.9</strong>
                        </div>
                      </div>
                      <div className="result-text-box hidden">
                        <h5>
                          To achieve the target, you need to attain 6,000
                          ratings daily for the next 60 days.
                        </h5>
                      </div>
                      <ul className="review-suggestion-list">
                        <h4>Our Suggestion to Improve Ratting</h4>
                        <li className="review-first-line hidden">
                          Sementic Anomalies.
                        </li>
                        <li className="review-second-line hidden">
                          ML based rating prompts.
                        </li>
                        <li className="review-third-line hidden">
                          Integrate our SDK, or allow API access to your
                          analytics.
                        </li>
                      </ul>
                      <div className="main-button-box">
                        <button type="submit" className="back-button">
                          Back
                        </button>
                        <button className="contact-button-display-form">
                          Submit App
                        </button>
                      </div>
                    </div>
                  </div>
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
                                onChange={() => {
                                  appSearch();
                                }}
                                placeholder="Search your iOS or android app"
                              />
                              <button
                                id="close-search-form4"
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
                            </div>
                            <div className="app-output-box">
                              <div
                                id="searching-shimmer4"
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
                                id="suggestions-box4"
                                className="suggestions"
                                onClick={handleClick}
                              ></ul>
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
                            style={{ height: 300, width: 300 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="app-info-display mhr hidden">
                    <div className="w-embed">
                      <div className="app-basic-info-box">
                        <div className="app-img-box">
                          <img
                            src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                            alt="application logo"
                            className="app-image"
                          />
                        </div>
                        <div className="app-information">
                          <div>
                            <h4></h4>
                          </div>
                          <div>
                            <img src="/assets/imgs/target.svg" alt="R: " />
                            <strong></strong>
                            <em> </em>
                          </div>
                          <div className="app-developer-name"></div>
                        </div>
                      </div>
                      <ul className="conversion-suggestion-list">
                        <h4>Our Deep Recommendation</h4>
                        <li className="conversion-first-line">
                          Nice that you have added 8 Screenshots.
                        </li>
                        <li className="conversion-second-line">
                          Great! Work Adding Video to your Store listing.{" "}
                        </li>
                        <li className="conversion-third-line">
                          MHR Score is 40, This is not good for your ASO
                          strategy.
                        </li>
                      </ul>
                      <div className="main-button-box">
                        <button type="submit" className="back-button">
                          Back
                        </button>
                        <button className="contact-button-display-form">
                          Submit App
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
