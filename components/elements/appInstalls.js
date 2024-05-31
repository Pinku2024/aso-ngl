import React from "react";

const appInstalls = () => {
  return (
    <div className="app-info-display installs mobile">
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
              <img src="/assets/imgs/milestonereached.svg" alt="currentIMG" />
              <span></span>
            </div>
            <img src="/assets/imgs/Arrow-vector-blue.svg" alt="Arrow" />
            <div className="next-milestone">
              <img src="/assets/imgs/milestonetarget.svg" alt="nextIMG" />
              <span></span>
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
            To achieve the target, you need to attain
            <em>6,000</em> installs daily for the next
            <em>180</em> days.
          </h5>
        </div>
        <ul className="review-suggestion-list">
          <h4>Our Suggestion to Improve Installs</h4>
          <li className="review-first-line">Detailed Keyword Research.</li>
          <li className="review-second-line">Content Gap Analysis.</li>
          <li className="review-third-line hidden">On-Page Recommendation.</li>
        </ul>
        <div className="main-button-box">
          {/* onClick this button will clear all the states regarding the selected app and all */}
          <button type="submit" className="back-button">
            Back
          </button>
          <button className="contact-button-display-form">Submit App</button>
        </div>
      </div>
    </div>
  );
};

export default appInstalls;
