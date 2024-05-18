// from audit.js
document
  .querySelector("#suggestions-box2")
  .addEventListener("click", (event) => {
    let { appPackageURL, applicationId, imageURL, device } =
      selectAppHandler(event);
    console.log(appPackageURL, applicationId, imageURL, device);
  });
document
  .querySelector("#suggestions-box3")
  .addEventListener("click", (event) => {
    let { appPackageURL, applicationId, imageURL, device } =
      selectAppHandler(event);
    console.log(appPackageURL, applicationId, imageURL, device);
  });
document
  .querySelector("#suggestions-box4")
  .addEventListener("click", (event) => {
    let { appPackageURL, applicationId, imageURL, device } =
      selectAppHandler(event);
    console.log(appPackageURL, applicationId, imageURL, device);
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
