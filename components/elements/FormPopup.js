import React, { useState, useRef } from "react";
// import { useSelectedApp } from "../../context/EventContext"
import { useAtom } from "jotai";
import { popupVisibleAtom } from "../../context/store";
const FormPopup = () => {
  // const { setIsPopupVisible } = useSelectedApp()
  const [_, setIsPopupVisible] = useAtom(popupVisibleAtom);
  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const formRef = useRef(null);
  const successMessageRef = useRef(null);
  const errorMessageRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageData = formRef.current.getAttribute("app-url");
    const { name, email, phone, message } = formData;
    const pageURL = window.location.href;

    const domains = [
      "yahoo",
      "protonmail",
      "aol",
      "mail",
      "gmail",
      "outlook",
      "hotmail",
      "zoho",
      "icloud",
      "gmx",
    ];
    const domain = email.slice(email.indexOf("@") + 1, email.lastIndexOf("."));
    let con_value;
    if (domains.includes(domain)) {
      con_value = 331;
    } else if (email === "") {
      con_value = 331;
    } else {
      con_value = 1237;
    }

    // const eventNameW =
    //   imageData.split("/")[2].split(".")[1] === "apple"
    //     ? "iOS_hsForm_field"
    //     : "play_hsForm_field";

    // if (typeof dataLayer !== "undefined" && Array.isArray(dataLayer)) {
    //   dataLayer.push({
    //     event: eventNameW,
    //     "gtm.username": name,
    //     "gtm.email": email,
    //     "gtm.elementUrl": imageData,
    //     "gtm.uniqueAnalyticsReports": "AnalyticsHSFormWeb_nl",
    //     "gtm.phone": phone,
    //     "gtm.currency": "INR",
    //     "gtm.value": con_value,
    //     "gtm.message": message,
    //   });
    // }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      fields: [
        { name: "firstname", value: name },
        { name: "email", value: email },
        { name: "phone", value: phone },
        // { name: "app_url", value: imageData },
        { name: "message", value: message },
      ],
      context: { pageUri: pageURL },
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://api.hsforms.com/submissions/v3/integration/submit/3885214/efaf7e24-de65-496d-9983-ffb476f65524",
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          response.text().then((result) => {
            showSuccessMessage();
            hideForm();
            console.log(result);
          });
        } else {
          showErrorMessage();
        }
      })
      .catch((error) => {
        console.log("error", error);
        showErrorMessage();
      });
  };

  const showSuccessMessage = () => {
    console.log("Success");
    successMessageRef.current.style.display = "block";
    errorMessageRef.current.style.display = "none";
  };

  const showErrorMessage = () => {
    console.log("Error");
    successMessageRef.current.style.display = "none";
    errorMessageRef.current.style.display = "block";
  };

  const hideForm = () => {
    formRef.current.style.display = "none";
  };

  return (
    <section id="lead-form" className="form-section">
      <div className="form-holder">
        <div className="loginpopupcontainer" onClick={closePopup}>
          <div
            className="popup-content contact lead-form spacing"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="close-button-holder">
              <img
                src="/assets/imgs/close-button.svg"
                loading="lazy"
                alt=""
                className="image-17"
                onClick={closePopup}
              />
            </div>
            <div>
              <h2 className="heading-large-sf1 feature-heading form-heading">
                Please help us know your app better
              </h2>
            </div>
            <div className="hide w-embed"></div>
            <div className="w-form">
              <form
                id="wf-form-ContactUsForm2"
                name="wf-form-ContactUsForm"
                data-name="ContactUsForm"
                method="get"
                data-wf-page-id="655b4946de8f0a7d98a3ef9a"
                data-wf-element-id="1d566998-4cdd-874b-92c0-4111bfd764a7"
                onSubmit={handleSubmit}
                ref={formRef}
              >
                <div className="html-embed-42 w-embed"></div>
                <div className="w-layout-grid contact-form-grid">
                  <div className="input-wrapper">
                    <label htmlFor="name-4">Full Name</label>
                    <input
                      type="text"
                      className="input-4 w-input"
                      maxLength="256"
                      name="name"
                      placeholder="What’s your name?"
                      id="name-2"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="Emailaddress-3">Email Address</label>
                    <input
                      type="email"
                      className="input-4 w-input"
                      maxLength="256"
                      name="email"
                      placeholder="What’s your email?"
                      id="Emailaddress2"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-wrapper-2">
                    <label htmlFor="Phone-5" className="field-label">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="input-2 w-input"
                      maxLength="256"
                      name="phone"
                      placeholder="What&#x27;s your phone number?"
                      id="Phone-3"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="Message-3">Message</label>
                    <textarea
                      id="Message2"
                      name="message"
                      maxLength="5000"
                      placeholder="What can we help you with?"
                      className="message-2 w-input"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <input
                    type="submit"
                    value="Submit App"
                    data-wait="Please wait..."
                    className="button-primary-2 request-a-quote w-button"
                  />
                </div>
              </form>
              <div
                className="success-message w-form-done"
                ref={successMessageRef}
              >
                <div className="text-block-23">
                  {/* Your message has been submitted. <br />
                  We will get back to you within 24-48 hours. */}
                  Request submitted! Our team will get in touch within 24-48
                  hours
                </div>
                <div className="button-holder-error-message"></div>
              </div>
              <div className="error-message w-form-fail" ref={errorMessageRef}>
                <div>Oops! Something went wrong.</div>
              </div>
            </div>
            <div
              bind="e13c0449-4019-f45b-f539-378de6e63eea"
              className="hide w-embed"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormPopup;
