import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const OurPricing = () => {
  const [activeTab, setActiveTab] = useState("tab2");

  useEffect(() => {
    document.addEventListener("click", (event) => {
      iOSOuterBoxes.forEach((element) => {
        const countryContentBox = element.querySelector(".content-country");
        if (element.contains(event.target)) {
          return true;
        } else if (countryContentBox.contains(event.target)) {
          return true;
        } else if (
          event.target.matches('li[onclick="updateSelectedCountryName(this)"]')
        ) {
          return true;
        } else if (event.target === getAuditAppBtn) {
          return true;
        } else {
          try {
            element
              .querySelector(".suggestions")
              .classList.remove("format-suggestions");
          } catch {}
          try {
            element.querySelector(".searching-shimmer").classList.add("hidden");
          } catch {}
          try {
            element
              .querySelector(".country-select-button.active")
              .classList.remove("active");
            element
              .querySelector(".content-country.active")
              .classList.remove("active");
          } catch {}
        }
      });
    });
    const inputBoxClick = document.querySelectorAll(
      ".main-box-holder .search-input"
    );
    inputBoxClick.forEach((inputBox) => {
      if (window.screen.width < 550) {
        inputBox.placeholder = "Search your app";
      }
      inputBox.addEventListener("click", (event) => {
        let mainBoxHolder = event.target.closest(".main-box-holder");
        let fullListData = mainBoxHolder.querySelector(".suggestions");
        let data = fullListData.querySelector("li.li-suggestion-item");
        const allCountrySelectBtn = document.querySelectorAll(
          ".country-select-button"
        );
        allCountrySelectBtn.forEach((btn) => {
          if (btn.classList.contains("active")) {
            btn.click();
          }
        });
        if (data) {
          fullListData.classList.add("format-suggestions");
        } else {
          try {
            let recentSelectedApp = JSON.parse(
              localStorage.getItem("Recent Selected App")
            );
            let recentSuggestion = recentSelectedApp.map((item) => {
              let deviceIcon;
              if (item.device == "apple")
                deviceIcon =
                  "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f645042f50918e6e390f_app-store.svg";
              else
                deviceIcon =
                  "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f644817f822625b18bb6_google-play-store.svg";
              return `<li class="li-suggestion-item" application-url="${item["data-package-url"]}" application-id="${item["app-package-id"]}" application-img-logo="${item.icon_urls}" device="${item.device}"><div class="show-device-icon"><div class="li-suggestion-item-logo"><img src="${item.icon_urls}" alt="app_icon" class="app-icon-li-item" /></div><div class="li-suggestion-item-info">${item.packageName}</div></div> <div class="device-icon" device="${item.device}"><img src="${deviceIcon}" alt="device-logo" class="device-icon-logo"></div></li>`;
            });
            if (recentSuggestion.length > 0) {
              fullListData.classList.add("format-suggestions");
              recentSuggestion.unshift(
                '<p class= "info-search">Recently selected apps:</p>'
              );
            }
            fullListData.insertAdjacentHTML(
              "beforeend",
              recentSuggestion.join("")
            );
          } catch {}
        }
      });
    });

    document
      .querySelector("#suggestions-box5")
      .addEventListener("click", (event) => {
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
      });
    document
      .querySelector("#suggestions-box6")
      .addEventListener("click", async (event) => {
        let { appPackageURL, applicationId, imageURL, device } =
          selectAppHandler(event);
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
      });

    const contactButtonForm = document.querySelectorAll(
      ".contact-button-display-form"
    );
    contactButtonForm.forEach((button) => {
      button.addEventListener("click", (event) => {
        const contentBox = event.target.closest(".app-info-display");
        const appInfo = contentBox.querySelector(".app-basic-info-box");
        const appPackageURL = appInfo
          .querySelector(".app-information a")
          .getAttribute("href");
        const imageURL = appInfo
          .querySelector(".app-img-box img")
          .getAttribute("src");
        let device = "android";
        if (appPackageURL.split("/")[2].split(".")[1] == "apple")
          device = "apple";
        displayAppRelatedBox(appPackageURL, imageURL, device);
      });
    });

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
    async function fetchPlayStoreAppData(applicationId, t) {
      const url = `https://store.maakeetoo.com/apps/details/?id=${applicationId}&gl=${t}`;
      try {
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        throw new Error(`Error fetching Play Store app data: ${error}`);
      }
    }
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
    async function updatePriceToPage(
      priceData,
      search_keyword,
      applicationId,
      appPackageURL
    ) {
      const priceAmount = document.querySelector("#Pricing-Amount");
      priceAmount.innerHTML = `$${priceData}<span class="suffix">/month onwards</span>`;
      dataLayer.push({
        event: "ios_pricing_select",
        keyword: search_keyword,
        "gtm.elementId": applicationId,
        "gtm.elementUrl": appPackageURL,
        "gtm.price": priceData,
        "gtm.uniqueAnalyticsReports": "AnalyticsLiveWeb_nl",
      });
      rangeSlider.value = priceData;
      rangeSlider.max = parseInt((parseInt(priceData) * 7) / 1000) * 1000;
      rangeSlider.min = parseInt(parseInt(priceData) / 2 / 500) * 500;
    }
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
      updatePriceToPage(
        priceData,
        search_keyword,
        applicationId,
        appPackageURL
      );
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
      updatePriceToPage(
        priceData,
        search_keyword,
        applicationId,
        appPackageURL
      );
    }
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
      let outerSection = document.querySelector("#app-pricing-box_Pr");
      let image = outerSection.querySelector("#App-Icon");
      image.src = imageURL;
      image.setAttribute("image-data", appPackageURL);
      outerSection.classList.remove("hidden");
      let deviceIcon = outerSection.querySelector("#App-Platform");
      const appName = outerSection.querySelector("#App-Name");
      const appInfo = outerSection.querySelector("#App-Info");
      try {
        document
          .querySelector("#custom-contact-btn")
          .classList.remove("hidden");
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
          window.alert(
            "Warning! Please select the app from the dropdown menu."
          );
        }
      } else {
        const responseData = await fetchPlayStoreAppData(
          applicationId,
          country
        );
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

    setInterval(() => {
      if (
        document
          .querySelector("#suggestions-box5")
          .classList.contains("format-suggestions") ||
        document.querySelector("#content-box5").classList.contains("active")
      ) {
        document
          .querySelector("#instruction-Text-Wrapper-pr")
          .classList.remove("hidden");
      } else {
        if (
          !document
            .querySelector("#searching-shimmer5")
            .classList.contains("hidden")
        ) {
          document
            .querySelector("#instruction-Text-Wrapper-pr")
            .classList.remove("hidden");
        } else {
          document
            .querySelector("#instruction-Text-Wrapper-pr")
            .classList.add("hidden");
        }
      }
    }, 500);

    function showResponseToAllSmallBox(response, device, AllMainBoxHolder) {
      for (let mainBoxHolder of AllMainBoxHolder) {
        const searchBoxHolder = mainBoxHolder.closest(".search-box_holder");
        const contentBox = mainBoxHolder
          .closest(".app-search-box-holder")
          .querySelector(".app-info-display");
        if (contentBox.classList.contains("mhr")) {
          handleDataForConversion(response, device, contentBox);
        } else if (contentBox.classList.contains("ctr")) {
          handleDataForCTR(response, device, contentBox);
        } else {
          handleDataForInstalls(response, device, contentBox);
        }
        searchBoxHolder.style.display = "none";
        contentBox.classList.remove("hidden");
      }
    }
    function handleDataForConversion(result, device, contentBox) {
      if (device == "apple") {
        displayAppleDataToRelatedBox(result, contentBox);
        calculateTheSentenceResponseForApple(result, contentBox);
      } else {
        displayPlayDataToRelatedBox(result, contentBox);
        calculateTheSentenceResponseForPlay(result, contentBox);
      }
    }
    function handleDataForCTR(result, device, contentBox) {
      if (device == "apple") {
        displayAppleDataToRelatedBox(result, contentBox);
        displayReviewsAndRatingToBox(result.averageUserRating, contentBox);
      } else {
        displayPlayDataToRelatedBox(result, contentBox);
        displayReviewsAndRatingToBox(result.score, contentBox);
      }
    }
    function handleDataForInstalls(result, device, contentBox) {
      if (device == "apple") {
        displayAppleDataToRelatedBox(result, contentBox);
        displayMilestoneDataApple(result, contentBox);
      } else {
        displayPlayDataToRelatedBox(result, contentBox);
        displayMilestoneDataPlay(result, contentBox);
      }
    }
    async function fetchAndStoreAppDataToBox(
      appPackageURL,
      applicationId,
      device,
      country
    ) {
      if (device == "apple") {
        let result = await fetchAppleAppData(appPackageURL, country);
        const appData = JSON.stringify({ apple: result });
        localStorage.setItem("selectedAppData", appData);
        return result;
      } else {
        let result = await fetchPlayStoreAppData(applicationId, country);
        const appData = JSON.stringify({ android: result });
        localStorage.setItem("selectedAppData", appData);
        return result;
      }
    }
    function displayMilestoneDataPlay(result, contentBox) {
      const minInstalls = result.minInstalls;
      const maxInstalls = calculateNextMilestone(minInstalls);
      const mileStoneBox = contentBox.querySelector(".milestones-images");
      mileStoneBox.parentNode.classList.remove("hidden");
      const mileStoneInstallCurrent = contentBox.querySelector(
        ".current-milestone span"
      );
      mileStoneInstallCurrent.innerHTML = formatReadableNumber(minInstalls);
      const mileStoneInstallNext = contentBox.querySelector(
        ".next-milestone span"
      );
      mileStoneInstallNext.innerText = formatReadableNumber(maxInstalls);
      const sliderBox = contentBox.querySelector(".range-slider-box");
      sliderBox.parentNode.classList.remove("hidden");
      const slider = sliderBox.querySelector("input");
      slider.value = 180;
      slider.nextSibling.innerHTML = "180";
      const resultBox = contentBox.querySelector(".result-text-box");
      displayCalculatedInstallsToUser(resultBox, result, 180);
      const listLi = contentBox.querySelectorAll(".review-suggestion-list li");
      listLi[0].classList.remove("hidden");
      listLi[1].classList.remove("hidden");
      listLi[2].classList.add("hidden");
    }
    function displayMilestoneDataApple(result, contentBox) {
      const mileStone = contentBox.querySelector(".milestones-images");
      mileStone.parentNode.classList.add("hidden");
      const sliderBox = contentBox.querySelector(".range-slider-box");
      sliderBox.parentNode.classList.add("hidden");
      const resultBox = contentBox.querySelector(".result-text-box");
      resultBox.classList.add("hidden");
      const listLi = contentBox.querySelectorAll(".review-suggestion-list li");
      for (let li of listLi) {
        li.classList.remove("hidden");
      }
    }
    function calculateNextMilestone(number) {
      const thresholds = [
        100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000,
        10000000, 50000000, 100000000, 500000000, 1000000000, 5000000000,
        10000000000, 50000000000,
      ];
      for (let threshold of thresholds) {
        if (number < threshold) {
          return threshold;
        }
      }
      return number * 5;
    }
    function formatReadableNumber(number) {
      if (number < 1e3) {
        return number;
      } else if (number < 1e6) {
        return (number / 1e3).toFixed(1) + "K";
      } else if (number < 1e9) {
        return (number / 1e6).toFixed(1) + "M";
      } else if (number < 1e12) {
        return (number / 1e9).toFixed(1) + "B";
      } else if (number < 1e15) {
        return (number / 1e15).toFixed(1) + "T";
      } else {
        return number;
      }
    }
    async function calculateTheSentenceResponseForPlay(result, contentBox) {
      const images = result.screenshots.length;
      const video = result.video == undefined ? 1 : 2;
      const urlParams = new URLSearchParams(result.url);
      const appId = result.url.split("id=")[1].split("&")[0];
      const country = urlParams.get("gl");
      const mhrScore = await fetchMHRScore(appId, country);
      displayImproveConversionSentence(images, video, mhrScore, contentBox);
    }
    async function calculateTheSentenceResponseForApple(result, contentBox) {
      const images = result.screenshotUrls.length;
      const jpgCount = result.screenshotUrls.filter(
        (url) =>
          url.toLowerCase().endsWith(".jpg") ||
          url.toLowerCase().endsWith(".webp")
      ).length;
      const video = images === jpgCount ? 1 : 2;
      const mhrScore = await fetchMHRScoreApple(
        result.trackId,
        result.trackViewUrl.split("/")[3]
      );
      displayImproveConversionSentence(images, video, mhrScore, contentBox);
    }
    function displayImproveConversionSentence(
      images,
      video,
      mhrScore,
      contentBox
    ) {
      const image = images <= 4 ? 0 : images < 8 ? 1 : 2;
      const mhr = mhrScore <= 40 ? 0 : mhrScore < 80 ? 1 : 2;
      const imagesSArray = [
        "Nice that you have added " +
          images +
          " Screenshots. Please ensure that your screenshots capture the core features and experience of your app or game. It is recommended that you add upto 8 screenshots per device type",
        "Great work adding " +
          images +
          " screenshots. but Including all eight screenshots per device type can provide a comprehensive view of the app's functionality, features, and user interface.",
        "That's Awesome, you have used " +
          images +
          " screenshots.This would also increases the chances of effectively communicating the app's value proposition by showcasing various aspects and functionalities.",
      ];
      const videoSArray = [
        "",
        "Utilizing a video to showcase an app's value proposition offers users a preview of what to expect. A Video should highlights distinctive features, achievements, and provides insight into the user interface.",
        "Great! Work Adding Video to your Store listing. But Make Sure your video highlights distinctive features and provides insight into the user interface.",
      ];
      const mhrSArray = [
        "MHR Score is " +
          mhrScore +
          ", This is not good for your ASO strategy. You are losing Installs on your app.",
        "MHR Score is " +
          mhrScore +
          ", Which is causing impact on your conversion Matrices. Having 80+ MHR Can Increase you conversion by 3%-5% from baseline",
        "That's Nice your MHR Score is " +
          mhrScore +
          ", Having good MHR Score is reflected upon your overall conversion metrics.",
      ];
      const listLi = contentBox.querySelectorAll(
        ".conversion-suggestion-list li"
      );
      listLi[0].innerHTML = imagesSArray[image];
      listLi[1].innerHTML = videoSArray[video];
      listLi[2].innerHTML = mhrSArray[mhr];
      const cList = ["bad", "mid", "none"];
      for (let li of listLi) {
        li.classList.remove(cList[0]);
        li.classList.remove(cList[1]);
        li.classList.remove(cList[2]);
      }
      listLi[0].classList.add(cList[image]);
      listLi[1].classList.add(cList[video]);
      listLi[2].classList.add(cList[mhr]);
    }
    function displayReviewsAndRatingToBox(rating, contentBox) {
      const slider = contentBox.querySelector(".range-slider-box input");
      slider.value = rating.toFixed(1);
      slider.setAttribute("min-value", rating.toFixed(1));
      const sliderText = contentBox.querySelector(".range-slider-box strong");
      sliderText.innerHTML = rating.toFixed(1);
      const mileStoreRating = contentBox.querySelector(
        ".current-milestone span"
      );
      mileStoreRating.innerHTML = rating.toFixed(1);
      contentBox.querySelector(".result-text-box").classList.add("hidden");
      const listLi = contentBox.querySelectorAll(".review-suggestion-list li");
      for (let li of listLi) {
        li.classList.add("hidden");
      }
    }
    function displayAppleDataToRelatedBox(data, contentBox) {
      const image = contentBox.querySelector(".app-img-box img");
      image.src = data.artworkUrl100;
      image.alt = data.trackName;
      const appName = contentBox.querySelector(".app-information h4");
      appName.innerHTML = `<a href="${data.trackViewUrl}" target="_blank">${data.trackName}</a>`;
      const rating = contentBox.querySelector(".app-information div strong");
      rating.innerHTML = data.averageUserRating.toFixed(2);
      const genre = contentBox.querySelector(".app-information div em");
      genre.innerHTML = " " + data.primaryGenreName;
      const dName = contentBox.querySelector(".app-developer-name");
      dName.innerHTML = "By " + data.artistName;
    }
    function displayPlayDataToRelatedBox(data, contentBox) {
      const image = contentBox.querySelector(".app-img-box img");
      image.src = data.icon;
      image.alt = data.title;
      const appName = contentBox.querySelector(".app-information h4");
      appName.innerHTML = `<a href="${data.url}"  target="_blank"> ${data.title}</a >`;
      const rating = contentBox.querySelector(".app-information div strong");
      rating.innerHTML = (() => {
        try {
          return data.score.toFixed(2);
        } catch (error) {
          data.score = 0.0;
          return 0.0;
        }
      })();
      const genre = contentBox.querySelector(".app-information div em");
      genre.innerHTML = " " + data.genre;
      const dName = contentBox.querySelector(".app-developer-name");
      dName.innerHTML = "By " + data.developer;
    }
    async function fetchMHRScoreApple(appId, country) {
      const url =
        "https://nextgrowthlabs.com/wp-json/my-api/v1/mhr-ios/?appId=" +
        appId +
        "&country=" +
        country;
      let response = await fetch(url);
      const result = await response.json();
      if (result.score) {
        return result.score;
      } else {
        return 30;
      }
    }

    const rangeSlider = document.getElementById("rangeSlider");
    const outputDiv = document.querySelector(".calculated-pricing");
    rangeSlider.addEventListener("input", function () {
      const sliderValue = rangeSlider.value;
      outputDiv.innerHTML =
        "$" + sliderValue + "<span class='suffix'>/month onwards</span>";
    });
    setTimeout(() => {
      let formBtns2 = document.querySelectorAll(
        '#app-pricing-box_Pr a[href="#lp-contact"]'
      );
      formBtns2.forEach(function (element) {
        element.addEventListener("click", function (event) {
          let appURL = document.querySelector("#appUrl");
          appURL.value = document
            .querySelector("#app-pricing-box_Pr #App-Icon")
            .getAttribute("image-data");
        });
      });
    }, 6000);
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
      const allMiniContainer = document.querySelectorAll(
        ".mini-main-container"
      );
      showResponseToAllSmallBox(response, device, allMiniContainer);
      try {
        closeSearchBtn.forEach((close) => {
          close.classList.remove("hidden");
        });
      } catch {}
    }
  });
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
                    class={`tabs1_link-service first w-inline-block w-tab-link ${
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
                    class={`tabs1_link-service _3rd w-inline-block w-tab-link ${
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
                    class={`tabs_tab-pane w-tab-pane ${
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
                                            autocomplete="off"
                                            id="search-bar-input5"
                                            className="search-input"
                                            placeholder="Search your iOS or android app"
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
                                              viewbox="0 0 16 16"
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
                                      <div className="country-selection-box">
                                        <div
                                          className="country-select-button"
                                          id="select-country-btn5"
                                          country-code="us"
                                          country-name="United State"
                                        >
                                          <span>
                                            <Image
                                              width={40}
                                              height={30}
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
                                          <div
                                            className="content-country"
                                            id="content-box5"
                                          >
                                            <div className="search">
                                              <input
                                                spellcheck="false"
                                                autocomplete="off"
                                                type="text"
                                                placeholder="Search"
                                                id="country-search-input5"
                                              />
                                            </div>
                                            <ul className="options"></ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="style-new w-embed"></div>
                                </div>
                              </div>
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
                                            Complimentary tools for tracking and
                                            establishing performance goals
                                            (KPIs)
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
                                            Conversion improvement - by focusing
                                            on MHR score, A/B testing.
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
                                            Enhance engagement and retention by
                                            utilizing your analytics tool
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
                                            Get Ranked on App Packs  Section.
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
                                          Please wait.. We are getting you best
                                          price
                                        </span>
                                      </h4>
                                    </div>
                                    <div>
                                      <div className="html-embed-35 w-embed">
                                        <input
                                          type="range"
                                          min="1000"
                                          max="30000"
                                          value="5000"
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
                                        Want a full proposal or have a different
                                        budget in mind? We cater to budgets of
                                        all sizes.
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
      <section id="our-pricing" class="form-capture-section">
        <div class="form-tab-wrapper">
          <div class="tab-wrapper vertical-centre-aligned">
            <div class="max-width-large align-center">
              <h2
                data-w-id="5232b42b-7451-0536-8c39-cebc65da8058"
                class="heading tabsectiontitle"
              >
                Our Pricing{" "}
              </h2>
            </div>
            <div class="max-width-xlarge align-center">
              <div
                data-duration-in="300"
                data-duration-out="100"
                data-current="Tab 2 Form"
                data-easing="ease"
                class="tabs_component--service w-tabs"
              >
                <div class="tabs_menu-service w-tab-menu">
                  <a
                    data-w-tab="Tab 1 form"
                    class="tabs1_link-service first w-inline-block w-tab-link"
                  >
                    <div>
                      Pricing Guide
                      <br />
                    </div>
                  </a>
                  <a
                    data-w-tab="Tab 2 Form"
                    class="tabs1_link-service _3rd w-inline-block w-tab-link w--current"
                  >
                    <div>
                      Show Pricing by App
                      <br />
                    </div>
                  </a>
                </div>
                <div class="tabs_content w-tab-content">
                  <div data-w-tab="Tab 1 form" class="tabs_tab-pane w-tab-pane">
                    <div class="tabs_content-wrapper-service">
                      <div class="max-width-full">
                        <div class="w-layout-grid tabs-layout_component">
                          <div class="list-wrapper margin">
                            <div class="pricing-package-grid">
                              <div
                                id="w-node-_5232b42b-7451-0536-8c39-cebc65da806c-98a3ef9a"
                                class="package-card"
                              >
                                <div class="top-part padding">
                                  <div class="image-content-wrapper">
                                    <div class="image-wrapper-2">
                                      <img
                                        width="60"
                                        loading="lazy"
                                        alt=""
                                        src="images/keywordbased.svg"
                                        class="card-main-image"
                                      />
                                    </div>
                                    <div class="name-content-wrapper">
                                      <h2 class="titile-heading">
                                        Keyword based
                                      </h2>
                                      <div class="text-block-25">
                                        Achieve desired ranking for your
                                        specified keywords
                                      </div>
                                    </div>
                                  </div>
                                  <p class="card-paragraph margin">
                                    Pay only when your target keywords rank for
                                    the desired position
                                  </p>
                                </div>
                                <div class="card-package-content">
                                  <div class="heading card-package-features-new left-align">
                                    Key Offerings:
                                  </div>
                                  <div class="w-layout-grid grid-8">
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da807c-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        Pay based on the keywords that you’d
                                        like to target.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da8080-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        Payout based on the achievements - top
                                        1, top 3, top 5 and top 8.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da8084-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        We can also rank your app in similar app
                                        section of your competitors.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da8088-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        Minimum plan of 6 months.
                                      </div>
                                    </div>
                                  </div>
                                  <div class="button-wrapper">
                                    <a
                                      href="#"
                                      class="button-primary-4 width-max w-button"
                                    >
                                      Contact Us
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="w-node-_5232b42b-7451-0536-8c39-cebc65da808f-98a3ef9a"
                                class="package-card"
                              >
                                <div class="top-part padding">
                                  <div class="image-content-wrapper">
                                    <div class="image-wrapper-2">
                                      <img
                                        width="60"
                                        loading="lazy"
                                        alt=""
                                        src="images/installbased.svg"
                                        class="card-main-image"
                                      />
                                    </div>
                                    <div class="name-content-wrapper">
                                      <h2 class="titile-heading">
                                        Install based
                                      </h2>
                                      <div class="text-block-25">
                                        Pay for the expansion of non-branded
                                        organic downloads by x%
                                      </div>
                                    </div>
                                  </div>
                                  <p class="card-paragraph margin">
                                    ASO on autopilot. Get blueprint based on
                                    your download goals.
                                  </p>
                                </div>
                                <div class="card-package-content">
                                  <div class="heading card-package-features-new left-align">
                                    Key Offerings:
                                  </div>
                                  <div class="w-layout-grid grid-8">
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da809f-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        Pay for x% growth in your non-brand
                                        organic downloads.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80a3-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        Most of our ASO campaigns break even in
                                        12 months.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80a7-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        Only available for apps where an
                                        available market share is present.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80ab-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        Minimum plan of 6 months.
                                      </div>
                                    </div>
                                  </div>
                                  <div class="button-wrapper">
                                    <a
                                      href="#"
                                      class="button-primary-4 width-max w-button"
                                    >
                                      Contact Us
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="w-node-_5232b42b-7451-0536-8c39-cebc65da80b2-98a3ef9a"
                                class="package-card"
                              >
                                <div class="top-part padding">
                                  <div class="image-content-wrapper">
                                    <div class="image-wrapper-2">
                                      <img
                                        width="60"
                                        loading="lazy"
                                        alt=""
                                        src="images/revenuesharing.svg"
                                        class="card-main-image"
                                      />
                                    </div>
                                    <div class="name-content-wrapper">
                                      <h2 class="titile-heading">
                                        Revenue sharing
                                      </h2>
                                      <div class="text-block-25">
                                        We drive revenue growth, and take a
                                        share of the increased revenue
                                      </div>
                                    </div>
                                  </div>
                                  <p class="card-paragraph margin">
                                    We help your revenue grow and share revenue
                                    on the incremental revenue.
                                  </p>
                                </div>
                                <div class="card-package-content">
                                  <div class="heading card-package-features-new left-align">
                                    Key Offerings:
                                  </div>
                                  <div class="w-layout-grid grid-8">
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80c2-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        We help your revenue grow and share
                                        revenue on the incremental revenue.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80c6-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        Once you submit the app, we will have a
                                        call, regarding the baseline install and
                                        revenue numbers to see if you qualify.
                                      </div>
                                    </div>
                                    <div
                                      id="w-node-_5232b42b-7451-0536-8c39-cebc65da80ca-98a3ef9a"
                                      class="packahe-feature-wrapper"
                                    >
                                      <img
                                        loading="lazy"
                                        src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                        alt="Check Icon - NextLabs.io"
                                        class="ckeck-icon"
                                      />
                                      <div class="feature-pointer">
                                        We take app quality and current
                                        revenue/user in consideration while
                                        deciding the revenue share.
                                      </div>
                                    </div>
                                  </div>
                                  <div class="button-wrapper aligned-3">
                                    <a
                                      href="#"
                                      class="button-primary-4 width-max w-button"
                                    >
                                      Contact Us
                                    </a>
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
                    class="tabs_tab-pane w-tab-pane w--tab-active"
                  >
                    <div class="tabs_content-wrapper-service">
                      <div class="max-width-full">
                        <div
                          id="pricingBoxPr"
                          class="w-layout-grid tabs-layout_component"
                        >
                          <div class="search-box-wrapper">
                            <div class="app-search-box-holder">
                              <div class="search-box_holder flex-custom width">
                                <div class="code-left">
                                  <div class="html-embed-14 w-embed">
                                    <div
                                      id="search-box5"
                                      class="main-box-holder"
                                    >
                                      <div class="search-box-suggestion">
                                        <div class="main-search-bar">
                                          <input
                                            type="text"
                                            autocomplete="off"
                                            id="search-bar-input5"
                                            class="search-input"
                                            placeholder="Search your iOS or android app"
                                          />
                                          <button
                                            id="close-search-form5"
                                            class="hidden close-search-form"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              xmlsXlink="http://www.w3.org/1999/xlink"
                                              width="16px"
                                              height="16px"
                                              viewbox="0 0 16 16"
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
                                        <div class="app-output-box">
                                          <div
                                            id="searching-shimmer5"
                                            class="hidden searching-shimmer"
                                          >
                                            <ul class="o-vertical-spacing o-vertical-spacing--l">
                                              <li class="blog-post o-media">
                                                <div class="o-media__figure">
                                                  <span class="skeleton-box"></span>
                                                </div>
                                                <div class="o-media__body">
                                                  <div class="o-vertical-spacing">
                                                    <h3 class="blog-post__headline">
                                                      <span
                                                        class="skeleton-box"
                                                        style={{ width: "55%" }}
                                                      ></span>
                                                    </h3>
                                                    <p>
                                                      <span
                                                        class="skeleton-box"
                                                        style={{ width: "80%" }}
                                                      ></span>
                                                    </p>
                                                  </div>
                                                </div>
                                              </li>
                                              <li class="blog-post o-media">
                                                <div class="o-media__figure">
                                                  <span class="skeleton-box"></span>
                                                </div>
                                                <div class="o-media__body">
                                                  <div class="o-vertical-spacing">
                                                    <h3 class="blog-post__headline">
                                                      <span
                                                        class="skeleton-box"
                                                        style={{ width: "55%" }}
                                                      ></span>
                                                    </h3>
                                                    <p>
                                                      <span
                                                        class="skeleton-box"
                                                        style={{ width: "80%" }}
                                                      ></span>
                                                    </p>
                                                  </div>
                                                </div>
                                              </li>
                                              <li class="blog-post o-media">
                                                <div class="o-media__figure">
                                                  <span class="skeleton-box"></span>
                                                </div>
                                                <div class="o-media__body">
                                                  <div class="o-vertical-spacing">
                                                    <h3 class="blog-post__headline">
                                                      <span
                                                        class="skeleton-box"
                                                        style={{ width: "55%" }}
                                                      ></span>
                                                    </h3>
                                                    <p>
                                                      <span
                                                        class="skeleton-box"
                                                        style={{ width: "80%" }}
                                                      ></span>
                                                    </p>
                                                  </div>
                                                </div>
                                              </li>
                                              <li class="blog-post o-media">
                                                <div class="o-media__figure">
                                                  <span class="skeleton-box"></span>
                                                </div>
                                                <div class="o-media__body">
                                                  <div class="o-vertical-spacing">
                                                    <h3 class="blog-post__headline">
                                                      <span
                                                        class="skeleton-box"
                                                        style={{ width: "55%" }}
                                                      ></span>
                                                    </h3>
                                                    <p>
                                                      <span
                                                        class="skeleton-box"
                                                        style={{ width: "80%" }}
                                                      ></span>
                                                    </p>
                                                  </div>
                                                </div>
                                              </li>
                                              <li class="blog-post o-media">
                                                <div class="o-media__figure">
                                                  <span class="skeleton-box"></span>
                                                </div>
                                                <div class="o-media__body">
                                                  <div class="o-vertical-spacing">
                                                    <h3 class="blog-post__headline">
                                                      <span
                                                        class="skeleton-box"
                                                        style={{ width: "55%" }}
                                                      ></span>
                                                    </h3>
                                                    <p>
                                                      <span
                                                        class="skeleton-box"
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
                                            class="suggestions"
                                          ></ul>
                                        </div>
                                      </div>
                                      <div class="country-selection-box">
                                        <div
                                          class="country-select-button"
                                          id="select-country-btn5"
                                          country-code="us"
                                          country-name="United State"
                                        >
                                          <span>
                                            <img
                                              src="https://flagcdn.com/40x30/us.png"
                                              alt="United States"
                                              loading="eager"
                                              class="country-flags"
                                            />
                                            United State
                                          </span>
                                          <i>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="16"
                                              height="16"
                                              fill="currentColor"
                                              class="bi bi-chevron-down"
                                              viewbox="0 0 16 16"
                                            >
                                              <path
                                                fill-rule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                              ></path>
                                            </svg>
                                          </i>
                                        </div>
                                        <div class="country-search-box">
                                          <div
                                            class="content-country"
                                            id="content-box5"
                                          >
                                            <div class="search">
                                              <input
                                                spellcheck="false"
                                                autocomplete="off"
                                                type="text"
                                                placeholder="Search"
                                                id="country-search-input5"
                                              />
                                            </div>
                                            <ul class="options"></ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    id="custom-contact-btn"
                                    class="button-wrapper"
                                  >
                                    <a
                                      href="#form-submit"
                                      class="button-primary-4 width-max w-button"
                                    >
                                      Contact Us
                                    </a>
                                  </div>
                                  <div class="personal-plan-offer">
                                    <h5 class="personal-plan-heading">
                                      Want a personal plan?
                                    </h5>
                                    <div class="custom-plan-paragraph">
                                      Want a full proposal or have a different
                                      budget in mind? We cater to budgets of all
                                      sizes.
                                    </div>
                                    <div class="button-wrapper bottom">
                                      <a
                                        href="#form-submit"
                                        class="button-primary-4 width-max alternate w-button"
                                      >
                                        Let’s discuss
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                id="app-pricing-box_Pr"
                                class="card-2 contact google_play-store new hidden"
                              >
                                <div class="package-card logic">
                                  <div class="top-part padding">
                                    <div class="image-content-wrapper centre-aligned centre-alignmed">
                                      <div class="app-logo-info_holder">
                                        <div class="app-logo_holder small-icon pricing">
                                          <img
                                            id="App-Platform"
                                            loading="lazy"
                                            src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                                            alt=""
                                            class="logo-image-lead small-icon-platform"
                                          />
                                        </div>
                                        <div class="app-logo_holder bottom-spacing-margin pricing">
                                          <img
                                            id="App-Icon"
                                            loading="lazy"
                                            height=""
                                            alt="ios-app-logo"
                                            src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                                            class="logo-image-lead"
                                          />
                                        </div>
                                      </div>
                                      <div class="name-content-wrapper left-margin">
                                        <h2
                                          id="App-Name"
                                          class="titile-heading centre-alignmed"
                                        >
                                          App Name{" "}
                                        </h2>
                                        <div
                                          id="App-Info"
                                          class="text-block-25"
                                        >
                                          Social Rating on App Platform
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="card-package-content pricing">
                                    <div class="heading card-package-features-new">
                                      How we improve?
                                    </div>
                                    <div class="grid-wrapper-flex">
                                      <div class="w-layout-grid grid-8">
                                        <div
                                          id="w-node-_5232b42b-7451-0536-8c39-cebc65da80f2-98a3ef9a"
                                          class="packahe-feature-wrapper"
                                        >
                                          <img
                                            loading="lazy"
                                            src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                            alt="Check Icon - NextLabs.io"
                                            class="ckeck-icon"
                                          />
                                          <div
                                            id="Conditional-Android-iOS-1"
                                            class="feature-pointer"
                                          >
                                            Improve visitors - using keyword
                                            ranks and similar app section ML
                                            based rating improvement plan.
                                          </div>
                                        </div>
                                        <div
                                          id="w-node-_5232b42b-7451-0536-8c39-cebc65da80f6-98a3ef9a"
                                          class="packahe-feature-wrapper"
                                        >
                                          <img
                                            loading="lazy"
                                            src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                            alt="Check Icon - NextLabs.io"
                                            class="ckeck-icon"
                                          />
                                          <div class="feature-pointer">
                                            Complimentary tools for tracking and
                                            establishing performance goals
                                            (KPIs)
                                          </div>
                                        </div>
                                        <div
                                          id="w-node-_5232b42b-7451-0536-8c39-cebc65da80fa-98a3ef9a"
                                          class="packahe-feature-wrapper hidden"
                                        >
                                          <img
                                            loading="lazy"
                                            src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                            alt="Check Icon - NextLabs.io"
                                            class="ckeck-icon"
                                          />
                                          <div
                                            id="Conditional-Statement-1"
                                            class="feature-pointer"
                                          >
                                            Get into Similar App Section of
                                            competitors.
                                          </div>
                                        </div>
                                      </div>
                                      <div class="w-layout-grid grid-8">
                                        <div
                                          id="w-node-_5232b42b-7451-0536-8c39-cebc65da80ff-98a3ef9a"
                                          class="packahe-feature-wrapper"
                                        >
                                          <img
                                            loading="lazy"
                                            src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                            alt="Check Icon - NextLabs.io"
                                            class="ckeck-icon"
                                          />
                                          <div
                                            id="Conditional-Android-iOS-2"
                                            class="feature-pointer"
                                          >
                                            Conversion improvement - by focusing
                                            on MHR score, A/B testing.
                                          </div>
                                        </div>
                                        <div
                                          id="w-node-_5232b42b-7451-0536-8c39-cebc65da8103-98a3ef9a"
                                          class="packahe-feature-wrapper"
                                        >
                                          <img
                                            loading="lazy"
                                            src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                            alt="Check Icon - NextLabs.io"
                                            class="ckeck-icon"
                                          />
                                          <div class="feature-pointer">
                                            Enhance engagement and retention by
                                            utilizing your analytics tool
                                            through the our BI pipeline.
                                          </div>
                                        </div>
                                        <div
                                          id="w-node-_5232b42b-7451-0536-8c39-cebc65da8107-98a3ef9a"
                                          class="packahe-feature-wrapper hidden"
                                        >
                                          <img
                                            loading="lazy"
                                            src="images/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                                            alt="Check Icon - NextLabs.io"
                                            class="ckeck-icon"
                                          />
                                          <div
                                            id="Conditional-Statement-2"
                                            class="feature-pointer"
                                          >
                                            Get Ranked on App Packs  Section.
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="calculated-pricing-component_wrapper">
                                      <div class="pricing-info-text">
                                        Recommended Budget
                                      </div>
                                      <h4
                                        id="Pricing-Amount"
                                        class="calculated-pricing"
                                      >
                                        <span class="suffix">
                                          Please wait.. We are getting you best
                                          price
                                        </span>
                                      </h4>
                                    </div>
                                    <div>
                                      <div class="html-embed-35 w-embed">
                                        <input
                                          type="range"
                                          min="1000"
                                          max="30000"
                                          value="5000"
                                          class="slider"
                                          id="rangeSlider"
                                        />
                                      </div>
                                    </div>
                                    <div
                                      id="instruction-Text-Wrapper-pr"
                                      class="instruction-text-wrapper hidden"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurPricing;
