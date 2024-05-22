import { useEffect, useState } from "react";
import Link from "next/link";

const AppSearch = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Function to close the popup
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const closePopup = () => {
    setIsPopupVisible(false);
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      //   console.log(
      //     e.target.classList,
      //     e.target.classList.contains(
      //       "app-search-box-holder" ||
      //         "search-box_holder" ||
      //         "code-left" ||
      //         "main-box-holder" ||
      //         "search-box-suggestion" ||
      //         "search-input" ||
      //         "app-output-box"
      //     )
      //   );
      const searchHolder = document.getElementById("suggestions-box1");
      const target = e.target;
      if (target.classList.contains("search-input")) {
        console.log("Search input clicked");
      } else if (target.classList.contains("close-search-form")) {
        console.log("Close search form button clicked");
      } else if (target.classList.contains("skeleton-box")) {
        console.log("Skeleton box clicked");
      } else {
        searchHolder.classList.remove("format-suggestions");
      }
    });
  });

  return (
    <div className="app-search-box-holder">
      <div className="search-box_holder flex-custom width">
        <div className="code-left">
          <div id="search-box1" className="main-box-holder">
            <div className="search-box-suggestion">
              <div className="main-search-bar">
                <input
                  type="text"
                  autoComplete="off"
                  id="search-bar-input1"
                  className="search-input"
                  placeholder="Search your iOS or android app"
                />
                <button
                  id="close-search-form1"
                  className="hidden close-search-form"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="16px"
                    height="16px"
                    viewBox="0 0 16 16"
                    version="1.1"
                  >
                    <g id="surface1">
                      <path
                        style={{
                          fill: "#5a5a5c",
                          fillRule: "nonzero",
                          fillOpacity: 1,
                          stroke: "none",
                        }}
                        d="M 0.332031 0.332031 C 0.546875 0.121094 0.839844 -0.00390625 1.144531 -0.00390625 C 1.445312 -0.00390625 1.738281 0.121094 1.953125 0.332031 L 8 6.382812 L 14.046875 0.332031 C 14.496094 -0.113281 15.21875 -0.113281 15.667969 0.332031 C 16.113281 0.78125 16.113281 1.503906 15.667969 1.953125 L 9.617188 8 L 15.667969 14.046875 C 16.113281 14.496094 16.113281 15.21875 15.667969 15.667969 C 15.21875 16.113281 14.496094 16.113281 14.046875 15.667969 L 8 9.617188 L 1.953125 15.667969 C 1.503906 16.113281 0.78125 16.113281 0.332031 15.667969 C -0.113281 15.21875 -0.113281 14.496094 0.332031 14.046875 L 6.382812 8 L 0.332031 1.953125 C 0.121094 1.738281 -0.00390625 1.445312 -0.00390625 1.144531 C -0.00390625 0.839844 0.121094 0.546875 0.332031 0.332031 Z M 0.332031 0.332031 "
                      ></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="app-output-box">
                <div
                  id="searching-shimmer1"
                  className="hidden searching-shimmer"
                >
                  <ul className="o-vertical-spacing o-vertical-spacing--l">
                    <li className="blog-post o-media">
                      <div className="o-media__figure">
                        <span className="skeleton-box"></span>
                      </div>
                      <div className="o-media__body">
                        <div className="o-vertical-spacing">
                          <h3 className="blog-post__headline">
                            <span
                              className="skeleton-box"
                              style={{ width: "55%" }}
                            ></span>
                          </h3>
                          <p>
                            <span
                              className="skeleton-box"
                              style={{ width: "80%" }}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="blog-post o-media">
                      <div className="o-media__figure">
                        <span className="skeleton-box"></span>
                      </div>
                      <div className="o-media__body">
                        <div className="o-vertical-spacing">
                          <h3 className="blog-post__headline">
                            <span
                              className="skeleton-box"
                              style={{ width: "55%" }}
                            ></span>
                          </h3>
                          <p>
                            <span
                              className="skeleton-box"
                              style={{ width: "80%" }}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="blog-post o-media">
                      <div className="o-media__figure">
                        <span className="skeleton-box"></span>
                      </div>
                      <div className="o-media__body">
                        <div className="o-vertical-spacing">
                          <h3 className="blog-post__headline">
                            <span
                              className="skeleton-box"
                              style={{ width: "55%" }}
                            ></span>
                          </h3>
                          <p>
                            <span
                              className="skeleton-box"
                              style={{ width: "80%" }}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="blog-post o-media">
                      <div className="o-media__figure">
                        <span className="skeleton-box"></span>
                      </div>
                      <div className="o-media__body">
                        <div className="o-vertical-spacing">
                          <h3 className="blog-post__headline">
                            <span
                              className="skeleton-box"
                              style={{ width: "55%" }}
                            ></span>
                          </h3>
                          <p>
                            <span
                              className="skeleton-box"
                              style={{ width: "80%" }}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="blog-post o-media">
                      <div className="o-media__figure">
                        <span className="skeleton-box"></span>
                      </div>
                      <div className="o-media__body">
                        <div className="o-vertical-spacing">
                          <h3 className="blog-post__headline">
                            <span
                              className="skeleton-box"
                              style={{ width: "55%" }}
                            ></span>
                          </h3>
                          <p>
                            <span
                              className="skeleton-box"
                              style={{ width: "80%" }}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="blog-post o-media">
                      <div className="o-media__figure">
                        <span className="skeleton-box"></span>
                      </div>
                      <div className="o-media__body">
                        <div className="o-vertical-spacing">
                          <h3 className="blog-post__headline">
                            <span
                              className="skeleton-box"
                              style={{ width: "55%" }}
                            ></span>
                          </h3>
                          <p>
                            <span
                              className="skeleton-box"
                              style={{ width: "80%" }}
                            ></span>
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <ul
                  id="suggestions-box1"
                  className="suggestions"
                  onClick={(e) => handleClick(e)}
                ></ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card-2 contact apple-ios-app_store hidden">
          <div className="app-logo_holder small-icon">
            <img
              src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
              loading="lazy"
              alt=""
              id="Platform-form-logo"
              className="logo-image-lead small-icon-platform"
            />
          </div>
          <div className="app-logo_holder bottom-spacing-margin">
            <img
              id="iOS-form-logo"
              loading="lazy"
              height=""
              alt="ios-app-logo"
              src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
              className="logo-image-lead"
            />
          </div>
          <div className="w-form">
            <form
              id="wf-form-ContactUsForm2"
              name="wf-form-ContactUsForm"
              data-name="ContactUsForm"
              method="get"
              data-wf-page-id="6576f808b0f14ea0f93c043d"
              data-wf-element-id="74b03cde-6fdc-298a-3713-4dbaa67e1f5d"
            >
              <div className="w-layout-grid contact-form-grid">
                <div
                  id="w-node-_74b03cde-6fdc-298a-3713-4dbaa67e1f61-f93c043d"
                  className="input-wrapper"
                >
                  <label htmlFor="name-2">Full Name</label>
                  <input
                    className="input-4 w-input"
                    maxLength="256"
                    name="name-2"
                    data-name="Name 2"
                    placeholder="What’s your name?"
                    type="text"
                    id="name-2"
                    required=""
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="Emailaddress">Email Address</label>
                  <input
                    className="input-4 w-input"
                    maxLength="256"
                    name="Email"
                    data-name="Email"
                    placeholder="What’s your email?"
                    type="email"
                    id="Emailaddress2"
                    required=""
                  />
                </div>
                <div className="input-wrapper-2">
                  <label htmlFor="Phone" className="field-label">
                    Phone
                  </label>
                  <input
                    className="input-2 w-input"
                    maxLength="256"
                    name="Phone-3"
                    data-name="Phone 3"
                    placeholder="What&#x27;s your phone number?"
                    type="tel"
                    id="Phone-3"
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor="Message-2">Message</label>
                  <textarea
                    id="Message2"
                    name="Message-2"
                    maxLength="5000"
                    data-name="Message 2"
                    placeholder="What can we help you with?"
                    className="message-2 w-input"
                  ></textarea>
                </div>
                <input
                  type="submit"
                  data-wait="Please wait..."
                  id="w-node-_74b03cde-6fdc-298a-3713-4dbaa67e1f71-f93c043d"
                  className="button-primary-2 request-a-quote w-button"
                  value="Submit App"
                />
              </div>
            </form>
            <div className="success-message w-form-done">
              <div className="text-block-23">
                Your message has been submitted. <br />
                We will get back to you within 24-48 hours.
              </div>
              <div className="button-holder-error-message">
                <Link
                  href="#"
                  id="get-custom-pricing-btn"
                  className="button-primary-cleint width-small w-button"
                >
                  Get Custom Pricing
                </Link>
              </div>
            </div>
            <div className="error-message w-form-fail">
              <div>Oops! Something went wrong.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSearch;
