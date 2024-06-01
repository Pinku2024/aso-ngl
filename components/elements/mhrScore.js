import React from "react";

const MHRScore = ({ mobile }) => {
  return (
    <div className={`app-info-display mhr ${mobile}`}>
      <div className="w-embed">
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
        <ul className="conversion-suggestion-list">
          <h4>Our Deep Recommendation</h4>
          <li className="conversion-first-line">
            Nice that you have added 8 Screenshots.
          </li>
          <li className="conversion-second-line">
            Great! Work Adding Video to your Store listing.
          </li>
          <li className="conversion-third-line">
            MHR Score is 40, This is not good for your ASO strategy.
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

export default MHRScore;
