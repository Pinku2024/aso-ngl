import Image from "next/image";
import React from "react";

const AppIntelligence = () => {
  return (
    <section id="aso-intelligence" className="section bg-neutral-200">
      <div className="container-default w-container">
        <div className="top-content service-features flex">
          <div className="split-content service-features-left">
            <div
              data-w-id="2408ce64-3e73-6c5b-6f9c-1dd071cb45ea"
              style={{
                WebkitTransform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                MozTransform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                msTransform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                transform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                opacity: "1", // Make sure opacity value is a string
              }}
              className="subtitle hidden"
            >
              Our Services
            </div>
            <h2
              data-w-id="2408ce64-3e73-6c5b-6f9c-1dd071cb45ec"
              // style={{
              //   WebkitTransform:
              //     "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              //   MozTransform:
              //     "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              //   msTransform:
              //     "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              //   transform:
              //     "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              //   opacity: "1", // Make sure opacity value is a string
              // }}
              className="title service-features"
            >
              Our Data &amp; Processes
            </h2>
            <p>
              Our ASO Innovation Stack - that captures everything from the app
              stores.
            </p>
          </div>
        </div>
        <div
          data-w-id="2408ce64-3e73-6c5b-6f9c-1dd071cb45f1"
          className="w-layout-grid service-features-grid"
        >
          <div className="card service-feature flex-data-process">
            <div className="image-wrapper service-feature">
              <Image
                width={128}
                height={136}
                src="assets/imgs/icon-service-feature-1-seo-template.svg"
                alt="Keyword Research - SEO Webflow Template"
                className="image service-feature"
              />
            </div>
            <div>
              <h3>Listing Intelligence</h3>
              <p>
                Identify the keywords that your competitors are using. Keep a
                close eye on the changes they make.
              </p>
            </div>
          </div>
          <div className="card service-feature">
            <div className="image-wrapper service-feature _1">
              <Image
                width={128}
                height={133}
                // layout="responsive"
                src="assets/imgs/icon-service-feature-2-seo-template.svg"
                alt="Keyword Ranking - SEO Webflow Template"
                className="image service-feature"
              />
            </div>
            <h3>Anomalies</h3>
            <p>
              About 5% of the total 1-star reviews tend to be sementic
              mismatches. And there&#x27;s a way to fix it.
            </p>
          </div>
          <div className="card service-feature">
            <div className="image-wrapper service-feature _2">
              <Image
                width={128}
                height={119}
                src="assets/imgs/icon-service-feature-3-seo-template.svg"
                alt="Competitor Analysis - SEO Webflow Template"
                className="image service-feature"
              />
            </div>
            <h3>Ratings &amp; MHR</h3>
            <p>
              Get historical ranking context - based on the rating and MHR (Most
              Helpful Review Section) Score - developed by us.
            </p>
          </div>
          <div className="card service-feature">
            <div className="image-wrapper service-feature">
              <Image
                width={128}
                height={145}
                src="assets/imgs/icon-service-feature-4-seo-template.svg"
                alt="Website Optimization - SEO Webflow Template"
                className="image service-feature"
              />
            </div>
            <h3>Engagement and Open Count</h3>
            <p>
              Our app intelligence, that tells you the engagement time of your
              peers, and help you improve on it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppIntelligence;
