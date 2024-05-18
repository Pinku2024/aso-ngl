import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import CountrySelect from "./elements/CountrySelect";
import LoginPopup from "./elements/LoginPopup";

const Audit = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("us");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const handleEvent = () => {
      const formHolder = document.querySelector(".form-holder");
      if (formHolder && formHolder.style.display === "none") {
        setIsPopupVisible(true);
        formHolder.style.display = "block";
      }
    };

    // logic when user select app from suggestions
  }, []);

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  // ************************************

  useEffect(() => {
    function setupAutoComplete(iOSOuterBox) {
      let iOSAutoCompleteTimer;
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
        clearTimeout(iOSAutoCompleteTimer);
        iOSAutoCompleteTimer = setTimeout(function () {
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
          return `<li class= "li-suggestion-item" application-url="${item.dataPackageUrl}" application-id="${item.appPackageId}" application-img-logo="${item.app_icon}" device="${item.device}"><div class="show-device-icon"><div class="li-suggestion-item-logo"><img src="${item.app_icon}" alt="app_icon" class="app-icon-li-item" /></div><div class="li-suggestion-item-info"><strong>${item.appName}</strong><span>${item.developer}</span></div></div></div> <div class="device-icon" device="${item.device}"><img src="${deviceIcon}" alt="device-logo" class="device-icon-logo"/></div></li>`;
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

    document.getElementById("search-bar-input1").focus();
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
      setupAutoComplete(iOSOuterBox);
    });
  });

  function selectAppHandler(event) {
    const selectedLi = event.target.closest("li.li-suggestion-item");
    const mainBoxHolder = selectedLi.closest(".main-box-holder");
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

  function mySubmit() {
    const imageElement = document.getElementById("iOS-form-logo");
    const imageData = imageElement.getAttribute("image-data");
    var name2 = $("#name-2").val();
    var email2 = $("#Emailaddress2").val();
    var phone2 = $("#Phone-3").val();
    var url2 = imageData;
    var message2 = $("#Message2").val();
    var pageURL = $(location).attr("href");
    var eventNameW = "play_hsForm_field";
    if (imageData.split("/")[2].split(".")[1] == "apple") {
      eventNameW = "iOS_hsForm_field";
    }
    var domains = [
      "yahoo",
      "protonmail",
      "aol",
      "mail",
      "gmail",
      "outlook",
      "hotmail",
      "zoho",
      "icloud",
      "gmx",
    ];
    var domain = email2.slice(email2.indexOf("@") + 1, email2.lastIndexOf("."));
    let con_value;
    if (domains.includes(domain)) {
      con_value = 331;
    } else if (email2 === "") {
      con_value = 331;
    } else {
      con_value = 1237;
    }
    dataLayer.push({
      event: eventNameW,
      "gtm.username": name2,
      "gtm.email": email2,
      "gtm.elementUrl": imageData,
      "gtm.uniqueAnalyticsReports": "AnalyticsHSFormWeb_nl",
      "gtm.phone": phone2,
      "gtm.currency": "INR",
      "gtm.value": con_value,
      "gtm.message": message2,
    });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      fields: [
        {
          name: "firstname",
          value: name2,
        },
        {
          name: "email",
          value: email2,
        },
        {
          name: "phone",
          value: phone2,
        },
        {
          name: "app_url",
          value: url2,
        },
        {
          name: "message",
          value: message2,
        },
      ],
      context: {
        pageUri: pageURL,
      },
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      "https://api.hsforms.com/submissions/v3/integration/submit/3885214/efaf7e24-de65-496d-9983-ffb476f65524",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      <section id="app-audit" className="section service over-flow-new">
        <div className="container-hero-logos new-bg w-container">
          <article className="home-hero-wrapper flex-vertical new-spacing">
            <div className="split-content home-hero-left flex-centre margin-new">
              <h1 className="heading-hero new-centre-aligned white">
                <strong className="white">App Store Optimization</strong>
              </h1>
              <p className="paragraph home-hero new-centre-aligned width">
                Since 2016, we&#x27;ve been at the forefront of App Marketing.
                Some of world&#x27;s top brands too read these lines, before
                contacting and working with us. The next 5 minutes you spend
                reading about us will give you a glimpse to our approach. Want a
                customised presentation? Let us know.
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
                            onClick={handleClick}
                          ></ul>
                        </div>
                      </div>

                      {/* <div className="country-selection-box">
                        <div
                          className="country-select-button"
                          id="select-country-btn1"
                          country-code="us"
                          country-name="United State"
                        >
                          <span>
                            <img
                              src="https://flagcdn.com/40x30/us.png"
                              alt="United States"
                              loading="eager"
                              className="country-flags"
                            />
                            United State
                          </span>
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-chevron-down"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                              ></path>
                            </svg>
                          </i>
                        </div>
                        <div className="country-search-box">
                          <div className="content-country" id="content-box1">
                            <div className="search">
                              <input
                                spellCheck="false"
                                autoComplete="off"
                                type="text"
                                placeholder="Search"
                                id="country-search-input"
                              />
                            </div>
                            <ul className="options"></ul>
                          </div>
                        </div>
                      </div> */}

                      <CountrySelect
                        setSelectedCountryCode={setSelectedCountryCode}
                      />

                      <button
                        type="submit"
                        className="audit-button"
                        id="Audit-App-button"
                      >
                        Start Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-2 contact apple-ios-app_store hidden">
                  <div className="hide w-embed"></div>
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
                  <div className="w-form">
                    <form
                      id="wf-form-ContactUsForm2"
                      name="wf-form-ContactUsForm"
                      data-name="ContactUsForm"
                      method="get"
                      data-wf-page-id="6576f808b0f14ea0f93c043d"
                      data-wf-element-id="74b03cde-6fdc-298a-3713-4dbaa67e1f5d"
                    >
                      <div className="w-embed"></div>

                      <div className="w-layout-grid contact-form-grid">
                        <div
                          id="w-node-_74b03cde-6fdc-298a-3713-4dbaa67e1f61-f93c043d"
                          className="input-wrapper"
                        >
                          <label htmlFor="name-2">Full Name</label>
                          <input
                            className="input-4 w-input"
                            maxLength="256"
                            name="name-2"
                            data-name="Name 2"
                            placeholder="What’s your name?"
                            type="text"
                            id="name-2"
                            required=""
                          />
                        </div>
                        <div
                          id="w-node-_74b03cde-6fdc-298a-3713-4dbaa67e1f65-f93c043d"
                          className="input-wrapper"
                        >
                          <label htmlFor="Emailaddress">Email Address</label>
                          <input
                            className="input-4 w-input"
                            maxLength="256"
                            name="Email"
                            data-name="Email"
                            placeholder="What’s your email?"
                            type="email"
                            id="Emailaddress2"
                            required=""
                          />
                        </div>
                        <div
                          id="w-node-_74b03cde-6fdc-298a-3713-4dbaa67e1f69-f93c043d"
                          className="input-wrapper-2"
                        >
                          <label htmlFor="Phone" className="field-label">
                            Phone
                          </label>
                          <input
                            className="input-2 w-input"
                            maxLength="256"
                            name="Phone-3"
                            data-name="Phone 3"
                            placeholder="What&#x27;s your phone number?"
                            type="tel"
                            id="Phone-3"
                          />
                        </div>
                        <div
                          id="w-node-_74b03cde-6fdc-298a-3713-4dbaa67e1f6d-f93c043d"
                          className="input-wrapper"
                        >
                          <label htmlFor="Message-2">Message</label>
                          <textarea
                            id="Message2"
                            name="Message-2"
                            maxLength="5000"
                            data-name="Message 2"
                            placeholder="What can we help you with?"
                            className="message-2 w-input"
                          ></textarea>
                        </div>
                        <input
                          type="submit"
                          data-wait="Please wait..."
                          id="w-node-_74b03cde-6fdc-298a-3713-4dbaa67e1f71-f93c043d"
                          className="button-primary-2 request-a-quote w-button"
                          value="Submit App"
                        />
                      </div>
                    </form>
                    <div className="success-message w-form-done">
                      <div className="text-block-23">
                        Your message has been submitted. <br />
                        We will get back to you within 24-48 hours.
                      </div>
                      <div className="button-holder-error-message">
                        <Link
                          href="#"
                          id="get-custom-pricing-btn"
                          className="button-primary-cleint width-small w-button"
                        >
                          Get Custom Pricing
                        </Link>
                      </div>
                    </div>
                    <div className="error-message w-form-fail">
                      <div>Oops! Something went wrong.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="container-large-1134px">
        <div className="images-wrapper hero-service">
          <img
            src="/assets/imgs/BG-Lines-Yellow.svg"
            loading="lazy"
            style={{
              WebkitTransform:
                "translate3d(0, -60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              MozTransform:
                "translate3d(0, -60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              msTransform:
                "translate3d(0, -60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              transform:
                "translate3d(0, -60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              opacity: 1,
            }}
            data-w-id="2408ce64-3e73-6c5b-6f9c-1dd071cb45e5"
            alt=""
            className="bg service"
          />
        </div>
        <div className="images-wrapper-mob">
          <img
            src="/assets/imgs/BG-Lines-Yellow.svg"
            loading="lazy"
            style={{
              WebkitTransform:
                "translate3d(0, -60PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              MozTransform:
                "translate3d(0, -60PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              msTransform:
                "translate3d(0, -60PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              transform:
                "translate3d(0, -60PX, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              opacity: 1,
            }}
            data-w-id="82a7697f-b6ea-f83c-de2b-48cbab6c52c4"
            alt=""
            className="bg service-2"
          />
        </div>
      </div>
      {isPopupVisible && <LoginPopup closePopup={closePopup} />}
    </>
  );
};

export default Audit;
