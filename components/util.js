// funcion for getting recent apps data
export function getRecentAppData() {
  const recentSelectedApp = JSON.parse(
    localStorage.getItem("Recent Selected App")
  );
  const recentSuggestion = recentSelectedApp?.map((item) => {
    let deviceIcon;
    if (item.device === "apple")
      deviceIcon =
        "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f645042f50918e6e390f_app-store.svg";
    else
      deviceIcon =
        "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f644817f822625b18bb6_google-play-store.svg";
    item.deviceIcon = deviceIcon;
    return item;
  });
  const uniqueRecentAppsArray = uniqueArray(recentSuggestion, "app-package-id");
  return uniqueRecentAppsArray;
}

function uniqueArray(arr, key) {
  const seen = new Set();
  return arr?.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) {
      return false;
    } else {
      seen.add(keyValue);
      return true;
    }
  });
}

// to fetch the clicked app and store that in the local storage

export async function fetchAndStoreAppDataToBox(
  appPackageURL,
  applicationId,
  device,
  country
) {
  console.log(applicationId);
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

// data fetching
function encodingName(e) {
  return encodeURIComponent(e);
}
export async function prepareDataForRequests(
  searchKeyword,
  selectedCountryCode
) {
  let currentNameIOS = searchKeyword;
  let currentNamePlay = encodingName(searchKeyword);
  let country = selectedCountryCode;
  if (currentNameIOS.trim().length < 2 && currentNameIOS.trim() === "") {
    return false;
  }
  const newKeyword = currentNameIOS.split(" ").join("+");
  const requestIOS = `https://itunes.apple.com/search?media=software&entity=software%2CiPadSoftware%2CsoftwareDeveloper&term=${newKeyword}&country=${country}&limit=30`;
  if (
    requestIOS.trim() ===
    `https://itunes.apple.com/search?media=software&entity=software%2CiPadSoftware%2CsoftwareDeveloper&term=&country=&limit=30`
  ) {
    return false;
  }
  let requestPlay = `https://store.maakeetoo.com/apps/search/?q=${currentNamePlay}&gl=${country}`;
  if (
    requestPlay.trim() ===
    `https://store.maakeetoo.com/apps/search/?q=&gl=${country}`
  ) {
    return false;
  }
  let listData = await handleRequestsAndProcessData(requestPlay, requestIOS);
  return listData;
}

async function handleRequestsAndProcessData(requestPlay, requestIOS) {
  try {
    const response1 = await fetch(requestIOS);
    const response2 = await fetch(requestPlay);
    const iOSResponse = await response1.json();
    const playResponse = await response2.json();

    const mergedData = {
      iOSResponse: iOSResponse,
      playResponse: playResponse,
    };

    const fullAppData = mergedExtractedData(mergedData);
    const suggestionList = createListWithDevice(fullAppData);

    return suggestionList;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

// merging fetched data
function mergedExtractedData(rowData) {
  // console.log(rowData);
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

//app list with device icon and type
function createListWithDevice(data) {
  const formattedData = data.map((item) => {
    if (item.appName !== undefined) {
      let deviceIcon;
      if (item.device == "apple")
        deviceIcon =
          "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f645042f50918e6e390f_app-store.svg";
      else
        deviceIcon =
          "https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f644817f822625b18bb6_google-play-store.svg";
      item.deviceIcon = deviceIcon;
      return item;
    }
  });
  // console.log(formattedData);
  return formattedData;
}

async function fetchPlayStoreAppData(applicationId, t) {
  const url = `https://store.maakeetoo.com/apps/details/?id=${applicationId}&gl=${t}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(`Error fetching Play Store app data: ${error}`);
  }
}

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
    console.log(data);
    return data["results"][0];
  } catch (error) {
    throw new Error(`Error fetching Apple app data: ${error}`);
  }
}

// mhr related data

async function calculateTheSentenceResponseForApple(result, contentBox) {
  const images = result.screenshotUrls.length;
  const jpgCount = result.screenshotUrls.filter(
    (url) =>
      url.toLowerCase().endsWith(".jpg") || url.toLowerCase().endsWith(".webp")
  ).length;
  const video = images === jpgCount ? 1 : 2;
  const mhrScore = await fetchMHRScoreApple(
    result.trackId,
    result.trackViewUrl.split("/")[3]
  );
  displayImproveConversionSentence(images, video, mhrScore, contentBox);
}
function displayImproveConversionSentence(images, video, mhrScore, contentBox) {
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
  const listLi = contentBox.querySelectorAll(".conversion-suggestion-list li");
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

// fetching mhr for apple
export async function fetchMHRScoreApple(appId, country) {
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
// fetching mhr for android
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

async function calculateTheSentenceResponseForPlay(result, contentBox) {
  const images = result.screenshots.length;
  const video = result.video == undefined ? 1 : 2;
  const urlParams = new URLSearchParams(result.url);
  const appId = result.url.split("id=")[1].split("&")[0];
  const country = urlParams.get("gl");
  const mhrScore = await fetchMHRScore(appId, country);
  displayImproveConversionSentence(images, video, mhrScore, contentBox);
}
export async function fetchMHRScoreCombined(applicationId, country, device) {
  if (device === "apple") {
    const url =
      "https://nextgrowthlabs.com/wp-json/my-api/v1/mhr-ios/?appId=" +
      applicationId +
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
  if (device === "android") {
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
}

// fetch price data
export async function fetchPriceData(device, dataObject) {
  if (device === "apple") {
    const priceData = await fetchPrice(
      "https://nextgrowthlabs.com/wp-json/my-api/v1/apple-price-request",
      dataObject
    );
    return priceData;
  }
  if (device === "android") {
    const priceData = await fetchPrice(
      "https://nextgrowthlabs.com/wp-json/my-api/v1/play-price-request",
      dataObject
    );
    return priceData;
  }
}
async function fetchPrice(url, dataObject) {
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

// dataObject for apple and android

export function getDataObjectForApple(row_data) {
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
export function getDataObjectForPlay(responseData) {
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
