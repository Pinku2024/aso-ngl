// funcion for getting recent apps data
export function getRecentAppData() {
  const recentSelectedApp = JSON.parse(
    localStorage.getItem("Recent Selected App")
  );
  const recentSuggestion = recentSelectedApp.map((item) => {
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
  return arr.filter((item) => {
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
    // mainWorkingBox.querySelector(".suggestions").innerHTML = "";
    return false;
  }
  const newKeyword = currentNameIOS.split(" ").join("+");
  const requestIOS = `https://itunes.apple.com/search?media=software&entity=software%2CiPadSoftware%2CsoftwareDeveloper&term=${newKeyword}&country=${country}&limit=30`;
  if (
    requestIOS.trim() ===
    `https://itunes.apple.com/search?media=software&entity=software%2CiPadSoftware%2CsoftwareDeveloper&term=&country=&limit=30`
  ) {
    // mainWorkingBox.querySelector(".suggestions").innerHTML = "";
    return false;
  }
  let requestPlay = `https://store.maakeetoo.com/apps/search/?q=${currentNamePlay}&gl=${country}`;
  if (
    requestPlay.trim() ===
    `https://store.maakeetoo.com/apps/search/?q=&gl=${country}`
  ) {
    // mainWorkingBox.querySelector(".suggestions").innerHTML = "";
    return false;
  }
  let listData = await handleRequestsAndProcessData(requestPlay, requestIOS);
  if (listData.length > 0) {
    // mainWorkingBox.querySelector(".suggestions").innerHTML = "";
    // mainWorkingBox
    //   .querySelector(".suggestions")
    //   .classList.add("format-suggestions");
  }
  // mainWorkingBox.querySelector(".searching-shimmer").classList.add("hidden");
  // mainWorkingBox
  //   .querySelector(".suggestions")
  //   .insertAdjacentHTML("beforeend", listData.join(""));
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
    // console.log("Merged Data", mergedData);

    const fullAppData = mergedExtractedData(mergedData);
    const suggestionList = createListWithDevice(fullAppData);

    // if (suggestionList.length > 0) {
    //   suggestionList.unshift('<p class="info-search">Search Results</p>');
    //   suggestionList.push(
    //     '<p class="info-search" style={{textAlign: "center"}}>Unable to locate your App? Try using your App ID or <Link href="#lp-contact">App URL</Link></p>'
    //   );
    // }

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
