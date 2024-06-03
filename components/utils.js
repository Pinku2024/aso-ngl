// export function selectAppHandler(event) {
//   const selectedLi = event.target.closest("li.li-suggestion-item")
//   const mainBoxHolder = selectedLi.closest(".main-box-holder")
//   return getDetailsOfSelectedLi(selectedLi, mainBoxHolder)
// }

// function getDetailsOfSelectedLi(selectedItem, mainBoxHolder) {
//   const inputBox = mainBoxHolder.querySelector(".search-input")
//   const keyword = inputBox.value
//   const country = mainBoxHolder
//     .querySelector(".country-select-button")
//     .getAttribute("country-code")
//   const applicationId = selectedItem.getAttribute("application-id")
//   const imageURL = selectedItem.getAttribute("application-img-logo")
//   let appPackageURL = selectedItem.getAttribute("application-url")
//   const device = selectedItem.getAttribute("device")
//   const appName = selectedItem.querySelector(
//     ".li-suggestion-item-info",
//   ).innerHTML
//   if (device !== "apple")
//     appPackageURL = appPackageURL.split("&gl=")[0] + "&gl=" + country
//   inputBox.setAttribute("application-id", applicationId)
//   inputBox.setAttribute("application-img-logo", imageURL)
//   inputBox.setAttribute("application-url", appPackageURL)
//   inputBox.setAttribute("device", device)
//   const appData = {
//     packageName: appName,
//     icon_urls: imageURL,
//     "app-package-id": applicationId,
//     "data-package-url": appPackageURL,
//     device: device,
//   }
//   let oldAppData = localStorage.getItem("Recent Selected App")
//   if (oldAppData) {
//     let Array = JSON.parse(oldAppData)
//     Array.unshift(appData)
//     let uniqueArray = Array.filter(
//       (item, index) =>
//         Array.findIndex(obj => JSON.stringify(obj) === JSON.stringify(item)) ===
//         index,
//     )
//     localStorage.setItem("Recent Selected App", JSON.stringify(uniqueArray))
//   } else {
//     localStorage.setItem("Recent Selected App", JSON.stringify([appData]))
//   }

//   // if (device == "apple") {
//   //   dataLayer.push({ "event": "ios_app_select", "keyword": keyword, "gtm.elementId": applicationId, "gtm.elementUrl": appPackageURL, "gtm.uniqueAnalyticsReports": "AnalyticsLiveWeb_nl" });
//   // } else {
//   //   dataLayer.push({ "event": "play_app_select", "keyword": keyword, "gtm.elementId": applicationId, "gtm.elementUrl": appPackageURL, "gtm.uniqueAnalyticsReports": "AnalyticsLiveWeb_nl" });
//   // }

//   try {
//     mainBoxHolder
//       .querySelector(".suggestions")
//       .classList.remove("format-suggestions")
//   } catch {}
//   try {
//     mainBoxHolder.querySelector(".close-search-form").classList.remove("hidden")
//   } catch {}
//   return { appPackageURL, applicationId, imageURL, device }
// }

// export async function fetchAndStoreAppDataToBox(
//   appPackageURL,
//   applicationId,
//   device,
//   country,
// ) {
//   if (device == "apple") {
//     let result = await fetchAppleAppData(appPackageURL, country)
//     const appData = JSON.stringify({ apple: result })
//     localStorage.setItem("selectedAppData", appData)
//     return result
//   } else {
//     let result = await fetchPlayStoreAppData(applicationId, country)
//     const appData = JSON.stringify({ android: result })
//     localStorage.setItem("selectedAppData", appData)
//     return result
//   }
// }
// async function fetchPlayStoreAppData(applicationId, t) {
//   const url = `https://store.maakeetoo.com/apps/details/?id=${applicationId}&gl=${t}`
//   try {
//     const response = await fetch(url)
//     return await response.json()
//   } catch (error) {
//     throw new Error(`Error fetching Play Store app data: ${error}`)
//   }
// }

// Update other section to selected app
// export async function updateOtherSectionToSelectedApp(
//   appPackageURL,
//   applicationId,
//   imageURL,
//   device,
//   country,
// ) {
//   const countryResult = countries.find(cn => cn.code === country.toLowerCase())
//   const countryName = country ? countryResult.name : country
//   const flag = countryFlagImages[country]
//   countrySelectBtn.forEach(button => {
//     const result = button.offsetWidth > 200 ? true : false
//     let cName = result ? countryName : country.toUpperCase()
//     button.setAttribute("country-code", country)
//     button.setAttribute("country-name", cName)
//     const oldSpanElement = button.firstElementChild
//     // Create a new span element
//     const newSpan = document.createElement("span")
//     // Create a text node for the country code
//     const countryCodeNode = document.createTextNode(cName)
//     // Append the img and text nodes to the new span element
//     const clonedFlag = flag.cloneNode(true)
//     newSpan.appendChild(clonedFlag)
//     newSpan.appendChild(countryCodeNode)
//     // Replace the existing span element with the new span element
//     button.replaceChild(newSpan, oldSpanElement)
//   })
//   calculatePriceForSelectedApp(
//     appPackageURL,
//     applicationId,
//     imageURL,
//     device,
//     document.querySelector("#search-box1"),
//   )
//   document.querySelector("#custom-contact-btn").classList.add("hidden")
//   let pricingBtn = document.querySelector("#solutions")
//   pricingBtn.click()
//   pricingBtn.scrollIntoView({ behavior: "smooth" })
//   const response = await fetchAndStoreAppDataToBox(
//     appPackageURL,
//     applicationId,
//     device,
//     country,
//   )
//   const allMiniContainer = document.querySelectorAll(".mini-main-container")
//   showResponseToAllSmallBox(response, device, allMiniContainer)
//   try {
//     closeSearchBtn.forEach(close => {
//       close.classList.remove("hidden")
//     })
//   } catch {}
// }

