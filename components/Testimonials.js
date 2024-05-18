import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState("tab1");
  return (
    <>
      <section
        id="testimonials"
        className="section-2 bg-neutral-200 small-padding"
      >
        <div className="container-large-1051px tabs">
          <div className="top-content testimonials centre-aligned">
            <div className="split-content testimonials-left">
              <div
                data-w-id="b6a8be3b-3ec1-49ac-4497-99252f215b37"
                style={{
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: 1,
                }}
                className="subtitle hidden"
              >
                Testimonials
              </div>
              <h2
                data-w-id="b6a8be3b-3ec1-49ac-4497-99252f215b39"
                style={{
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
                className="title-4 testimonials centre-aligned"
              >
                Read what our amazing clients say
              </h2>
            </div>
            <div
              data-w-id="b6a8be3b-3ec1-49ac-4497-99252f215b3b"
              style={{
                transform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                WebkitTransform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                MozTransform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                msTransform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                opacity: "1",
              }}
              className="split-content testimonials-right"
            >
              <a href="#" className="button-primary hidden w-button">
                Contact us
              </a>
            </div>
          </div>
          <div
            data-duration-in="300"
            data-duration-out="100"
            data-current="Tab 1"
            data-easing="ease"
            className="testimonials-tabs w-tabs"
          >
            <div
              data-w-id="b6a8be3b-3ec1-49ac-4497-99252f215b3f"
              style={{
                WebkitTransform:
                  "translate3d(0, 0, 0) scale3d(0.97, 0.97, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                MozTransform:
                  "translate3d(0, 0, 0) scale3d(0.97, 0.97, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                msTransform:
                  "translate3d(0, 0, 0) scale3d(0.97, 0.97, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                transform:
                  "translate3d(0, 0, 0) scale3d(0.97, 0.97, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                opacity: "1",
              }}
              className="testimonials-tabs-menu w-tab-menu"
            >
              <a
                data-w-tab="Tab 1"
                className={`testimonial-tab-link w-inline-block w-tab-link ${
                  activeTestimonial === "tab1" ? "w--current" : ""
                }`}
                onClick={() => setActiveTestimonial("tab1")}
              >
                <div className="testimonial-tab-content">
                  <div className="testimonial-tab-name">Tushar Pathak</div>
                  <div className="testimonial-tab-job">Bajaj Finserv</div>
                </div>
              </a>
              <a
                data-w-tab="Tab 2"
                className={`testimonial-tab-link w-inline-block w-tab-link ${
                  activeTestimonial === "tab2" ? "w--current" : ""
                }`}
                onClick={() => setActiveTestimonial("tab2")}
              >
                <div className="testimonial-tab-content">
                  <div className="testimonial-tab-name">Abhinav Mathur</div>
                  <div className="testimonial-tab-job">
                    Insanely Good by Swiggy
                  </div>
                </div>
              </a>
              <a
                data-w-tab="Tab 3"
                className={`testimonial-tab-link w-inline-block w-tab-link ${
                  activeTestimonial === "tab3" ? "w--current" : ""
                }`}
                onClick={() => setActiveTestimonial("tab3")}
              >
                <div className="testimonial-tab-content">
                  <div className="testimonial-tab-name">Ashish Kumar </div>
                  <div className="testimonial-tab-job">Urban Company</div>
                </div>
              </a>
              <a
                data-w-tab="Tab 4"
                className={`testimonial-tab-link w-inline-block w-tab-link ${
                  activeTestimonial === "tab4" ? "w--current" : ""
                }`}
                onClick={() => setActiveTestimonial("tab4")}
              >
                <div className="testimonial-tab-content">
                  <div className="testimonial-tab-name">Abhilash Joseph</div>
                  <div className="testimonial-tab-job"> Fisdom</div>
                </div>
              </a>
            </div>
            <div
              data-w-id="b6a8be3b-3ec1-49ac-4497-99252f215b58"
              style={{
                WebkitTransform:
                  "translate3d(0, 0, 0) scale3d(0.97, 0.97, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                MozTransform:
                  "translate3d(0, 0, 0) scale3d(0.97, 0.97, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                Mstransform:
                  "translate3d(0, 0, 0) scale3d(0.97, 0.97, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                transform:
                  "translate3d(0, 0, 0) scale3d(0.97, 0.97, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                opacity: "1",
              }}
              className="testimonials-tabs-content w-tab-content"
            >
              <div
                data-w-tab="Tab 1"
                className={`testimonial-tab w-tab-pane ${
                  activeTestimonial === "tab1" ? "w--tab-active" : ""
                }`}
              >
                <div className="testimonial-wrapper">
                  <div className="split-content testimonial-content">
                    <h3>
                      “
                      <span className="text-span">Customised ASO strategy</span>{" "}
                      by NextGrowth Labs has helped us in improving app&#x27;s{" "}
                      <span className="text-span">rankings</span> and{" "}
                      <span className="text-span">visibility</span>”
                    </h3>
                    <p>
                      &quot;I am delighted to express my utmost satisfaction
                      with the exceptional services provided by NextGrowth Labs.
                      From the outset, the team at NextGrowth Labs exhibited a
                      profound understanding of ASO principles, coupled with
                      industry first approach of solving complex problems. One
                      of the standout qualities is their commitment to tailoring
                      their services to meet our unique needs and optimising
                      keywords from our extensive product portfolio. <br />‍
                      <br />
                      NextGrowth Labs is very much tech driven and has helped us
                      create tools for tracking activities and results.
                      Customised ASO strategy by NextGrowth Labs has helped us
                      in improving app&#x27;s rankings and visibility, leading
                      to a noticeable increase in organic downloads of the app.{" "}
                      <br />‍<br />
                      Sincere thanks to the entire team at NextGrowth Labs for
                      their outstanding work and commitment to our app&#x27;s
                      success!&quot;
                    </p>
                    <div className="about-testimonial-wrapper">
                      <div className="split-content about-testimonial-left">
                        <div className="about-testimonial-name">
                          Tushar Pathak
                        </div>
                        <div className="about-testimonial-job">
                          Growth Lead at Bajaj Finserv
                        </div>
                      </div>
                      <div className="about-testimonial-company-wrapper">
                        <Image
                          width={315}
                          height={84}
                          layout="responsive"
                          alt=""
                          src="/assets/imgs/Bajaj_Finserv_Logo.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-w-tab="Tab 2"
                className={`testimonial-tab w-tab-pane ${
                  activeTestimonial === "tab2" ? "w--tab-active" : ""
                }`}
              >
                <div className="testimonial-wrapper">
                  <div className="split-content testimonial-content">
                    <h3>
                      &quot; The team not only delivered on time but also met
                      our expectations.{" "}
                      <span className="text-span">
                        Onboarding them helped us improve conversions.
                      </span>{" "}
                      I appreciate their professionalism and delivery excellence
                      and highly recommend them. &quot;
                    </h3>
                    <div className="about-testimonial-wrapper">
                      <div className="split-content about-testimonial-left">
                        <div className="about-testimonial-name">
                          Abhinav Mathur
                        </div>
                        <div className="about-testimonial-job">
                          Insanely Good by Swiggy
                        </div>
                      </div>
                      <div className="about-testimonial-company-wrapper">
                        <img alt="" src="/assets/imgs/Swiggy_logo.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-w-tab="Tab 3"
                className={`testimonial-tab w-tab-pane ${
                  activeTestimonial === "tab3" ? "w--tab-active" : ""
                }`}
              >
                <div className="testimonial-wrapper">
                  <div className="split-content testimonial-content">
                    <h3>
                      “NextGrowth Labs has been able to deliver{" "}
                      <span className="text-span">exceptional results</span>.
                      Their{" "}
                      <span className="text-span">
                        tools, insights, are top notch
                      </span>
                      , and they have great deal of
                      <span className="text-span">
                        attention to detail and technical expertise
                      </span>
                      .”
                    </h3>
                    <p>
                      &quot;I worked with Nextlabs for both ASO and SEO for
                      Urbanclap earlier, and now with Badger holdings.
                      NextGrowth Labs has been able to deliver exceptional
                      results. Their tools, insights, are top notch, and they
                      have great deal of attention to detail and technical
                      expertise. When we hired them, we wanted to tell them what
                      to do - eventually, they aced to the point where they were
                      able to tell us what we should be doing. Their grip on
                      data and using first principles in marketing is
                      outstanding. There has hardly been a problem that they
                      haven&#x27;t been able to solve.&quot;
                    </p>
                    <div className="about-testimonial-wrapper">
                      <div className="split-content about-testimonial-left">
                        <div className="about-testimonial-name">
                          Ashish Kumar Bhalla
                        </div>
                        <div className="about-testimonial-job">
                          Urban Company
                        </div>
                      </div>
                      <div className="about-testimonial-company-wrapper">
                        <img
                          alt=""
                          src="/assets/imgs/Urban-Company-logosvg.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-w-tab="Tab 4"
                className={`testimonial-tab w-tab-pane ${
                  activeTestimonial === "tab4" ? "w--tab-active" : ""
                }`}
              >
                <div className="testimonial-wrapper">
                  <div className="split-content testimonial-content">
                    <h3>
                      “I liked their{" "}
                      <span className="text-span">
                        innovative and data driven approach
                      </span>
                      . Throughout our relationship, they maintained{" "}
                      <span className="text-span">
                        clear communication and transparency
                      </span>
                      .”
                    </h3>
                    <p>
                      We&#x27;ve been working with NextGrowthLabs for last 3
                      years. The team at NextGrowth Labs is very knowledgeable
                      and data driven. They took the time to understand my
                      business goals, industry dynamics, and target audience. I
                      liked their innovative and data driven approach. <br />
                      Throughout our relationship, they maintained clear
                      communication and transparency. They&#x27;d proactively
                      handle the project, kept me informed at every stage for
                      any important update and came up with a solution. I highly
                      recommend them.
                    </p>
                    <div className="about-testimonial-wrapper">
                      <div className="split-content about-testimonial-left">
                        <div className="about-testimonial-name">
                          Abhilash Joseph
                        </div>
                        <div className="about-testimonial-job">
                          Senior Business Lead, Fisdom
                        </div>
                      </div>
                      <div className="about-testimonial-company-wrapper">
                        <img alt="" src="/assets/imgs/fisdom-logo-svg.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
