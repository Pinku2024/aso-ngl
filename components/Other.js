// import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
const Other = () => {
  // useEffect(() => {
  //   const chart1 = (id) => {
  //     var dom = document.getElementById(id);
  //     var myChart = echarts.init(dom, null, {
  //       renderer: "canvas",
  //       useDirtyRect: false,
  //     });
  //     console.log("Canvas");
  //     var app = {};
  //     var option;
  //     var data = [
  //       {
  //         name: "Impression",
  //         children: [
  //           {
  //             name: "Discovery",
  //             children: [
  //               {
  //                 name: "Ranks",
  //                 value: 5,
  //               },
  //               {
  //                 name: "Similar Apps",
  //                 value: 2,
  //               },
  //               {
  //                 name: "Charts",
  //                 value: 2,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         name: "Conversion",
  //         children: [
  //           {
  //             name: "Listing",
  //             children: [
  //               {
  //                 name: "Description",
  //                 value: 2,
  //               },
  //               {
  //                 name: "Media",
  //                 value: 3,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         name: "CTR",
  //         children: [
  //           {
  //             name: "Brand Image",
  //             children: [
  //               {
  //                 name: "Logo",
  //                 value: 1,
  //               },
  //               {
  //                 name: "Ratings",
  //                 value: 2,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ];
  //     option = {
  //       series: {
  //         type: "sunburst",
  //         // emphasis: {
  //         //     focus: 'ancestor'
  //         // },
  //         data: data,
  //         radius: [0, "90%"],
  //         label: {
  //           rotate: "radial",
  //         },
  //       },
  //     };
  //     if (option && typeof option === "object") {
  //       myChart.setOption(option);
  //     }
  //     window.addEventListener("resize", myChart.resize);
  //   };
  //   document.addEventListener("scroll", initChartOnEvent);
  //   document.addEventListener("touchstart", initChartOnEvent);
  //   function initChartOnEvent(event) {
  //     initChart();
  //     event.currentTarget.removeEventListener(event.type, initChartOnEvent); // remove the event listener that got triggered
  //   }
  //   function initChart() {
  //     if (window.chartDidInit) {
  //       return false;
  //     }
  //     window.chartDidInit = true; // flag to ensure script does not get added to DOM more than once.
  //     var chartScript = document.createElement("script");
  //     chartScript.src =
  //       "https://fastly.jsdelivr.net/npm/echarts@5.3.3/dist/echarts.min.js";
  //     document.getElementsByTagName("body")[0].appendChild(chartScript);
  //     setTimeout(function () {
  //       chart1("chart-container-2");
  //       chart2();
  //     }, 1000);
  //   }

  //   const chart2 = () => {
  //     var dom = document.getElementById("chart-container-1");
  //     var myChart = echarts.init(dom, null, {
  //       renderer: "canvas",
  //       useDirtyRect: false,
  //     });
  //     var app = {};
  //     var option;
  //     // prettier-ignore
  //     const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p'];
  //     // prettier-ignore
  //     const days = ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
  //     // prettier-ignore
  //     const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
  //     const maxValue = data.reduce(function (max, item) {
  //       return Math.max(max, item[2]);
  //     }, -Infinity);
  //     option = {
  //       legend: {
  //         data: ["Active Users"],
  //       },
  //       polar: {},
  //       tooltip: {},
  //       visualMap: {
  //         type: "continuous",
  //         min: 0,
  //         max: maxValue,
  //         top: "middle",
  //         dimension: 2,
  //         calculable: true,
  //       },
  //       angleAxis: {
  //         type: "category",
  //         data: hours,
  //         boundaryGap: false,
  //         splitLine: {
  //           show: true,
  //           lineStyle: {
  //             color: "#ddd",
  //             type: "dashed",
  //           },
  //         },
  //         axisLine: {
  //           show: false,
  //         },
  //       },
  //       radiusAxis: {
  //         type: "category",
  //         data: days,
  //         z: 100,
  //       },
  //       series: [
  //         {
  //           name: "Active Users",
  //           type: "custom",
  //           coordinateSystem: "polar",
  //           itemStyle: {
  //             color: "#d14a61",
  //           },
  //           renderItem: function (params, api) {
  //             var values = [api.value(0), api.value(1)];
  //             var coord = api.coord(values);
  //             var size = api.size([1, 1], values);
  //             return {
  //               type: "sector",
  //               shape: {
  //                 cx: params.coordSys.cx,
  //                 cy: params.coordSys.cy,
  //                 r0: coord[2] - size[0] / 2,
  //                 r: coord[2] + size[0] / 2,
  //                 startAngle: -(coord[3] + size[1] / 2),
  //                 endAngle: -(coord[3] - size[1] / 2),
  //               },
  //               style: api.style({
  //                 fill: api.visual("color"),
  //               }),
  //             };
  //           },
  //           data: data,
  //         },
  //       ],
  //     };
  //     if (option && typeof option === "object") {
  //       myChart.setOption(option);
  //     }
  //     window.addEventListener("resize", myChart.resize);
  //   };
  // });

  return (
    <>
      <div
        data-w-id="a08ad5f5-0a38-fd3d-c3bc-bd33a525ad0b"
        className="section bg-neutral-200"
      >
        <div className="container-default w-container">
          <div className="about-this-service-wrapper">
            <div className="images-wrapper about-this-service">
              <div className="sunburst-chart-1 w-embed w-script">
                <div>
                  <Image
                    src="/assets/imgs/sunBrustChart.webp"
                    height={500}
                    width={500}
                    // layout="responsive"
                    alt="sun-burst-chart"
                  />
                </div>
              </div>
            </div>
            <div className="split-content about-this-service-left">
              <div
                data-w-id="a08ad5f5-0a38-fd3d-c3bc-bd33a525ad0f"
                style={{
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
                className="subtitle hidden"
              >
                about this service
              </div>
              <h2
                data-w-id="a08ad5f5-0a38-fd3d-c3bc-bd33a525ad11"
                style={{
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
              >
                A 360 Degree Focus on Your Acquisition Funnel
              </h2>
              <p
                data-w-id="a08ad5f5-0a38-fd3d-c3bc-bd33a525ad13"
                style={{
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
                className="paragraph about-this-service"
              >
                ● We work on all 7 areas of acquisition (
                <strong>
                  <em>
                    If you are on Desktop, You can click the chart to dive in
                  </em>
                </strong>
                ).
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
              <div
                data-w-id="a08ad5f5-0a38-fd3d-c3bc-bd33a525ad15"
                style={{
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
                className="animation-div"
              >
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
      </div>
      <div className="container-default w-container">
        <div
          data-w-id="2408ce64-3e73-6c5b-6f9c-1dd071cb466c"
          style={{
            WebkitTransform:
              "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            MozTransform:
              "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            msTransform:
              "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            transform:
              "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            opacity: "1",
          }}
          className="divider"
        ></div>
      </div>
      <div className="section our-process">
        <div className="container-large-1105px">
          <div className="top-content our-process flex-vert">
            <div className="split-content our-process-left padding-down">
              <div
                data-w-id="666a60c7-0210-e87c-3245-0bf6d4ab87f3"
                style={{
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
                className="subtitle mb-8px hidden"
              >
                Our Process
              </div>
              <h2
                data-w-id="666a60c7-0210-e87c-3245-0bf6d4ab87f5"
                style={{
                  WebkitTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  MozTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  msTransform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  transform:
                    "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                  opacity: "1",
                }}
                className="title-3 our-process cantre-align"
              >
                Best App Marketing Agency for a Reason
              </h2>
            </div>
            <p
              data-w-id="666a60c7-0210-e87c-3245-0bf6d4ab87f9"
              style={{
                WebkitTransform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                MozTransform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                msTransform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                transform:
                  "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                opacity: "1",
              }}
              className="paragraph-7 our-process centre-align"
            >
              We unlock deep insights on traffic and engagement, surpassing
              standard analytics, by engaging the right users at the right time.
            </p>
          </div>
          <div className="container-default w-container">
            <div className="about-this-service-wrapper">
              <div className="split-content about-this-service-left">
                <div
                  data-w-id="a8f96690-42ec-7f05-0855-a926811f9646"
                  style={{
                    WebkitTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    MozTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    msTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    transform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    opacity: "1",
                  }}
                  className="subtitle hidden"
                >
                  about this service
                </div>
                <h2
                  data-w-id="a8f96690-42ec-7f05-0855-a926811f9648"
                  style={{
                    WebkitTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    MozTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    msTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    transform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    opacity: "1",
                  }}
                >
                  Engagement &amp; Retention
                </h2>
                <p
                  data-w-id="a8f96690-42ec-7f05-0855-a926811f964a"
                  style={{
                    WebkitTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    MozTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    msTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    transform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    opacity: "1",
                  }}
                  className="paragraph about-this-service"
                >
                  ● Deep Insights on the traffic and engagement .<br />● Go
                  beyond your standard analytics.
                  <br />● Engage the right set of users at the right time.
                  <br />● Integrate that into your overall ASO SWOT analysis .
                </p>
                <div
                  data-w-id="a8f96690-42ec-7f05-0855-a926811f9658"
                  style={{
                    WebkitTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    MozTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    msTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    transform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    opacity: "1",
                  }}
                  className="animation-div"
                >
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
                <div
                  data-w-id="1528e271-f021-d693-0bfc-238dea6470be"
                  style={{
                    WebkitTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    MozTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    msTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    transform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    opacity: "1",
                  }}
                  className="image-wrapper about-this-service-2 new _2"
                >
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
                <div
                  data-w-id="5126ad55-90a0-56db-cba6-5e9cc42aa74b"
                  style={{
                    WebkitTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    MozTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    msTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    transform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    opacity: "1",
                  }}
                  className="subtitle hidden"
                >
                  about this service
                </div>
                <h2
                  data-w-id="5126ad55-90a0-56db-cba6-5e9cc42aa74d"
                  style={{
                    WebkitTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    MozTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    msTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    transform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    opacity: "1",
                  }}
                >
                  Get a complete view of each and every user
                </h2>
                <p
                  data-w-id="5126ad55-90a0-56db-cba6-5e9cc42aa74f"
                  style={{
                    WebkitTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    MozTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    msTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    transform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    opacity: "1",
                  }}
                  className="paragraph about-this-service"
                >
                  Automatically build profiles for every user who visits your
                  app, storing demographic data along with all their different
                  interactions, campaign visits, and transaction history.
                </p>
                <div
                  data-w-id="5126ad55-90a0-56db-cba6-5e9cc42aa751"
                  style={{
                    WebkitTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    MozTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    msTransform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    transform:
                      "translate3d(0, 60px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                    opacity: "1",
                  }}
                  className="animation-div"
                >
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
        </div>
      </div>
    </>
  );
};

export default Other;
