import React from "react";

const CTR = ({ mobile }) => {
  return (
    <div className={`app-info-display ctr ${mobile}`}>
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
              <img src="/assets/imgs/current.svg" alt="currentIMG" />
              <span> 2.4</span>
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
            <h4>What rating are you aiming for within the upcoming 60 days?</h4>
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
            To achieve the target, you need to attain 6,000 ratings daily for
            the next 60 days.
          </h5>
        </div>
        <ul className="review-suggestion-list">
          <h4>Our Suggestion to Improve Ratting</h4>
          <li className="review-first-line hidden">Sementic Anomalies.</li>
          <li className="review-second-line hidden">
            ML based rating prompts.
          </li>
          <li className="review-third-line hidden">
            Integrate our SDK, or allow API access to your analytics.
          </li>
        </ul>
        <div className="main-button-box">
          <button type="submit" className="back-button">
            Back
          </button>
          <button className="contact-button-display-form">Submit App</button>
        </div>
      </div>
    </div>
  );
};

export default CTR;
