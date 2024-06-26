import {
  fetchAndStoreAppDataToBox,
  fetchPriceData,
  getDataObjectForApple,
  getDataObjectForPlay,
} from "../util";
import { useAtom } from "jotai";
import { userSelectedApp } from "../../context/store";
import { useQuery } from "@tanstack/react-query";
import AppBasicInfoPricing from "./AppBasicInfoPricing";
import Link from "next/link";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
const SelectedAppPricing = () => {
  const [userSelectedAppObject, setuserSelectedAppObject] = useAtom(userSelectedApp);
  const { appPackageURL, applicationId, device, country } = userSelectedAppObject;
  let dataObject;

  const [sliderValue, setSliderValue] = useState(5000);
  const [sliderPriceData, setSliderPriceData] = useState(5000);
  const [minValue, setMinValue] = useState(1000);
  const [maxValue, setMaxValue] = useState(30000);
  const { data, isFetched } = useQuery({
    queryKey: [
      "get single app data in our pricing section",
      userSelectedAppObject,
    ],
    queryFn: () =>
      fetchAndStoreAppDataToBox(appPackageURL, applicationId, device, country),
  });

  if (isFetched) {
    if (device === "apple") {
      dataObject = getDataObjectForApple(data);
    }
    if (device === "android") {
      dataObject = getDataObjectForPlay(data);
    }
  }
  const { data: priceData, isFetched: priceDataFetched } = useQuery({
    queryKey: ["get price data in our pricing section", device, dataObject],
    queryFn: () => fetchPriceData(device, dataObject),
  });
  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
    setSliderPriceData(newValue);
  };
  useEffect(() => {
    const max = parseInt((parseInt(priceData) * 7) / 1000) * 1000;
    const min = parseInt(parseInt(priceData) / 2 / 500) * 500;
    setSliderPriceData(priceData);
    setSliderValue(priceData);
    setMinValue(min);
    setMaxValue(max);
  }, [priceData]);
  return (
    <>
      {isFetched && (
        <div
          id="app-pricing-box_Pr"
          className="card-2 contact google_play-store new"
        >
          <div className="package-card logic">
            <AppBasicInfoPricing data={data} device={device} />
            <div className="card-package-content pricing">
              <div className="heading card-package-features-new">
                How we improve?
              </div>
              <div className="grid-wrapper-flex">
                <div className="w-layout-grid grid-8">
                  <div
                    id="w-node-_5232b42b-7451-0536-8c39-cebc65da80f2-f93c043d"
                    className="packahe-feature-wrapper"
                  >
                    <Image
                      width={23}
                      height={23}
                      loading="lazy"
                      src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                      alt="Check Icon - NextLabs.io"
                      className="ckeck-icon"
                    />
                    <div
                      id="Conditional-Android-iOS-1"
                      className="feature-pointer"
                    >
                      Improve visitors - using keyword ranks and similar app
                      section ML based rating improvement plan.
                    </div>
                  </div>
                  <div
                    id="w-node-_5232b42b-7451-0536-8c39-cebc65da80f6-f93c043d"
                    className="packahe-feature-wrapper"
                  >
                    <Image
                      width={23}
                      height={23}
                      loading="lazy"
                      src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                      alt="Check Icon - NextLabs.io"
                      className="ckeck-icon"
                    />
                    <div className="feature-pointer">
                      Complimentary tools for tracking and establishing
                      performance goals (KPIs)
                    </div>
                  </div>
                  <div
                    id="w-node-_5232b42b-7451-0536-8c39-cebc65da80fa-f93c043d"
                    className="packahe-feature-wrapper hidden"
                  >
                    <Image
                      width={23}
                      height={23}
                      loading="lazy"
                      src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                      alt="Check Icon - NextLabs.io"
                      className="ckeck-icon"
                    />
                    <div
                      id="Conditional-Statement-1"
                      className="feature-pointer"
                    >
                      Get into Similar App Section of competitors.
                    </div>
                  </div>
                </div>
                <div className="w-layout-grid grid-8">
                  <div
                    id="w-node-_5232b42b-7451-0536-8c39-cebc65da80ff-f93c043d"
                    className="packahe-feature-wrapper"
                  >
                    <Image
                      width={23}
                      height={23}
                      loading="lazy"
                      src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                      alt="Check Icon - NextLabs.io"
                      className="ckeck-icon"
                    />
                    <div
                      id="Conditional-Android-iOS-2"
                      className="feature-pointer"
                    >
                      Conversion improvement - by focusing on MHR score, A/B
                      testing.
                    </div>
                  </div>
                  <div
                    id="w-node-_5232b42b-7451-0536-8c39-cebc65da8103-f93c043d"
                    className="packahe-feature-wrapper"
                  >
                    <Image
                      width={23}
                      height={23}
                      loading="lazy"
                      src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                      alt="Check Icon - NextLabs.io"
                      className="ckeck-icon"
                    />
                    <div className="feature-pointer">
                      Enhance engagement and retention by utilizing your
                      analytics tool through the our BI pipeline.
                    </div>
                  </div>
                  <div
                    id="w-node-_5232b42b-7451-0536-8c39-cebc65da8107-f93c043d"
                    className="packahe-feature-wrapper hidden"
                  >
                    <Image
                      width={23}
                      height={23}
                      loading="lazy"
                      src="/assets/imgs/64c7749ac04c9db7ccffa1fb_icon-package-feature-seo-template.svg"
                      alt="Check Icon - NextLabs.io"
                      className="ckeck-icon"
                    />
                    <div
                      id="Conditional-Statement-2"
                      className="feature-pointer"
                    >
                      Get Ranked on App Packs  Section.
                    </div>
                  </div>
                </div>
              </div>
              <div className="calculated-pricing-component_wrapper">
                <div className="pricing-info-text">Recommended Budget</div>
                {!priceDataFetched && (
                  <h4 id="Pricing-Amount" className="calculated-pricing">
                    <span className="suffix">
                      Please wait.. We are getting you best price
                    </span>
                  </h4>
                )}
                {priceDataFetched && (
                  <h4 id="Pricing-Amount" className="calculated-pricing">
                    ${sliderPriceData}
                    <span className="suffix">/month onwards</span>
                  </h4>
                )}
              </div>
              <div>
                <div className="html-embed-35 w-embed">
                  <input
                    type="range"
                    min={minValue || 0 }
                    max={maxValue || 0}
                    value={sliderValue ?? ""}
                    onChange={handleSliderChange}
                    className="slider"
                    id="rangeSlider"
                  />
                </div>
              </div>
              <div className="personal-plan-offer">
                <h5 className="personal-plan-heading">Want a personal plan?</h5>
                <div className="custom-plan-paragraph">
                  Want a full proposal or have a different budget in mind? We
                  cater to budgets of all sizes.
                </div>
                <div className="button-wrapper bottom">
                  <Link
                    href="#request-a-quote"
                    className="button-primary-4 width-max alternate w-button"
                  >
                    Let’s discuss
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedAppPricing;
