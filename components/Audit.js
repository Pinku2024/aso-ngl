import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
const Audit = () => {
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
        iOSappSearchCloseBtn.classList.remove("hidden");
      } catch {}
      let currentNameIOS = inputElement.value;
      let currentNamePlay = encodingName(inputElement.value);
      let country = mainWorkingBox
        .querySelector(".country-select-button")
        .getAttribute("country-code");
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
        let request1 = $.ajax({
          url: requestIOS,
          method: "GET",
          dataType: "json",
          redirect: "follow",
        });
        let request2 = $.ajax({
          url: requestPlay,
          method: "GET",
          dataType: "json",
          redirect: "follow",
        });
        const response1 = await $.when(request1);
        const response2 = await $.when(request2);
        let mergedData = {
          iOSResponse: await response1,
          playResponse: await response2,
        };
        let fullAppData = mergedExtractedData(mergedData);
        const suggestionList = createListWithDevice(fullAppData);
        if (suggestionList.length > 0) {
          suggestionList.unshift(
            '<p className= "info-search">Search Results</p>'
          );
          suggestionList.push(
            '<p className= "info-search" style={{text-align:"center"}}>Unable to locate your App? Try using your App ID or <Link href="#lp-contact">App URL</Link></p>'
          );
        }
        return suggestionList;
      } catch (error) {
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
          return `<li className= "li-suggestion-item" application-url="${item.dataPackageUrl}" application-id="${item.appPackageId}" application-img-logo="${item.app_icon}" device="${item.device}"><div className="show-device-icon"><div className="li-suggestion-item-logo"><img src="${item.app_icon}" alt="app_icon" className="app-icon-li-item" /></div><div className="li-suggestion-item-info"><strong>${item.appName}</strong><span>${item.developer}</span></div></div></div> <div className="device-icon" device="${item.device}"><img src="${deviceIcon}" alt="device-logo" className="device-icon-logo"/></div></li>`;
        }
      });
    }
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
        localStorage.setItem(
          "Recent Selected App",
          JSON.stringify(uniqueArray)
        );
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

    const countries = [
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
    ];

    // Preload images
    const countryFlagImages = {};
    countries.forEach((country) => {
      const img = (
        <Image
          className="country-flags"
          height={30}
          width={40}
          src={`https://flagcdn.com/40x30/${country.flag}`}
          alt={country.name}
        />
      );
      // img.src = `https://flagcdn.com/40x30/${country.flag}`;
      // img.alt = country.name;
      // img.classList.add("country-flags");
      countryFlagImages[country.code] = img;
    });
    // let li = `<li onclick="updateSelectedCountryName(this)" className="${isSelected}" country-code="${country.code}"><img src="${countryFlagImages[country.code].src}" alt="${country.name}" className="country-flags"/>${country.name}</li>`;
    function addCountryToSelectedBox(optionsInput, selectedCountry) {
      const mainSelectBtn = optionsInput
        .closest(".country-selection-box")
        .querySelector(".country-select-button");
      const result = mainSelectBtn.offsetWidth > 200 ? true : false;
      optionsInput.innerHTML = "";
      countries.forEach((country) => {
        let isSelected = country.code == selectedCountry ? "selected" : "";
        // Create li element
        let li = document.createElement("li");
        li.className = isSelected;
        li.setAttribute("country-code", country.code);
        li.setAttribute("country-name", country.name);
        // Append existing country flag image
        let img = countryFlagImages[country.code].cloneNode(true);
        li.appendChild(img);
        let nameSpan = document.createElement("span");
        nameSpan.textContent = result
          ? country.name
          : country.code.toUpperCase();
        li.appendChild(nameSpan);
        // Set up click event
        li.addEventListener("click", function () {
          updateSelectedCountryName(this);
        });
        // Append li to optionsInput
        optionsInput.appendChild(li);
      });
    }
    function initCountryOnEvent(event) {
      event.currentTarget.removeEventListener("mousemove", initCountryOnEvent);
      event.currentTarget.removeEventListener("touchstart", initCountryOnEvent);
      initializeCountryToBox();
    }
    function initializeCountryToBox() {
      if (window.initCountries) {
        return false;
      }
      window.initCountries = true;
      countrySelectBtn.forEach((button) => {
        const contentBox = button.parentNode.querySelector(".content-country"),
          searchInput = contentBox.querySelector("input"),
          optionsInput = contentBox.querySelector(".options");
        addCountryToSelectedBox(optionsInput);
      });
    }
    function updateSelectedCountryName(selectedLi) {
      let cNameOuterBox = selectedLi.closest(".content-country.active");
      mainSelectBtn = selectedLi
        .closest(".country-selection-box")
        .querySelector(".country-select-button");
      let code = selectedLi.getAttribute("country-code");
      let name = selectedLi.getAttribute("country-name");
      selectedLi.closest(".content-country").querySelector("input").value = "";
      addCountryToSelectedBox(selectedLi.parentNode, code);
      cNameOuterBox.classList.remove("active");
      mainSelectBtn.classList.remove("active");
      let spanText =
        mainSelectBtn.offsetWidth > 200 ? name : code.toUpperCase();
      mainSelectBtn.firstElementChild.innerHTML =
        selectedLi.querySelector("img").outerHTML + spanText;
      mainSelectBtn.setAttribute("country-code", code);
      mainSelectBtn.setAttribute("country-name", name);
      try {
        const closeBtn = mainSelectBtn
          .closest(".main-box-holder")
          .querySelector(".close-search-form");
        closeBtn.classList.add("hidden");
      } catch {}
      if (
        mainSelectBtn.closest(".main-box-holder").querySelector(".search-input")
          .value.length > 0
      )
        prepareDataForRequests(mainSelectBtn.closest(".main-box-holder"));
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
    function displayAppRelatedBox(packageURL, packageId, appLogo, device) {
      if (appLogo !== undefined && packageURL !== undefined) {
        const contactBoxOuter = document.querySelector(".apple-ios-app_store");
        const imageBox = contactBoxOuter.querySelector("#iOS-form-logo");
        imageBox.src = appLogo;
        imageBox.setAttribute("image-data", packageURL);
        contactBoxOuter.classList.remove("hidden");
        let form = contactBoxOuter.querySelector("#wf-form-ContactUsForm2");
        contactBoxOuter.querySelector(
          ".success-message.w-form-done"
        ).style.display = "none";
        contactBoxOuter.querySelector(
          ".error-message.w-form-fail"
        ).style.display = "none";
        form.style.display = "block";
        form.querySelector("#Message2").value = "";
        let deviceIcon;
        if (device == "apple")
          deviceIcon =
            "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f645042f50918e6e390f_app-store.svg";
        else
          deviceIcon =
            "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f644817f822625b18bb6_google-play-store.svg";
        let plateFormLogo = document.querySelector("#Platform-form-logo");
        plateFormLogo.src = deviceIcon;
      } else {
        window.alert("Warning! Please select the app from the dropdown menu.");
      }
    }

    const getAuditAppBtn = document.querySelector("#Audit-App-button");
    getAuditAppBtn.addEventListener("click", (event) => {
      const mainBoxHolder = event.target.closest(".main-box-holder");
      let fullListData = mainBoxHolder.querySelector(".suggestions");
      const inputBox = mainBoxHolder.querySelector(".search-input");
      let packageURL = inputBox.getAttribute("application-url");
      let appLogoURL = inputBox.getAttribute("application-img-logo");
      let device = inputBox.getAttribute("device");
      if (packageURL) {
        if (
          packageURL.trim() === "" ||
          packageURL === undefined ||
          appLogoURL.trim() === "" ||
          appLogoURL === undefined
        ) {
          window.alert(
            "Warning! Enter the keyword and App ID in the search box"
          );
          return false;
        } else {
          displayAppRelatedBox(
            packageURL,
            inputBox.getAttribute("application-id"),
            appLogoURL,
            device
          );
          iOSappSearchCloseBtn.classList.remove("hidden");
        }
      } else if (fullListData.querySelector("li.li-suggestion-item")) {
        fullListData.classList.add("format-suggestions");
      } else {
        inputBox.value = "Top apps";
        inputBox.focus();
        prepareDataForRequests(getAuditAppBtn.closest(".main-box-holder"));
        inputBox.value = "";
        let intervalId = setInterval(() => {
          let p = fullListData.querySelector(".info-search");
          if (p) {
            p.innerText = "Popular Apps";
            clearInterval(intervalId);
          }
        }, 50);
      }
    });

    // focus code
    document.getElementById("search-bar-input1").focus();

    document
      .getElementById("wf-form-ContactUsForm2")
      .addEventListener("submit", mySubmit);

    function getUserLocation(data) {
      let countryCode = data.country_code;
      let countryName = data.country_name;
      countrySelectBtn.forEach((btn) => {
        const result = btn.offsetWidth > 200 ? true : false;
        let name = result ? countryName : countryCode;
        btn.setAttribute("country-code", countryCode.toLowerCase());
        btn.setAttribute("country-name", countryName);
        btn.firstElementChild.innerHTML =
          '<img src="https://flagcdn.com/40x30/' +
          countryCode.toLowerCase() +
          '.png" alt="' +
          countryName +
          '" loading="eager" class="country-flags">' +
          name;
      });
    }
    // $.get("https://ipapi.co/jsonp/", getUserLocation, "jsonp");

    let customPricingBtn = document.querySelector("#get-custom-pricing-btn");
    customPricingBtn.addEventListener("click", () => {
      let pricingBtn = document.querySelector("#w-tabs-1-data-w-tab-1");
      pricingBtn.click();
      let image = document.querySelector("#iOS-form-logo");
      const imageURL = image.src;
      const appPackageURL = image.getAttribute("image-data");
      let device = "android";
      let applicationId = appPackageURL.split("=")[1];
      if (appPackageURL.split("/")[2].split(".")[1] == "apple") {
        device = "apple";
        let regex = /\/id(\d+)/;
        applicationId = appPackageURL.match(regex)[1];
      }
      countrySelectBtnPr.innerHTML = countrySelectBtnIOS.innerHTML;
      calculatePriceForSelectedApp(
        appPackageURL,
        applicationId,
        imageURL,
        device,
        document.querySelector("#search-box1")
      );
      document.querySelector("#custom-contact-btn").classList.add("hidden");
      pricingBtn.scrollIntoView({ behavior: "smooth" });
      try {
        appSearchCloseBtn.classList.remove("hidden");
      } catch {}
    });

    setInterval(() => {
      const inputBox = document.querySelectorAll(".search-input");
      inputBox.forEach((input) => {
        if (input.value === "") {
          input
            .closest(".main-box-holder")
            .querySelector(".searching-shimmer")
            .classList.add("hidden");
        }
      });
    }, 500);
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

    const countrySelectBtn = document.querySelectorAll(
      ".country-select-button"
    );
    countrySelectBtn.forEach((button) => {
      const contentBox = button.parentNode.querySelector(".content-country"),
        searchInput = contentBox.querySelector("input"),
        optionsInput = contentBox.querySelector(".options");
      // console.log(searchInput, optionsInput);
      document.addEventListener("mousemove", initCountryOnEvent);
      document.addEventListener("touchstart", initCountryOnEvent);
    });
    countrySelectBtn.forEach((button) => {
      const contentBox = button.parentNode.querySelector(".content-country"),
        searchInput = contentBox.querySelector("input"),
        optionsInput = contentBox.querySelector(".options");
      button.addEventListener("click", () => {
        // Deactivate all buttons
        countrySelectBtn.forEach((otherButton) => {
          if (otherButton !== button) {
            otherButton.classList.remove("active");
            otherButton.parentNode
              .querySelector(".content-country")
              .classList.remove("active");
          }
        });
        // activate the button
        button.classList.toggle("active");
        contentBox.classList.toggle("active");
        if (contentBox) {
          let parentElement = contentBox.parentElement;
          parentElement.classList.add("active-parent");
          button
            .closest(".main-box-holder")
            .querySelector(".suggestions")
            .classList.remove("format-suggestions");
          // contentBox.parentNode.parentNode.parentNode.querySelector(".suggestions").classList.remove("format-suggestions");
        }
      });
      searchInput.addEventListener("keyup", (event) => {
        const countrySelectBtn = event.target
          .closest(".country-selection-box")
          .querySelector(".country-select-button");
        const result = countrySelectBtn.offsetWidth > 200 ? true : false;
        let arr = [];
        let searchWord = searchInput.value.toLowerCase();
        arr = countries
          .filter((data) => {
            const lowercaseName = data.name.toLowerCase();
            const lowercaseCode = data.code.toLowerCase();
            const lowercaseSearchWord = searchWord.toLowerCase();
            return (
              lowercaseName.startsWith(lowercaseSearchWord) ||
              lowercaseCode.startsWith(lowercaseSearchWord)
            );
          })
          .map((data) => {
            let isSelected =
              data.code == button.getAttribute("country-code")
                ? "selected"
                : "";
            let name = result ? data.name : data.code.toUpperCase();
            return `<li onclick="updateSelectedCountryName(this)" class="${isSelected}" country-code="${
              data.code
            }" country-name="${data.name}">${
              countryFlagImages[data.code].outerHTML
            } ${name}</li>`;
          })
          .join("");
        optionsInput.innerHTML = arr
          ? arr
          : `<p style="margin-top: 10px;">Oops! Country not found</p>`;
      });
    });
  });
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
                            autocomplete="off"
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
                              viewbox="0 0 16 16"
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
                          ></ul>
                        </div>
                      </div>
                      <div className="country-selection-box">
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
                              viewbox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                              ></path>
                            </svg>
                          </i>
                        </div>
                        <div className="country-search-box">
                          <div className="content-country" id="content-box1">
                            <div className="search">
                              <input
                                spellcheck="false"
                                autocomplete="off"
                                type="text"
                                placeholder="Search"
                                id="country-search-input"
                              />
                            </div>
                            <ul className="options"></ul>
                          </div>
                        </div>
                      </div>
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
                          <label for="name-2">Full Name</label>
                          <input
                            className="input-4 w-input"
                            maxlength="256"
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
                          <label for="Emailaddress">Email Address</label>
                          <input
                            className="input-4 w-input"
                            maxlength="256"
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
                          <label for="Phone" className="field-label">
                            Phone
                          </label>
                          <input
                            className="input-2 w-input"
                            maxlength="256"
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
                          <label for="Message-2">Message</label>
                          <textarea
                            id="Message2"
                            name="Message-2"
                            maxlength="5000"
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
      <div
        data-w-id="13ce6919-8d5a-7d43-7f33-1e18cf5ac44c"
        style={{ opacity: 1 }}
        className="partner-container spacing-partner"
      >
        <div className="heading-wrapper">
          <h2 className="sub-titile_new-2">Some of our clients</h2>
        </div>
      </div>
      <div className="section-logo-marquee padding-horizontal-vertical">
        <div className="marquee">
          <div className="marquee-content scroll">
            <img
              src="/assets/imgs/HDFC.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Groww.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Bajaj-Finserve.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/B612.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Alibabagroup.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Cred.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Tata-1mg.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Urban-company.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
          </div>
          <div className="marquee-content scroll">
            <img
              src="/assets/imgs/Kotak.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Dunzo.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Dream11.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Airtel.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/ZEE.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/OYO.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Josh.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Share-Chat.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
          </div>
          <div className="marquee-content scroll">
            <img
              src="/assets/imgs/Make-My-Trip.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Goibibo.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/ixigo.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Yatra.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Nykaa.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Myntra.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Snapdeal.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6464b1e584df30bdd28524bc_Smood.ch%20PINK.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
          </div>
          <div className="marquee-content scroll">
            <img
              src="/assets/imgs/IDFC.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Yes-Bank.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Edelweiss.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/ELSA.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/CoinMArketcap.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/SimpleLearn.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/BYJUs-Exam-Prep.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/mint.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
          </div>
          <div className="marquee-content scroll">
            <img
              src="/assets/imgs/Magicbricks.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Housing.com.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Nobroker.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Ultrahuman.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Fynd.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Fancode.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/fectar.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/One-code_ZET.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
          </div>
          <div className="marquee-content scroll">
            <img
              src="/assets/imgs/HDFC.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Groww.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Bajaj-Finserve.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/B612.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Alibabagroup.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Cred.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Tata-1mg.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
            <img
              src="/assets/imgs/Urban-company.svg"
              loading="eager"
              width="120"
              alt=""
              className="marquee-image"
            />
          </div>
        </div>
      </div>
      <div
        data-w-id="1d6fa538-76d2-a785-245f-450676df0449"
        className="logo-carousel-container-2"
      >
        <div className="carousel-2">
          <div
            style={{
              WebkitTransform:
                "translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              MozTransform:
                "translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              msTransform:
                "translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              transform:
                "translate3d(0%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            }}
            className="logo-carousel-wrapper-2"
          >
            <div className="logo-loop-container-2">
              <div className="item-holder-2">
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/HDFC.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Groww.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Bajaj-Finserve.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/B612.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
              </div>
              <div className="item-holder-2">
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Alibabagroup.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Cred.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Tata-1mg.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Urban-company.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
              </div>
              <div className="item-holder-2">
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Kotak.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Dunzo.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Dream11.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Airtel.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
              </div>
              <div className="item-holder-2">
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/ZEE.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/OYO.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Josh.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Share-Chat.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
              </div>
              <div className="item-holder-2">
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Make-My-Trip.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Goibibo.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/ixigo.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Yatra.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
              </div>
              <div className="item-holder-2">
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Nykaa.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Myntra.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Snapdeal.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Smood.ch-PINK.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
              </div>
              <div className="item-holder-2">
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/IDFC.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Yes-Bank.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Edelweiss.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/ELSA.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
              </div>
              <div className="item-holder-2">
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/CoinMArketcap.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/SimpleLearn.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/BYJUs-Exam-Prep.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/mint.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
              </div>
              <div className="item-holder-2">
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Magicbricks.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Nobroker.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Ultrahuman.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Fynd.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
              </div>
              <div className="item-holder-2">
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/Fancode.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/fectar.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/One-code_ZET.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/netmeds.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
                <div className="logo-item-2">
                  <img
                    src="/assets/imgs/FreshMenu.svg"
                    loading="lazy"
                    width="100"
                    alt=""
                    className="image-logos"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Audit;
