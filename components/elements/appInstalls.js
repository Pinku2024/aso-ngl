import { useAtom } from "jotai";
import { showAppSelected, userSelectedApp } from "../../context/store";
import { useQuery } from "@tanstack/react-query";
import { fetchAndStoreAppDataToBox } from "../util";
import { useRef, useState } from "react";
import AppBasicInfo from "./AppBasicInfo";

const AppInstalls = ({ mobile }) => {
  const [userSelectedAppObject, setuserSelectedAppObject] = useAtom(userSelectedApp);
  const [appSelected, setAppSelected] = useAtom(showAppSelected);
  const { appPackageURL, applicationId, device, country } =
    userSelectedAppObject;
  const [sliderValue, setSliderValue] = useState(180);
  const sliderRef = useRef();
  const { data, isFetched } = useQuery({
    queryKey: ["get single app data in app installs", userSelectedAppObject],
    queryFn: () =>
      fetchAndStoreAppDataToBox(appPackageURL, applicationId, device, country),
  });
  // console.log(data);
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
  function displayCalculatedInstallsToUser(appData, sliderValue) {
    const maxInstalls = calculateNextMilestone(appData.minInstalls);
    const exactInstalls = appData.maxInstalls;
    const result = (maxInstalls - exactInstalls) / sliderValue;
    const formattedResult = result.toFixed(0);
    return Number(formattedResult).toLocaleString();
  }
  return (
    <>
      {!isFetched && <p>Your data is loading</p>}
      {isFetched && device === "apple" && (
        <div className={`app-info-display installs ${mobile}`}>
          <AppBasicInfo data={data} device={device} />
          {/* <div className="milestones">
            <h4>Next Milestone</h4>
            <div className="milestones-images">
              <div className="current-milestone">
                <img src="/assets/imgs/milestonereached.svg" alt="currentIMG" />
                <span>5.0 B</span>
              </div>
              <img src="/assets/imgs/Arrow-vector-blue.svg" alt="Arrow" />
              <div className="next-milestone">
                <img src="/assets/imgs/milestonetarget.svg" alt="nextIMG" />
                <span>10.0 B</span>
              </div>
            </div>
          </div> */}
          <div className="result-text-box hidden">
            <h5>
              To achieve the target, you need to attain
              <em>6,000</em> installs daily for the next
              <em>180</em> days.
            </h5>
          </div>
          <ul className="review-suggestion-list">
            <h4>Our Suggestion to Improve Installs</h4>
            <li className="review-first-line">Detailed Keyword Research.</li>
            <li className="review-second-line">Content Gap Analysis.</li>
            <li className="review-third-line">On-Page Recommendation.</li>
          </ul>
          <div className="main-button-box">
            {/* onClick this button will clear all the states regarding the selected app and all */}
            <button
              type="submit"
              className="back-button"
              onClick={() => {
                setuserSelectedAppObject({});
                setAppSelected(false);
              }}
            >
              Back
            </button>
            <button className="contact-button-display-form">Submit App</button>
          </div>
        </div>
      )}
      {isFetched && device === "android" && (
        <div className={`app-info-display installs ${mobile}`}>
          <AppBasicInfo data={data} device={device} />
          <div className="milestones">
            <h4>Next Milestone</h4>
            <div className="milestones-images">
              <div className="current-milestone">
                <img src="/assets/imgs/milestonereached.svg" alt="currentIMG" />
                <span>{formatReadableNumber(data.minInstalls)}</span>
              </div>
              <img src="/assets/imgs/Arrow-vector-blue.svg" alt="Arrow" />
              <div className="next-milestone">
                <img src="/assets/imgs/milestonetarget.svg" alt="nextIMG" />
                <span>
                  {formatReadableNumber(
                    calculateNextMilestone(data.minInstalls)
                  )}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="slider-intro-text">
              <h4>How fast do you want to reach the next Target.</h4>
            </div>
            <div className="range-slider-box" style={{ margin: "16px 0" }}>
              <input
                type="range"
                name="range-slider"
                id="install-slider2"
                className="app-range-slider"
                min="30"
                max="360"
                step="10"
                onChange={(e) => {
                  setSliderValue(e.target.value);
                }}
                ref={sliderRef}
                defaultValue="180"
              />
              <strong>{sliderValue} Days</strong>
            </div>
          </div>
          <div className="result-text-box">
            <h5>
              To achieve the target, you need to attain{" "}
              {displayCalculatedInstallsToUser(data, sliderValue)} installs
              daily for the next {sliderValue} days.
            </h5>
          </div>
          <ul className="review-suggestion-list">
            <h4>Our Suggestion to Improve Installs</h4>

            <li className="review-first-line">Detailed Keyword Research.</li>

            {sliderValue > 90 && (
              <li className="review-second-line">Content Gap Analysis.</li>
            )}
            {sliderValue > 180 && (
              <li className="review-third-line">On-Page Recommendation.</li>
            )}
          </ul>
          <div className="main-button-box">
            {/* onClick this button will clear all the states regarding the selected app and all */}
            <button
              type="submit"
              className="back-button"
              onClick={() => {
                setuserSelectedAppObject({});
                setAppSelected(false);
              }}
            >
              Back
            </button>
            <button className="contact-button-display-form">Submit App</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AppInstalls;
