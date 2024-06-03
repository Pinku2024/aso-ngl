import { useAtom } from "jotai";
import { showAppSelected, userSelectedApp } from "../../context/store";
import { useQuery } from "@tanstack/react-query";
import { fetchAndStoreAppDataToBox } from "../util";
import { useEffect, useRef, useState } from "react";

const CTR = ({ mobile }) => {
  const [userSelectedAppObject, setuserSelectedAppObject] =
    useAtom(userSelectedApp);
  const [appSelected, setAppSelected] = useAtom(showAppSelected);
  const [sliderValue, setSliderValue] = useState(null);
  const { appPackageURL, applicationId, device, country } =
    userSelectedAppObject;
  const sliderRef = useRef();
  const { data, isFetched } = useQuery({
    queryKey: ["get single app data in ctr", userSelectedAppObject],
    queryFn: () =>
      fetchAndStoreAppDataToBox(appPackageURL, applicationId, device, country),
  });
  useEffect(() => {
    if (isFetched) {
      if (device === "apple") {
        setSliderValue(Number(data?.averageUserRating.toFixed(1)) + 0.05);
      }
      if (device === "android") {
        setSliderValue(Number(data?.score.toFixed(1)) + 0.05);
      }
    }
  }, [isFetched]);
  let currentSliderValue;
  if (device === "apple") {
    currentSliderValue = data?.averageUserRating.toFixed(1);
  }
  if (device === "android") {
    currentSliderValue = data?.score.toFixed(1);
  }
  let requiredRatings;
  if (isFetched && device === "apple") {
    requiredRatings = displayCalculatedRankToUserApple(data, sliderValue);
  }
  if (isFetched && device === "android") {
    requiredRatings = displayCalculatedRankToUser(data, sliderValue);
  }
  function displayCalculatedRankToUserApple(appData, targetRating) {
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
    return Number(formattedResult).toLocaleString();
  }
  function displayCalculatedRankToUser(reviewData, targetRating) {
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
    return Number(formattedResult).toLocaleString();
  }
  console.log(data);
  return (
    <>
      {isFetched && device === "apple" && (
        <div className={`app-info-display ctr ${mobile}`}>
          <div className="w-embed w-script">
            <div className="app-basic-info-box">
              <div className="app-img-box">
                <img
                  src={data.artworkUrl100}
                  alt="application logo"
                  className="app-image"
                />
              </div>
              <div className="app-information">
                <div>
                  <h4>{data.trackName}</h4>
                </div>
                <div>
                  <img src="/assets/imgs/target.svg" alt="R: " />
                  <strong>{data.averageUserRating.toFixed(1)}</strong>
                  <em> {data.genres[0]}</em>
                </div>
                <div className="app-developer-name">By {data.artistName}</div>
              </div>
            </div>
            <div className="milestones">
              <h4>Next Milestone</h4>
              <div className="milestones-images">
                <div className="current-milestone">
                  <img src="/assets/imgs/current.svg" alt="currentIMG" />
                  <span> {data.averageUserRating.toFixed(1)}</span>
                </div>
                <img src="/assets/imgs/Arrow-vector-blue.svg" alt="Arrow" />
                <div className="next-milestone">
                  <img src="/assets/imgs/target.svg" alt="nextIMG" />
                  <span>4.9</span>
                </div>
              </div>
            </div>
            <div>
              <div className="slider-intro-text">
                <h4>
                  What rating are you aiming for within the upcoming 60 days?
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
                  defaultValue={data.averageUserRating.toFixed(1)}
                  onChange={(e) => {
                    if (
                      e.target.value <
                      Number(data?.averageUserRating.toFixed(1))
                    ) {
                      setSliderValue(
                        Number(data.averageUserRating.toFixed(1)) + 0.05
                      );
                    } else {
                      setSliderValue(parseFloat(e.target.value));
                    }
                  }}
                />
                <strong>{sliderValue}</strong>
              </div>
            </div>
            <div className="result-text-box">
              <h5>
                To achieve the target, you need to attain {requiredRatings}{" "}
                ratings daily for the next 60 days.
              </h5>
            </div>
            <ul className="review-suggestion-list">
              <h4>Our Suggestion to Improve Ratting</h4>
              <li className="review-first-line ">Sementic Anomalies.</li>
              <li className="review-second-line ">ML based rating prompts.</li>
              <li className="review-third-line">
                Integrate our SDK, or allow API access to your analytics.
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
      )}
      {isFetched && device === "android" && (
        <div className={`app-info-display ctr ${mobile}`}>
          <div className="w-embed w-script">
            <div className="app-basic-info-box">
              <div className="app-img-box">
                <img
                  src={data.icon}
                  alt="application logo"
                  className="app-image"
                />
              </div>
              <div className="app-information">
                <div>
                  <h4>{data.title}</h4>
                </div>
                <div>
                  <img src="/assets/imgs/target.svg" alt="R: " />
                  <strong>{data.score.toFixed(1)}</strong>
                  <em> {data.genre}</em>
                </div>
                <div className="app-developer-name"></div>
              </div>
            </div>
            <div className="milestones">
              <h4>Next Milestone</h4>
              <div className="milestones-images">
                <div className="current-milestone">
                  <img src="/assets/imgs/current.svg" alt="currentIMG" />
                  <span> {data.score.toFixed(1)}</span>
                </div>
                <img src="/assets/imgs/Arrow-vector-blue.svg" alt="Arrow" />
                <div className="next-milestone">
                  <img src="/assets/imgs/target.svg" alt="nextIMG" />
                  <span>4.9</span>
                </div>
              </div>
            </div>
            <div>
              <div className="slider-intro-text">
                <h4>
                  What rating are you aiming for within the upcoming 60 days?
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
                  defaultValue={data.score.toFixed(1)}
                  onChange={(e) => {
                    if (e.target.value < Number(data?.score.toFixed(1))) {
                      setSliderValue(Number(data.score.toFixed(1)) + 0.05);
                    } else {
                      setSliderValue(parseFloat(e.target.value));
                    }
                  }}
                />
                <strong>{sliderValue}</strong>
              </div>
            </div>
            <div className="result-text-box">
              <h5>
                To achieve the target, you need to attain {requiredRatings}{" "}
                ratings daily for the next 60 days.
              </h5>
            </div>
            <ul className="review-suggestion-list">
              <h4>Our Suggestion to Improve Ratting</h4>
              <li className="review-first-line ">Sementic Anomalies.</li>
              <li className="review-second-line ">ML based rating prompts.</li>
              <li className="review-third-line">
                Integrate our SDK, or allow API access to your analytics.
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
      )}
    </>
  );
};

export default CTR;
