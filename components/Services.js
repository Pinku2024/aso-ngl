import { useEffect, useState, useRef } from "react";
import CountrySelect from "./elements/CountrySelect";
import Lottie from "lottie-react";
import asoGreen from "../public/assets/documents/aso-green.json";
import conversionMarketing from "../public/assets/documents/conversion-marketing.json";
import starRating from "../public/assets/documents/Five-Star-Rating.json";
import { useSelectedApp } from "../context/EventContext";
import RecentApps from "./elements/RecentApps";
import { useAtom } from "jotai";
import {
  searchKeyword,
  showRecentApps,
  showSearchApps,
} from "../context/store";
import SearchResults from "./elements/SearchResults";
const Services = () => {
  const [recentAppsVisible, setRecentAppsVisible] = useAtom(showRecentApps);
  const [activeSol, setActiveSol] = useState("solution1");
  const [selectedCountryCode, setSelectedCountryCode] = useState("in");
  const { appSelect, setAppSelect } = useSelectedApp();
  const [searchAppVisible, setSearchAppVisible] = useAtom(showSearchApps);
  const [searchAppKeyword, setSearchAppKeyword] = useAtom(searchKeyword);
  const countries = useMemo(
    () => [
      { name: "Afghanistan", code: "af", flag: "af.png" },
      { name: "Algeria", code: "dz", flag: "dz.png" },
      { name: "Angola", code: "ao", flag: "ao.png" },
      { name: "Argentina", code: "ar", flag: "ar.png" },
      { name: "Australia", code: "au", flag: "au.png" },
      { name: "Austria", code: "at", flag: "at.png" },
      { name: "Bangladesh", code: "bd", flag: "bd.png" },
      { name: "Belarus", code: "by", flag: "by.png" },
      { name: "Belgium", code: "be", flag: "be.png" },
      { name: "Belize", code: "bz", flag: "bz.png" },
      { name: "Bolivia", code: "bo", flag: "bo.png" },
      { name: "Bosnia and Herzegovina", code: "ba", flag: "ba.png" },
      { name: "Botswana", code: "bw", flag: "bw.png" },
      { name: "Brazil", code: "br", flag: "br.png" },
      { name: "Bulgaria", code: "bg", flag: "bg.png" },
      { name: "Cambodia", code: "kh", flag: "kh.png" },
      { name: "Cameroon", code: "cm", flag: "cm.png" },
      { name: "Canada", code: "ca", flag: "ca.png" },
      { name: "Chile", code: "cl", flag: "cl.png" },
      { name: "China", code: "cn", flag: "cn.png" },
      { name: "Colombia", code: "co", flag: "co.png" },
      { name: "Congo, D.R.", code: "cd", flag: "cd.png" },
      { name: "Costa Rica", code: "cr", flag: "cr.png" },
      { name: "Croatia", code: "hr", flag: "hr.png" },
      { name: "Cyprus", code: "cy", flag: "cy.png" },
      { name: "Czech Republic", code: "cz", flag: "cz.png" },
      { name: "Côte d'Ivoire", code: "ci", flag: "ci.png" },
      { name: "Denmark", code: "dk", flag: "dk.png" },
      { name: "Dominican R.", code: "do", flag: "do.png" },
      { name: "Ecuador", code: "ec", flag: "ec.png" },
      { name: "Egypt", code: "eg", flag: "eg.png" },
      { name: "El Salvador", code: "sv", flag: "sv.png" },
      { name: "Estonia", code: "ee", flag: "ee.png" },
      { name: "Finland", code: "fi", flag: "fi.png" },
      { name: "France", code: "fr", flag: "fr.png" },
      { name: "Gabon", code: "ga", flag: "ga.png" },
      { name: "Georgia", code: "ge", flag: "ge.png" },
      { name: "Germany", code: "de", flag: "de.png" },
      { name: "Greece", code: "gr", flag: "gr.png" },
      { name: "Guatemala", code: "gt", flag: "gt.png" },
      { name: "Honduras", code: "hn", flag: "hn.png" },
      { name: "Hong Kong", code: "hk", flag: "hk.png" },
      { name: "Hungary", code: "hu", flag: "hu.png" },
      { name: "Iceland", code: "is", flag: "is.png" },
      { name: "India", code: "in", flag: "in.png" },
      { name: "Indonesia", code: "id", flag: "id.png" },
      { name: "Iran, Islamic Republic of", code: "ir", flag: "ir.png" },
      { name: "Iraq", code: "iq", flag: "iq.png" },
      { name: "Ireland", code: "ie", flag: "ie.png" },
      { name: "Israel", code: "il", flag: "il.png" },
      { name: "Italy", code: "it", flag: "it.png" },
      { name: "Japan", code: "jp", flag: "jp.png" },
      { name: "Jordan", code: "jo", flag: "jo.png" },
      { name: "Kazakhstan", code: "kz", flag: "kz.png" },
      { name: "Kenya", code: "ke", flag: "ke.png" },
      { name: "Korea, Republic of", code: "kr", flag: "kr.png" },
      { name: "Kosovo", code: "xk", flag: "xk.png" },
      { name: "Kuwait", code: "kw", flag: "kw.png" },
      { name: "Lao People's D.R.", code: "la", flag: "la.png" },
      { name: "Latvia", code: "lv", flag: "lv.png" },
      { name: "Lebanon", code: "lb", flag: "lb.png" },
      { name: "Libya", code: "ly", flag: "ly.png" },
      { name: "Lithuania", code: "lt", flag: "lt.png" },
      { name: "Luxembourg", code: "lu", flag: "lu.png" },
      { name: "Macao", code: "mo", flag: "mo.png" },
      { name: "Malawi", code: "mw", flag: "mw.png" },
      { name: "Malaysia", code: "my", flag: "my.png" },
      { name: "Maldives", code: "mv", flag: "mv.png" },
      { name: "Mexico", code: "mx", flag: "mx.png" },
      { name: "Montenegro", code: "me", flag: "me.png" },
      { name: "Morocco", code: "ma", flag: "ma.png" },
      { name: "Myanmar", code: "mm", flag: "mm.png" },
      { name: "Nauru", code: "nr", flag: "nr.png" },
      { name: "Netherlands", code: "nl", flag: "nl.png" },
      { name: "New Zealand", code: "nz", flag: "nz.png" },
      { name: "Nicaragua", code: "ni", flag: "ni.png" },
      { name: "Nigeria", code: "ng", flag: "ng.png" },
      { name: "Norway", code: "no", flag: "no.png" },
      { name: "Oman", code: "om", flag: "om.png" },
      { name: "Pakistan", code: "pk", flag: "pk.png" },
      { name: "Panama", code: "pa", flag: "pa.png" },
      { name: "Paraguay", code: "py", flag: "py.png" },
      { name: "Peru", code: "pe", flag: "pe.png" },
      { name: "Philippines", code: "ph", flag: "ph.png" },
      { name: "Poland", code: "pl", flag: "pl.png" },
      { name: "Portugal", code: "pt", flag: "pt.png" },
      { name: "Qatar", code: "qa", flag: "qa.png" },
      { name: "Romania", code: "ro", flag: "ro.png" },
      { name: "Russian Federation", code: "ru", flag: "ru.png" },
      { name: "Rwanda", code: "rw", flag: "rw.png" },
      { name: "Saudi Arabia", code: "sa", flag: "sa.png" },
      { name: "Senegal", code: "sn", flag: "sn.png" },
      { name: "Serbia", code: "rs", flag: "rs.png" },
      { name: "Singapore", code: "sg", flag: "sg.png" },
      { name: "Slovakia", code: "sk", flag: "sk.png" },
      { name: "Slovenia", code: "si", flag: "si.png" },
      { name: "South Africa", code: "za", flag: "za.png" },
      { name: "Spain", code: "es", flag: "es.png" },
      { name: "Sri Lanka", code: "lk", flag: "lk.png" },
      { name: "Sudan", code: "sd", flag: "sd.png" },
      { name: "Sweden", code: "se", flag: "se.png" },
      { name: "Switzerland", code: "ch", flag: "ch.png" },
      { name: "Syrian Arab Republic", code: "sy", flag: "sy.png" },
      { name: "Taiwan", code: "tw", flag: "tw.png" },
      { name: "Tanzania, United Republic of", code: "tz", flag: "tz.png" },
      { name: "Thailand", code: "th", flag: "th.png" },
      { name: "Togo", code: "tg", flag: "tg.png" },
      { name: "Trinidad and Tobago", code: "tt", flag: "tt.png" },
      { name: "Tunisia", code: "tn", flag: "tn.png" },
      { name: "Turkey", code: "tr", flag: "tr.png" },
      { name: "Uganda", code: "ug", flag: "ug.png" },
      { name: "Ukraine", code: "ua", flag: "ua.png" },
      { name: "United Arab Emirates", code: "ae", flag: "ae.png" },
      { name: "United Kingdom", code: "gb", flag: "gb.png" },
      { name: "United States", code: "us", flag: "us.png" },
      { name: "Uruguay", code: "uy", flag: "uy.png" },
      { name: "Uzbekistan", code: "uz", flag: "uz.png" },
      { name: "Venezuela", code: "ve", flag: "ve.png" },
      { name: "Vietnam", code: "vn", flag: "vn.png" },
      { name: "Yemen", code: "ye", flag: "ye.png" },
      { name: "Zambia", code: "zm", flag: "zm.png" },
      { name: "Zimbabwe", code: "zw", flag: "zw.png" },
    ],
    []
  );

  useEffect(() => {
    if (appSelect !== null) {
      handleClick(appSelect);
    }
  }, [appSelect]);

  // useEffect(() => {
  //   function setupautoComplete(iOSOuterBox) {
  //     let iOSautoCompleteTimer;
  //     const inputElement = iOSOuterBox.querySelector(".search-input");
  //     const appSearchCloseBtn = iOSOuterBox.querySelector(".close-search-form");
  //     inputElement.addEventListener("input", (event) => {
  //       if (event.target.value.trim() === "" && event.target.value.length < 1) {
  //         console.log("Keyword Not Found!");
  //         return false;
  //       }
  //       iOSOuterBox
  //         .querySelector(".searching-shimmer")
  //         .classList.remove("hidden");
  //       try {
  //         iOSOuterBox
  //           .querySelector(".suggestions")
  //           .classList.remove("format-suggestions");
  //       } catch {}
  //       try {
  //         //Hiding Contact form
  //         document
  //           .querySelector(".apple-ios-app_store")
  //           .classList.add("hidden");
  //       } catch {}
  //       try {
  //         appSearchCloseBtn.classList.add("hidden");
  //       } catch {}
  //       clearTimeout(iOSautoCompleteTimer);
  //       iOSautoCompleteTimer = setTimeout(function () {
  //         prepareDataForRequests(iOSOuterBox);
  //       }, 500);
  //     });
  //   }

  //   function encodingName(e) {
  //     return encodeURIComponent(e);
  //   }
  //   async function prepareDataForRequests(mainWorkingBox) {
  //     const inputElement = mainWorkingBox.querySelector(".search-input");
  //     const appSearchCloseBtn =
  //       mainWorkingBox.querySelector(".close-search-form");
  //     try {
  //       appSearchCloseBtn.classList.remove("hidden");
  //     } catch {}
  //     let currentNameIOS = inputElement.value;
  //     let currentNamePlay = encodingName(inputElement.value);
  //     let country = selectedCountryCode;
  //     // let country = mainWorkingBox
  //     //   .querySelector(".country-select-button")
  //     //   .getAttribute("country-code");
  //     if (currentNameIOS.trim().length < 2 && currentNameIOS.trim() === "") {
  //       mainWorkingBox.querySelector(".suggestions").innerHTML = "";
  //       return false;
  //     }
  //     const newKeyword = currentNameIOS.split(" ").join("+");
  //     const requestIOS = `https://itunes.apple.com/search?media=software&entity=software%2CiPadSoftware%2CsoftwareDeveloper&term=${newKeyword}&country=${country}&limit=30`;
  //     if (
  //       requestIOS.trim() ===
  //       `https://itunes.apple.com/search?media=software&entity=software%2CiPadSoftware%2CsoftwareDeveloper&term=&country=&limit=30`
  //     ) {
  //       mainWorkingBox.querySelector(".suggestions").innerHTML = "";
  //       return false;
  //     }
  //     let requestPlay = `https://store.maakeetoo.com/apps/search/?q=${currentNamePlay}&gl=${country}`;
  //     if (
  //       requestPlay.trim() ===
  //       `https://store.maakeetoo.com/apps/search/?q=&gl=${country}`
  //     ) {
  //       mainWorkingBox.querySelector(".suggestions").innerHTML = "";
  //       return false;
  //     }
  //     let listData = await handleRequestsAndProcessData(
  //       requestPlay,
  //       requestIOS
  //     );
  //     if (listData.length > 0) {
  //       mainWorkingBox.querySelector(".suggestions").innerHTML = "";
  //       mainWorkingBox
  //         .querySelector(".suggestions")
  //         .classList.add("format-suggestions");
  //     }
  //     mainWorkingBox
  //       .querySelector(".searching-shimmer")
  //       .classList.add("hidden");
  //     mainWorkingBox
  //       .querySelector(".suggestions")
  //       .insertAdjacentHTML("beforeend", listData.join(""));
  //   }

  //   function handleInstallRangeSliderFn(event) {
  //     const sliderValue = parseInt(event.target.value);
  //     event.target.nextSibling.innerHTML = sliderValue + " Days";
  //     const contentBox = event.target.closest(".app-info-display");
  //     const resultTextBox = contentBox.querySelector(".result-text-box");
  //     const ourSuggestionList = contentBox.querySelectorAll(
  //       ".review-suggestion-list li"
  //     );
  //     if (sliderValue <= 90) {
  //       ourSuggestionList[0].classList.remove("hidden");
  //       ourSuggestionList[1].classList.add("hidden");
  //       ourSuggestionList[2].classList.add("hidden");
  //     } else if (sliderValue <= 180) {
  //       ourSuggestionList[0].classList.remove("hidden");
  //       ourSuggestionList[1].classList.remove("hidden");
  //       ourSuggestionList[2].classList.add("hidden");
  //     } else {
  //       for (let li of ourSuggestionList) {
  //         li.classList.remove("hidden");
  //       }
  //     }
  //     const fullAppData = JSON.parse(localStorage.getItem("selectedAppData"));
  //     if (fullAppData.apple !== undefined) {
  //     } else {
  //       displayCalculatedInstallsToUser(
  //         resultTextBox,
  //         fullAppData.android,
  //         sliderValue
  //       );
  //     }
  //   }

  //   async function handleRequestsAndProcessData(requestPlay, requestIOS) {
  //     try {
  //       const response1 = await fetch(requestIOS);
  //       const response2 = await fetch(requestPlay);
  //       const iOSResponse = await response1.json();
  //       const playResponse = await response2.json();

  //       const mergedData = {
  //         iOSResponse: iOSResponse,
  //         playResponse: playResponse,
  //       };
  //       // console.log("Merged Data", mergedData);

  //       const fullAppData = mergedExtractedData(mergedData);
  //       const suggestionList = createListWithDevice(fullAppData);

  //       if (suggestionList.length > 0) {
  //         suggestionList.unshift('<p class="info-search">Search Results</p>');
  //         suggestionList.push(
  //           '<p class="info-search" style={{textAlign: "center"}}>Unable to locate your App? Try using your App ID or <Link href="#lp-contact">App URL</Link></p>'
  //         );
  //       }

  //       return suggestionList;
  //     } catch (error) {
  //       // console.error("Error:", error)
  //       return false;
  //     }
  //   }

  //   function createListWithDevice(data) {
  //     return data.map((item) => {
  //       if (item.appName !== undefined) {
  //         let deviceIcon;
  //         if (item.device == "apple")
  //           deviceIcon =
  //             "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f645042f50918e6e390f_app-store.svg";
  //         else
  //           deviceIcon =
  //             "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f644817f822625b18bb6_google-play-store.svg";
  //         return `<li class= "li-suggestion-item" application-url="${item.dataPackageUrl}" application-id="${item.appPackageId}" application-img-logo="${item.app_icon}" device="${item.device}"><div class="show-device-icon"><div class="li-suggestion-item-logo"><img src="${item.app_icon}" alt="app_icon" class="app-icon-li-item" /></div><div class="li-suggestion-item-info"><strong>${item.appName}</strong><span>${item.developer}</span></div></div></div> <div class="device-icon" device="${item.device}"><img src="${deviceIcon}" alt="device-logo" class="device-icon-logo"/></div></li>`;
  //       }
  //     });
  //   }

  //   function clearSearchBar(mainBoxHolder) {
  //     // console.log(mainBoxHolder);
  //     let inputBox = mainBoxHolder.querySelector(".search-input");
  //     inputBox.value = "";
  //     inputBox.removeAttribute("application-url");
  //     inputBox.removeAttribute("application-id");
  //     inputBox.removeAttribute("application-img-logo");
  //     try {
  //       mainBoxHolder
  //         .querySelector(".suggestions")
  //         .classList.remove("format-suggestions");
  //     } catch {}
  //     mainBoxHolder.querySelector(".suggestions").innerHTML = "";
  //   }

  //   function clearFormElement() {
  //     document.querySelector(".apple-ios-app_store").classList.add("hidden");
  //     const imageBox = document.querySelector("#iOS-form-logo");
  //     imageBox.src = "";
  //     imageBox.setAttribute("image-data", "");
  //   }

  //   function mergedExtractedData(rowData) {
  //     let appDataMain = [];
  //     let appDataA = [];
  //     let appDataP = [];
  //     rowData.iOSResponse.results.map((item) => {
  //       if (item.trackViewUrl) {
  //         let iosData = {
  //           dataPackageUrl: item.trackViewUrl,
  //           appPackageId: item.trackViewUrl.split("/")[5],
  //           app_icon: item.artworkUrl100,
  //           appName: item.trackName,
  //           developer: "By " + item.artistName,
  //           device: "apple",
  //           deviceIcon: "apple_icon.svg",
  //         };
  //         appDataA.push(iosData);
  //       }
  //     });
  //     rowData.playResponse.map((item) => {
  //       let playData = {
  //         dataPackageUrl:
  //           "https://play.google.com/store/apps/details?id=" + item.package_id,
  //         appPackageId: item.package_id,
  //         app_icon: item.app_icon,
  //         appName: item.title,
  //         developer: "By " + item.developer_name,
  //         device: "android",
  //         deviceIcon: "android_icon.svg",
  //       };
  //       appDataP.push(playData);
  //     });
  //     appDataA.map((app, index) => {
  //       appDataMain.push(appDataA[index]);
  //       if (appDataP[index]) {
  //         appDataMain.push(appDataP[index]);
  //       }
  //     });
  //     if (appDataA.length === 0) appDataMain = appDataP;
  //     return appDataMain;
  //   }

  //   setInterval(() => {
  //     const inputBox = document.querySelectorAll(".search-input");
  //     inputBox.forEach((input) => {
  //       if (input.value === "") {
  //         input
  //           .closest(".main-box-holder")
  //           .querySelector(".searching-shimmer")
  //           .classList.add("hidden");
  //       }
  //     });
  //   }, 500);
  //   // document.getElementById("search-bar-input1").focus();
  //   const iOSOuterBoxes = document.querySelectorAll(".main-box-holder");
  //   const closeSearchBtn = document.querySelectorAll(".close-search-form");
  //   closeSearchBtn.forEach((close) => {
  //     close.addEventListener("click", (event) => {
  //       event.target.classList.add("hidden");
  //       clearSearchBar(event.target.closest(".main-box-holder"));
  //       clearFormElement();
  //     });
  //   });
  //   iOSOuterBoxes.forEach((iOSOuterBox) => {
  //     setupautoComplete(iOSOuterBox);
  //   });
  // });

  // handle app selection
  const handleClick = (event) => {
    let { appPackageURL, applicationId, imageURL, device } =
      selectAppHandler(event);
    const country = selectedCountryCode;

    updateOtherSectionToSelectedApp(
      appPackageURL,
      applicationId,
      imageURL,
      device,
      country
    );
  };

  // function selectAppHandler(event) {
  //   const selectedLi = event.target.closest("li.li-suggestion-item");
  //   const mainBoxHolder = selectedLi.closest(".main-box-holder");
  //   return getDetailsOfSelectedLi(selectedLi, mainBoxHolder);
  // }

  // function getDetailsOfSelectedLi(selectedItem, mainBoxHolder) {
  //   const inputBox = mainBoxHolder.querySelector(".search-input");
  //   const keyword = inputBox.value;
  //   const country = mainBoxHolder
  //     .querySelector(".country-select-button")
  //     .getAttribute("country-code");
  //   const applicationId = selectedItem.getAttribute("application-id");
  //   const imageURL = selectedItem.getAttribute("application-img-logo");
  //   let appPackageURL = selectedItem.getAttribute("application-url");
  //   const device = selectedItem.getAttribute("device");
  //   const appName = selectedItem.querySelector(
  //     ".li-suggestion-item-info"
  //   ).innerHTML;
  //   if (device !== "apple")
  //     appPackageURL = appPackageURL.split("&gl=")[0] + "&gl=" + country;
  //   inputBox.setAttribute("application-id", applicationId);
  //   inputBox.setAttribute("application-img-logo", imageURL);
  //   inputBox.setAttribute("application-url", appPackageURL);
  //   inputBox.setAttribute("device", device);
  //   const appData = {
  //     packageName: appName,
  //     icon_urls: imageURL,
  //     "app-package-id": applicationId,
  //     "data-package-url": appPackageURL,
  //     device: device,
  //   };
  //   let oldAppData = localStorage.getItem("Recent Selected App");
  //   if (oldAppData) {
  //     let Array = JSON.parse(oldAppData);
  //     Array.unshift(appData);
  //     let uniqueArray = Array.filter(
  //       (item, index) =>
  //         Array.findIndex(
  //           (obj) => JSON.stringify(obj) === JSON.stringify(item)
  //         ) === index
  //     );
  //     localStorage.setItem("Recent Selected App", JSON.stringify(uniqueArray));
  //   } else {
  //     localStorage.setItem("Recent Selected App", JSON.stringify([appData]));
  //   }

  // if (device == "apple") {
  //   dataLayer.push({ "event": "ios_app_select", "keyword": keyword, "gtm.elementId": applicationId, "gtm.elementUrl": appPackageURL, "gtm.uniqueAnalyticsReports": "AnalyticsLiveWeb_nl" });
  // } else {
  //   dataLayer.push({ "event": "play_app_select", "keyword": keyword, "gtm.elementId": applicationId, "gtm.elementUrl": appPackageURL, "gtm.uniqueAnalyticsReports": "AnalyticsLiveWeb_nl" });
  // }
  //   try {
  //     mainBoxHolder
  //       .querySelector(".suggestions")
  //       .classList.remove("format-suggestions");
  //   } catch {}
  //   try {
  //     mainBoxHolder
  //       .querySelector(".close-search-form")
  //       .classList.remove("hidden");
  //   } catch {}
  //   return { appPackageURL, applicationId, imageURL, device };
  // }

  const [countryFlagImages, setCountryFlagImages] = useState({});
  useEffect(() => {
    const preloadImages = () => {
      const flagImages = {};
      countries.forEach((country) => {
        const img = new Image();
        img.src = `https://flagcdn.com/40x30/${country.flag}`;
        img.alt = country.name;
        img.classList.add("country-flags");
        flagImages[country.code] = img;
      });
      setCountryFlagImages(flagImages);
    };

    preloadImages();
  }, [countries]);

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
    // console.log("Country select btn", countrySelectBtn)
    const countrySelectBtn = document.querySelectorAll(
      ".country-select-button"
    );
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
    // document.querySelector("#custom-contact-btn").classList.add("hidden")
    // let pricingBtn = document.querySelector("#solutions")
    // pricingBtn.click()
    // pricingBtn.scrollIntoView({ behavior: "smooth" })
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

  // async function fetchAndStoreAppDataToBox(
  //   appPackageURL,
  //   applicationId,
  //   device,
  //   country
  // ) {
  //   if (device == "apple") {
  //     let result = await fetchAppleAppData(appPackageURL, country);
  //     const appData = JSON.stringify({ apple: result });
  //     localStorage.setItem("selectedAppData", appData);
  //     return result;
  //   } else {
  //     let result = await fetchPlayStoreAppData(applicationId, country);
  //     const appData = JSON.stringify({ android: result });
  //     localStorage.setItem("selectedAppData", appData);
  //     return result;
  //   }
  // }

  async function calculatePriceForSelectedApp(
    appPackageURL,
    applicationId,
    imageURL,
    device,
    mainBoxHolder
  ) {
    const search_keyword = mainBoxHolder.querySelector(".search-input").value;
    const country = mainBoxHolder
      .querySelector(".country-select-button")
      .getAttribute("country-code");
    // let outerSection = document.querySelector("#app-pricing-box_Pr")
    // let image = outerSection.querySelector("#App-Icon")
    // console.log("Image", image)
    // image.src = imageURL
    // image.setAttribute("image-data", appPackageURL)
    // outerSection.classList.remove("hidden")
    // let deviceIcon = outerSection.querySelector("#App-Platform")
    // const appName = outerSection.querySelector("#App-Name")
    // const appInfo = outerSection.querySelector("#App-Info")
    try {
      document.querySelector("#custom-contact-btn").classList.remove("hidden");
    } catch {}
    if (device.toLowerCase() == "apple") {
      const row_data = await fetchAppleAppData(appPackageURL, country);
      if (row_data) {
        // appName.innerHTML = row_data.trackCensoredName
        // appInfo.innerHTML =
        //   "&#11088; " +
        //   row_data.averageUserRating.toFixed(2) +
        //   ", " +
        //   row_data.primaryGenreName
        try {
          await handleAppleDeviceApp(
            deviceIcon,
            row_data,
            search_keyword,
            applicationId,
            appPackageURL
          );
        } catch (error) {
          // window.alert("Error:", error)
        }
      } else {
        window.alert("Warning! Please select the app from the dropdown menu.");
      }
    } else {
      const responseData = await fetchPlayStoreAppData(applicationId, country);
      if (responseData.url) {
        // appName.innerHTML = responseData.title
        // appInfo.innerHTML =
        // "&#11088; " +
        // parseFloat(responseData.score).toFixed(2) +
        // ", " +
        // responseData.genre
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
          // window.alert("Error:", error)
        }
      }
    }
  }

  // async function handlePlayStoreDeviceApp(
  //   deviceIcon,
  //   responseData,
  //   search_keyword,
  //   applicationId,
  //   appPackageURL,
  //   country
  // ) {
  //   deviceIcon.src =
  //     "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f644817f822625b18bb6_google-play-store.svg";
  //   let dataObject = getDataObjectForPlay(responseData);
  //   const MHRScore = await fetchMHRScore(applicationId, country);
  //   dataObject.MHR = MHRScore;
  //   const allParagraph = document.querySelectorAll(".feature-pointer");
  //   allParagraph[0].innerHTML =
  //     "Improve visitors - using keyword ranks and similar app section ML based rating improvement plan.";
  //   allParagraph[3].innerHTML =
  //     "Conversion improvement - by focusing on MHR score, A/B testing.";
  //   // const priceData = await fetchPriceData("https://nextgrowthlabs.com/wp-json/my-api/v1/play-price-request", dataObject);
  //   // updatePriceToPage(priceData, search_keyword, applicationId, appPackageURL);
  // }
  // async function fetchPlayStoreAppData(applicationId, t) {
  //   const url = `https://store.maakeetoo.com/apps/details/?id=${applicationId}&gl=${t}`;
  //   try {
  //     const response = await fetch(url);
  //     return await response.json();
  //   } catch (error) {
  //     throw new Error(`Error fetching Play Store app data: ${error}`);
  //   }
  // }

  // function getDataObjectForPlay(responseData) {
  //   let dataObject = {
  //     Score:
  //       parseFloat(responseData.score).toFixed(1) < 1.0
  //         ? 1.2
  //         : responseData.score,
  //     DownloadEstimate: responseData.maxInstalls,
  //     ImageCount: responseData.screenshots.length,
  //     VideoPresent: responseData.video ? true : false,
  //     Size: responseData.size || 123456,
  //     MHR: 20,
  //   };
  //   return dataObject;
  // }
  // async function fetchMHRScore(applicationId, country) {
  //   const url = `https://store.maakeetoo.com/apps/mhr-score/?id=${applicationId}&gl=${country}`;
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     const todayDate = new Date();
  //     todayDate.setDate(todayDate.getDate() - 1);
  //     const yesterdayDate = todayDate.toISOString().substr(0, 10);
  //     const entry = data.find((entry) => entry.date === yesterdayDate);
  //     return entry ? entry.score : 30;
  //   } catch (error) {
  //     throw new Error(`Error fetching MHR score: ${error}`);
  //   }
  // }

  // function showResponseToAllSmallBox(response, device, AllMainBoxHolder) {
  //   for (let mainBoxHolder of AllMainBoxHolder) {
  //     const searchBoxHolder = mainBoxHolder.closest(".search-box_holder");
  //     const contentBox = mainBoxHolder
  //       .closest(".app-search-box-holder")
  //       .querySelector(".app-info-display");
  //     if (contentBox.classList.contains("mhr")) {
  //       handleDataForConversion(response, device, contentBox);
  //     } else if (contentBox.classList.contains("ctr")) {
  //       handleDataForCTR(response, device, contentBox);
  //     } else {
  //       handleDataForInstalls(response, device, contentBox);
  //     }
  //     searchBoxHolder.style.display = "none";
  //     contentBox.classList.remove("hidden");
  //   }
  // }
  // function handleDataForConversion(result, device, contentBox) {
  //   if (device == "apple") {
  //     displayAppleDataToRelatedBox(result, contentBox);
  //     calculateTheSentenceResponseForApple(result, contentBox);
  //   } else {
  //     displayPlayDataToRelatedBox(result, contentBox);
  //     calculateTheSentenceResponseForPlay(result, contentBox);
  //   }
  // }
  // function handleDataForCTR(result, device, contentBox) {
  //   if (device == "apple") {
  //     displayAppleDataToRelatedBox(result, contentBox);
  //     displayReviewsAndRatingToBox(result.averageUserRating, contentBox);
  //   } else {
  //     displayPlayDataToRelatedBox(result, contentBox);
  //     displayReviewsAndRatingToBox(result.score, contentBox);
  //   }
  // }
  // function handleDataForInstalls(result, device, contentBox) {
  //   if (device == "apple") {
  //     displayAppleDataToRelatedBox(result, contentBox);
  //     displayMilestoneDataApple(result, contentBox);
  //   } else {
  //     displayPlayDataToRelatedBox(result, contentBox);
  //     displayMilestoneDataPlay(result, contentBox);
  //   }
  // }
  // async function fetchAndStoreAppDataToBox(
  //   appPackageURL,
  //   applicationId,
  //   device,
  //   country
  // ) {
  //   if (device == "apple") {
  //     let result = await fetchAppleAppData(appPackageURL, country);
  //     const appData = JSON.stringify({ apple: result });
  //     localStorage.setItem("selectedAppData", appData);
  //     return result;
  //   } else {
  //     let result = await fetchPlayStoreAppData(applicationId, country);
  //     const appData = JSON.stringify({ android: result });
  //     localStorage.setItem("selectedAppData", appData);
  //     return result;
  //   }
  // }

  // function displayMilestoneDataPlay(result, contentBox) {
  //   const minInstalls = result.minInstalls;
  //   const maxInstalls = calculateNextMilestone(minInstalls);
  //   const mileStoneBox = contentBox.querySelector(".milestones-images");
  //   mileStoneBox.parentNode.classList.remove("hidden");
  //   const mileStoneInstallCurrent = contentBox.querySelector(
  //     ".current-milestone span"
  //   );
  //   mileStoneInstallCurrent.innerHTML = formatReadableNumber(minInstalls);
  //   const mileStoneInstallNext = contentBox.querySelector(
  //     ".next-milestone span"
  //   );
  //   mileStoneInstallNext.innerText = formatReadableNumber(maxInstalls);
  //   const sliderBox = contentBox.querySelector(".range-slider-box");
  //   sliderBox.parentNode.classList.remove("hidden");
  //   const slider = sliderBox.querySelector("input");
  //   slider.value = 180;
  //   slider.nextSibling.innerHTML = "180";
  //   const resultBox = contentBox.querySelector(".result-text-box");
  //   displayCalculatedInstallsToUser(resultBox, result, 180);
  //   const listLi = contentBox.querySelectorAll(".review-suggestion-list li");
  //   listLi[0].classList.remove("hidden");
  //   listLi[1].classList.remove("hidden");
  //   listLi[2].classList.add("hidden");
  // }

  // function displayCalculatedInstallsToUser(box, appData, sliderValue) {
  //   const maxInstalls = calculateNextMilestone(appData.minInstalls);
  //   const exactInstalls = appData.maxInstalls;
  //   const result = (maxInstalls - exactInstalls) / sliderValue;
  //   const formattedResult = result.toFixed(0);
  //   box.querySelector("h5").innerHTML =
  //     "To achieve the target, you need to attain " +
  //     Number(formattedResult).toLocaleString() +
  //     " installs daily for the next " +
  //     sliderValue +
  //     " days.";
  //   box.classList.remove("hidden");
  // }

  // function displayMilestoneDataApple(result, contentBox) {
  //   const mileStone = contentBox.querySelector(".milestones-images");
  //   mileStone.parentNode.classList.add("hidden");
  //   const sliderBox = contentBox.querySelector(".range-slider-box");
  //   sliderBox.parentNode.classList.add("hidden");
  //   const resultBox = contentBox.querySelector(".result-text-box");
  //   resultBox.classList.add("hidden");
  //   const listLi = contentBox.querySelectorAll(".review-suggestion-list li");
  //   for (let li of listLi) {
  //     li.classList.remove("hidden");
  //   }
  // }
  // function calculateNextMilestone(number) {
  //   const thresholds = [
  //     100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000,
  //     10000000, 50000000, 100000000, 500000000, 1000000000, 5000000000,
  //     10000000000, 50000000000,
  //   ];
  //   for (let threshold of thresholds) {
  //     if (number < threshold) {
  //       return threshold;
  //     }
  //   }
  //   return number * 5;
  // }
  // function formatReadableNumber(number) {
  //   if (number < 1e3) {
  //     return number;
  //   } else if (number < 1e6) {
  //     return (number / 1e3).toFixed(1) + "K";
  //   } else if (number < 1e9) {
  //     return (number / 1e6).toFixed(1) + "M";
  //   } else if (number < 1e12) {
  //     return (number / 1e9).toFixed(1) + "B";
  //   } else if (number < 1e15) {
  //     return (number / 1e15).toFixed(1) + "T";
  //   } else {
  //     return number;
  //   }
  // }
  // async function calculateTheSentenceResponseForPlay(result, contentBox) {
  //   const images = result.screenshots.length;
  //   const video = result.video == undefined ? 1 : 2;
  //   const urlParams = new URLSearchParams(result.url);
  //   const appId = result.url.split("id=")[1].split("&")[0];
  //   const country = urlParams.get("gl");
  //   const mhrScore = await fetchMHRScore(appId, country);
  //   displayImproveConversionSentence(images, video, mhrScore, contentBox);
  // }
  // async function calculateTheSentenceResponseForApple(result, contentBox) {
  //   const images = result.screenshotUrls.length;
  //   const jpgCount = result.screenshotUrls.filter(
  //     (url) =>
  //       url.toLowerCase().endsWith(".jpg") ||
  //       url.toLowerCase().endsWith(".webp")
  //   ).length;
  //   const video = images === jpgCount ? 1 : 2;
  //   const mhrScore = await fetchMHRScoreApple(
  //     result.trackId,
  //     result.trackViewUrl.split("/")[3]
  //   );
  //   displayImproveConversionSentence(images, video, mhrScore, contentBox);
  // }
  // function displayImproveConversionSentence(
  //   images,
  //   video,
  //   mhrScore,
  //   contentBox
  // ) {
  //   const image = images <= 4 ? 0 : images < 8 ? 1 : 2;
  //   const mhr = mhrScore <= 40 ? 0 : mhrScore < 80 ? 1 : 2;
  //   const imagesSArray = [
  //     "Nice that you have added " +
  //       images +
  //       " Screenshots. Please ensure that your screenshots capture the core features and experience of your app or game. It is recommended that you add upto 8 screenshots per device type",
  //     "Great work adding " +
  //       images +
  //       " screenshots. but Including all eight screenshots per device type can provide a comprehensive view of the app's functionality, features, and user interface.",
  //     "That's Awesome, you have used " +
  //       images +
  //       " screenshots.This would also increases the chances of effectively communicating the app's value proposition by showcasing various aspects and functionalities.",
  //   ];
  //   const videoSArray = [
  //     "",
  //     "Utilizing a video to showcase an app's value proposition offers users a preview of what to expect. A Video should highlights distinctive features, achievements, and provides insight into the user interface.",
  //     "Great! Work Adding Video to your Store listing. But Make Sure your video highlights distinctive features and provides insight into the user interface.",
  //   ];
  //   const mhrSArray = [
  //     "MHR Score is " +
  //       mhrScore +
  //       ", This is not good for your ASO strategy. You are losing Installs on your app.",
  //     "MHR Score is " +
  //       mhrScore +
  //       ", Which is causing impact on your conversion Matrices. Having 80+ MHR Can Increase you conversion by 3%-5% from baseline",
  //     "That's Nice your MHR Score is " +
  //       mhrScore +
  //       ", Having good MHR Score is reflected upon your overall conversion metrics.",
  //   ];
  //   const listLi = contentBox.querySelectorAll(
  //     ".conversion-suggestion-list li"
  //   );
  //   listLi[0].innerHTML = imagesSArray[image];
  //   listLi[1].innerHTML = videoSArray[video];
  //   listLi[2].innerHTML = mhrSArray[mhr];
  //   const cList = ["bad", "mid", "none"];
  //   for (let li of listLi) {
  //     li.classList.remove(cList[0]);
  //     li.classList.remove(cList[1]);
  //     li.classList.remove(cList[2]);
  //   }
  //   listLi[0].classList.add(cList[image]);
  //   listLi[1].classList.add(cList[video]);
  //   listLi[2].classList.add(cList[mhr]);
  // }
  // function displayReviewsAndRatingToBox(rating, contentBox) {
  //   const slider = contentBox.querySelector(".range-slider-box input");
  //   slider.value = rating.toFixed(1);
  //   slider.setAttribute("min-value", rating.toFixed(1));
  //   const sliderText = contentBox.querySelector(".range-slider-box strong");
  //   sliderText.innerHTML = rating.toFixed(1);
  //   const mileStoreRating = contentBox.querySelector(".current-milestone span");
  //   mileStoreRating.innerHTML = rating.toFixed(1);
  //   contentBox.querySelector(".result-text-box").classList.add("hidden");
  //   const listLi = contentBox.querySelectorAll(".review-suggestion-list li");
  //   for (let li of listLi) {
  //     li.classList.add("hidden");
  //   }
  // }
  // function displayAppleDataToRelatedBox(data, contentBox) {
  //   const image = contentBox.querySelector(".app-img-box img");
  //   image.src = data.artworkUrl100;
  //   image.alt = data.trackName;
  //   const appName = contentBox.querySelector(".app-information h4");
  //   appName.innerHTML = `<a href="${data.trackViewUrl}" target="_blank">${data.trackName}</a>`;
  //   const rating = contentBox.querySelector(".app-information div strong");
  //   rating.innerHTML = data.averageUserRating.toFixed(2);
  //   const genre = contentBox.querySelector(".app-information div em");
  //   genre.innerHTML = " " + data.primaryGenreName;
  //   const dName = contentBox.querySelector(".app-developer-name");
  //   dName.innerHTML = "By " + data.artistName;
  // }
  // function displayPlayDataToRelatedBox(data, contentBox) {
  //   const image = contentBox.querySelector(".app-img-box img");
  //   image.src = data.icon;
  //   image.alt = data.title;
  //   const appName = contentBox.querySelector(".app-information h4");
  //   appName.innerHTML = `<a href="${data.url}"  target="_blank"> ${data.title}</a >`;
  //   const rating = contentBox.querySelector(".app-information div strong");
  //   rating.innerHTML = (() => {
  //     try {
  //       return data.score.toFixed(2);
  //     } catch (error) {
  //       data.score = 0.0;
  //       return 0.0;
  //     }
  //   })();
  //   const genre = contentBox.querySelector(".app-information div em");
  //   genre.innerHTML = " " + data.genre;
  //   const dName = contentBox.querySelector(".app-developer-name");
  //   dName.innerHTML = "By " + data.developer;
  // }
  // async function fetchMHRScoreApple(appId, country) {
  //   const url =
  //     "https://nextgrowthlabs.com/wp-json/my-api/v1/mhr-ios/?appId=" +
  //     appId +
  //     "&country=" +
  //     country;
  //   let response = await fetch(url);
  //   const result = await response.json();
  //   if (result.score) {
  //     return result.score;
  //   } else {
  //     return 30;
  //   }
  // }
  // // fetch apple data
  // async function fetchAppleAppData(appPackageURL, t) {
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };
  //   const regex = /\/id(\d+)/;
  //   const id = appPackageURL.match(regex)[1];
  //   const requestURL = `https://itunes.apple.com/lookup?id=${id}&country=${t}`;
  //   try {
  //     const response = await fetch(requestURL, requestOptions);
  //     const data = await response.json();
  //     return data["results"][0];
  //   } catch (error) {
  //     throw new Error(`Error fetching Apple app data: ${error}`);
  //   }
  // }

  // async function handleAppleDeviceApp(
  //   deviceIcon,
  //   row_data,
  //   search_keyword,
  //   applicationId,
  //   appPackageURL
  // ) {
  //   const allParagraph = document.querySelectorAll(".feature-pointer");
  //   try {
  //     allParagraph[2].parentNode.classList.add("hidden");
  //     allParagraph[5].parentNode.classList.add("hidden");
  //   } catch {}
  //   deviceIcon.src =
  //     "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f645042f50918e6e390f_app-store.svg";
  //   const dataObject = getDataObjectForApple(row_data);
  //   allParagraph[0].innerHTML =
  //     "Improve visitors - using keyword ranks and ML based keyword field recommendations.";
  //   allParagraph[3].innerHTML =
  //     "Conversion improvement - by focusing on A/B testing with app Metadata. i.e. Title, Description, etc.";
  //   // const priceData = await fetchPriceData("https://nextgrowthlabs.com/wp-json/my-api/v1/apple-price-request", dataObject);
  //   // updatePriceToPage(priceData, search_keyword, applicationId, appPackageURL);
  // }
  // // handle click outside
  // const appSuggestionRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       appSuggestionRef.current &&
  //       !appSuggestionRef.current.contains(event.target)
  //     ) {
  //       const suggestion =
  //         appSuggestionRef.current.querySelector(".suggestions");
  //       if (suggestion) {
  //         suggestion.classList.remove("format-suggestions");
  //       }
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

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
                // e.preventDefault()
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

                    <div
                      // ref={appSuggestionRef}
                      className="app-search-box-holder margin-top new-height mobile"
                    >
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
                                      setRecentAppsVisible((prev) => {
                                        return {
                                          ...prev,
                                          ["suggestions-box6"]: true,
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
                                          ["search-box6"]: true,
                                        };
                                      });
                                    }}
                                    // remove this once we move to the app select functionality
                                    onBlur={() => {
                                      setSearchAppVisible({});
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
                                  {/* <div
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
                                  </div> */}
                                  {/* <ul
                                    id="suggestions-box6"
                                    className="suggestions"
                                    // onClick={e => handleClick(e)}
                                  ></ul> */}
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
                // e.preventDefault()
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

                    <div
                      // ref={appSuggestionRef}
                      className="app-search-box-holder margin-top new-height mobile"
                    >
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
                                      setRecentAppsVisible((prev) => {
                                        return {
                                          ...prev,
                                          ["suggestions-box7"]: true,
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
                                          ["search-box7"]: true,
                                        };
                                      });
                                    }}
                                    // remove this once we move to the app select functionality
                                    onBlur={() => {
                                      setSearchAppVisible({});
                                    }}
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
                                  {/* <div
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
                                  </div> */}
                                  {/* <ul
                                    id="suggestions-box7"
                                    className="suggestions"
                                    // onClick={e => handleClick(e)}
                                  ></ul> */}
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
                // e.preventDefault()
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
                    <div
                      // ref={appSuggestionRef}
                      className="app-search-box-holder margin-top new-height mobile"
                    >
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
                                      setRecentAppsVisible((prev) => {
                                        return {
                                          ...prev,
                                          ["suggestions-box8"]: true,
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
                                          ["search-box8"]: true,
                                        };
                                      });
                                    }}
                                    // remove this once we move to the app select functionality
                                    onBlur={() => {
                                      setSearchAppVisible({});
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
                                  {/* <div
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
                                  </div> */}
                                  {/* <ul
                                    id="suggestions-box8"
                                    className="suggestions"
                                    // onClick={e => handleClick(e)}
                                  ></ul> */}
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
                                setSelectedCountryCode={setSelectedCountryCode}
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
                <div
                  // ref={appSuggestionRef}
                  className="app-search-box-holder margin-top new-height"
                >
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
                                  setRecentAppsVisible((prev) => {
                                    return {
                                      ...prev,
                                      ["suggestions-box2"]: true,
                                    };
                                  });
                                }}
                                onChange={(e) => {
                                  console.log("search input triggered");
                                  if (e.target.value.trim().length === 0) {
                                    setRecentAppsVisible({});
                                    setSearchAppVisible({});
                                  }
                                  setRecentAppsVisible({});
                                  setSearchAppKeyword(e.target.value);
                                  setSearchAppVisible((prev) => {
                                    return {
                                      ...prev,
                                      ["search-box2"]: true,
                                    };
                                  });
                                }}
                                // remove this once we move to the app select functionality
                                onBlur={() => {
                                  setSearchAppVisible({});
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
                              {/* <div
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
                              </div> */}
                              {/* <ul
                                id="suggestions-box2"
                                className="suggestions"
                                onClick={(e) => handleClick(e)}
                              ></ul> */}
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
                <div
                  // ref={appSuggestionRef}
                  className="app-search-box-holder margin-top new-height"
                >
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
                                  setRecentAppsVisible((prev) => {
                                    return {
                                      ...prev,
                                      ["suggestions-box3"]: true,
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
                                      ["search-box3"]: true,
                                    };
                                  });
                                }}
                                // remove this once we move to the app select functionality
                                onBlur={() => {
                                  setSearchAppVisible({});
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
                              {/* <div
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
                              </div> */}
                              {/* <ul
                                id="suggestions-box3"
                                className="suggestions"
                                onClick={(e) => handleClick(e)}
                              ></ul> */}
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
                <div
                  // ref={appSuggestionRef}
                  className="app-search-box-holder margin-top new-height"
                >
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
                                  setRecentAppsVisible((prev) => {
                                    return {
                                      ...prev,
                                      ["suggestions-box4"]: true,
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
                                      ["search-box4"]: true,
                                    };
                                  });
                                }}
                                // remove this once we move to the app select functionality
                                onBlur={() => {
                                  setSearchAppVisible({});
                                }}
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
                              {/* <div
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
                              </div> */}
                              {/* <ul
                                id="suggestions-box4"
                                className="suggestions"
                                onClick={(e) => handleClick(e)}
                              ></ul> */}
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
