import Link from "next/link"
import Image from "next/legacy/image"
import Reveal from "../components/elements/Reveal"
const Other = () => {
  return (
    <>
      <div
        data-w-id="a08ad5f5-0a38-fd3d-c3bc-bd33a525ad0b"
        className="section bg-neutral-200"
      >
        <Reveal>
          <div className="container-default w-container">
            <div className="about-this-service-wrapper">
              <div className="images-wrapper about-this-service">
                <div className="sunburst-chart-1 w-embed w-script">
                  <Image
                    src="/assets/imgs/sunBrustChart.webp"
                    height={500}
                    width={500}
                    alt="sun-burst-chart"
                  />
                </div>
              </div>
              <div className="split-content about-this-service-left">
                <div className="subtitle hidden">about this service</div>
                <h2>Full spectrum on your acquisition channel</h2>

                <p className="paragraph about-this-service">
                  ● We work on all 7 areas of acquisition.
                  <br />● There are well over 20 sub-properties that influences
                  acquisition - eg: logo, brand name, ratings, etc.
                  <br />● There are at least 50 other properties that are
                  generally not covered, we work majority of them, behind the
                  doors.
                  <br />● Our proprietary technology .enables you to rank on any
                  keyword, or get into similar app section.
                  <br />● Our app store optimization service stands out in a
                  crowded market by delivering guaranteed results.
                </p>

                <div className="animation-div">
                  <Link
                    href="#request-a-quote"
                    className="button-primary w-button"
                  >
                    Schedule a Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="container-default w-container">
        <div className="divider"></div>
      </div>
      <Reveal>
        <div className="section our-process">
          <div className="container-large-1105px">
            <div className="top-content our-process flex-vert">
              <div className="split-content our-process-left padding-down">
                <div className="subtitle mb-8px hidden">Our Process</div>
                <h2 className="title-3 our-process cantre-align">
                  We can do lot more than what other agencies do! 🙌
                </h2>
              </div>
              <p className="paragraph-7 our-process centre-align">
                We unlock deep insights on traffic and engagement, surpassing
                standard analytics, by engaging the right users at the right
                time.
              </p>
            </div>
            <div className="container-default w-container">
              <div className="about-this-service-wrapper">
                <div className="split-content about-this-service-left">
                  <div className="subtitle hidden">about this service</div>
                  <h2>Engagement &amp; Retention</h2>
                  <p className="paragraph about-this-service">
                    ● Deep Insights on the traffic and engagement .<br />● Go
                    beyond your standard analytics.
                    <br />● Engage the right set of users at the right time.
                    <br />● Integrate that into your overall ASO SWOT analysis .
                  </p>
                  <div className="animation-div">
                    <Link
                      href="#request-a-quote"
                      className="button-primary w-button"
                    >
                      Schedule a Demo
                    </Link>
                  </div>
                </div>
                <div className="images-wrapper about-this-service">
                  <div className="sunburst-chart-1 w-embed w-script">
                    <Image
                      src="/assets/imgs/sunBurstChart2.webp"
                      height={500}
                      width={500}
                      alt="sun-burst-chart-2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container-default w-container">
              <div className="about-this-service-wrapper margin-top">
                <div className="images-wrapper about-this-service left-aligned">
                  <div className="image-wrapper about-this-service-1">
                    <Image
                      height={312}
                      width={415}
                      layout="responsive"
                      src="/assets/imgs/AdvRankDashboard.svg"
                      alt=""
                      className="image about-this-service-1"
                    />
                  </div>
                  <div className="image-wrapper about-this-service-2 new _2">
                    <Image
                      width={415}
                      height={147}
                      src="/assets/imgs/Dashboard-Float-two.svg"
                      alt=""
                      className="image about-this-service-1"
                    />
                  </div>
                </div>
                <div className="split-content about-this-service-left">
                  <div className="subtitle hidden">about this service</div>
                  <h2>Gain a 360° View of Your Customers</h2>
                  <p className="paragraph about-this-service">
                    Automatically build profiles for every user who visits your
                    app, storing demographic data along with all their different
                    interactions, campaign visits, and transaction history.
                  </p>
                  <div className="animation-div">
                    <Link
                      href="#request-a-quote"
                      className="button-primary w-button"
                    >
                      Talk to us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  )
}

export default Other
