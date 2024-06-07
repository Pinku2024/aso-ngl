import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"
import Loader from "./elements/Loader"
const ContactForm = () => {
  const [isLoading, setLoading] = useState(false)
  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    phone: "",
    appURL: "",
    message: "",
  })
  const formRef = useRef(null)
  const successMessageRef = useRef(null);
  const errorMessageRef = useRef(null);
  const handleInput = e => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value })
  }

  const handleFormSubmission = e => {
    e.preventDefault()
    setLoading(true)
    hideForm()
    const imageData = formRef.current.getAttribute("app-url")
    const { name, email, phone, message } = formInput
    const pageURL = window.location.href

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
    ]
    const domain = email.slice(email.indexOf("@") + 1, email.lastIndexOf("."))
    let con_value
    if (domains.includes(domain)) {
      con_value = 331
    } else if (email === "") {
      con_value = 331
    } else {
      con_value = 1237
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

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    
    const fields = [
      { name: "firstname", value: name },
      { name: "email", value: email },
      { name: "phone", value: phone },
      { name: "message", value: message }
      ];
        if (imageData !== null) {
          fields.push({ name: "app_url", value: imageData });
        }
    const raw = JSON.stringify({
      fields,
      context: { pageUri: pageURL },
    })

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }

    fetch(
      "https://api.hsforms.com/submissions/v3/integration/submit/3885214/efaf7e24-de65-496d-9983-ffb476f65524",
      requestOptions,
    )
      .then(response => {
        if (response.ok) {
          response.text().then(result => {
            setLoading(false)
            showSuccessMessage()
            hideForm()
            console.log(result)
          })
        } else {
          setLoading(false)
          showErrorMessage()
        }
      })
      .catch(error => {
        console.log("error", error)
        setLoading(false)
        showErrorMessage()
      })
  }

  const showSuccessMessage = () => {
    console.log("Success")
    successMessageRef.current.style.display = "block"
    errorMessageRef.current.style.display = "none"
  }

  const showErrorMessage = () => {
    console.log("Error")
    unHideForm()
    successMessageRef.current.style.display = "none"
    errorMessageRef.current.style.display = "block"
  }

  const hideForm = () => {
    formRef.current.style.display = "none"
  }
  const unHideForm = () => {
    formRef.current.style.display = "block"
  }

  return (
    <section
      id="request-a-quote"
      className="section request-a-quote"
    >
      <div className="container-default w-container">
        <div className="request-a-quote-wrapper">
          <div className="split-content request-a-quote-left">
            <div className="subtitle hidden">Request a quote</div>
            <h2>Need help to boost your add-on rankings?</h2>
            <p className="paragraph request-a-quote">
              Elevate your app&#x27;s success with our ASO expertise – we
              specialize in optimizing keywords, enhancing visibility, boost
              app-installs, and maximize conversions for unparalleled app
              growth.
              <br />
              Get in touch with us, and a specialist will be with you in a few
              hours.
            </p>
            <div className="request-a-quote-contact-main-wrapper">
              <Link
                href="mailto:contact@nextgrowthlabs.com"
                className="request-a-quote-contact-wrapper w-inline-block"
              >
                <div className="image-wrapper request-a-quote-contact">
                  <Image
                    width={38}
                    height={28}
                    src="assets/imgs/icon-quote-contact-1-seo-template.svg"
                    alt="Email Icon - SEO Webflow Template"
                    className="image request-a-quote-contact"
                  />
                </div>
                <div
                  className="button-primary mail-btn"
                  style={{ height: "14px", lineHeight: "0" }}
                >
                  contact@nextgrowthlabs.com
                </div>
              </Link>
            </div>
          </div>

          
          <div className="split-content request-a-quote-right">
            <div className="card request-a-quote-form">
            {isLoading && <Loader />}
              <div className="w-form">
                <form
                  id="email-form-2"
                  name="email-form-2"
                  data-name="Email Form 2"
                  method="get"
                  data-wf-page-id="6576f808b0f14ea0f93c043d"
                  data-wf-element-id="2408ce64-3e73-6c5b-6f9c-1dd071cb4685"
                  onSubmit={handleFormSubmission}
                  ref={formRef}
                >
                  <div className="w-layout-grid request-a-quote-form-grid">
                    <div className="input-wrapper">
                      <label htmlFor="Name">Full Name</label>
                      <input
                        className="input w-input"
                        maxLength="256"
                        name="name"
                        data-name="Name"
                        placeholder="What’s your name?"
                        type="text"
                        id="Name"
                        required
                        value={formInput.name}
                        onChange={handleInput}
                      />

                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="Email">Email Address</label>
                      <input
                        className="input w-input"
                        maxLength="256"
                        name="email"
                        data-name="Email"
                        placeholder="What’s your company email?"
                        type="email"
                        id="Email"
                        required
                        value={formInput.email}
                        onChange={handleInput}
                      />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="Company">Phone </label>
                      <input
                        className="input w-input"
                        maxLength="256"
                        name="phone"
                        data-name="phone"
                        placeholder="What’s your phone number?"
                        type="number"
                        id="phone"
                        required
                        value={formInput.phone}
                        onChange={handleInput}
                      />
                    </div>
                    <div className="input-wrapper">
                      <label htmlFor="App-URL">App URL</label>
                      <input
                        className="input w-input"
                        maxLength="256"
                        name="appURL"
                        data-name="App URL"
                        placeholder="Please enter app url"
                        type="text"
                        id="App-URL"
                        // required
                        value={formInput.appURL}
                        onChange={handleInput}
                      />
                    </div>
                    <div
                      id="w-node-_2408ce64-3e73-6c5b-6f9c-1dd071cb4697-f93c043d"
                      className="input-wrapper"
                    >
                      <label htmlFor="Company">Message</label>
                      <textarea
                        placeholder="What can we help you with?"
                        maxLength="5000"
                        id="Message"
                        name="message"
                        data-name="Message"
                        className="message w-input"
                        required
                        value={formInput.message}
                        onChange={handleInput}
                      ></textarea>
                    </div>
                    <input
                      type="submit"
                      data-wait="Please wait..."
                      id="w-node-_2408ce64-3e73-6c5b-6f9c-1dd071cb469b-f93c043d"
                      className="button-primary w-button submitBtn"
                      value="Submit Details"
                    />
                  </div>
                </form>
                  <div className="success-message w-form-done" ref={successMessageRef}>
                    <div>
                      {/* Your request has been submitted. <br />
                      We will get back to you within 24-48 hours. */}
                      Request submitted! Our team will get in touch within 24-48
                      hours
                    </div>
                  </div>
                <div className="error-message w-form-fail" ref={errorMessageRef}>
                  <div>Oops! Something went wrong.</div>
                </div>
              </div>
            </div>
            <div className="bg request-a-quote-form-2"></div>
            <div className="bg request-a-quote-form-1"></div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactForm
