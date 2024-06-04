import { fetchAndStoreAppDataToBox, fetchMHRScoreCombined } from "../util";
import { useAtom } from "jotai";
import { userSelectedApp, showAppSelected } from "../../context/store";
import { useQuery } from "@tanstack/react-query";
import AppBasicInfo from "./AppBasicInfo";
import Link from "next/link";
const MHRScore = ({ mobile }) => {
  const [userSelectedAppObject, setuserSelectedAppObject] =
    useAtom(userSelectedApp);
  const [appSelected, setAppSelected] = useAtom(showAppSelected);
  const { appPackageURL, applicationId, device, country } =
    userSelectedAppObject;
  let screenshots;
  let video;
  const { data, isFetched } = useQuery({
    queryKey: ["get single app data in mhr score", userSelectedAppObject],
    queryFn: () =>
      fetchAndStoreAppDataToBox(appPackageURL, applicationId, device, country),
  });
  const { data: mhrScore, isFetched: mhrFetched } = useQuery({
    queryKey: ["get mhr score", applicationId, country, device],
    queryFn: () => fetchMHRScoreCombined(applicationId, country, device),
  });
  if (isFetched) {
    if (device === "android") {
      screenshots = data?.screenshots.length;
      video = data?.video == undefined ? 1 : 2;
    }
    if (device === "apple") {
      screenshots = data?.screenshotUrls.length;
      const jpgCount = data?.screenshotUrls.filter(
        (url) =>
          url.toLowerCase().endsWith(".jpg") ||
          url.toLowerCase().endsWith(".webp")
      ).length;
      video = screenshots === jpgCount ? 1 : 2;
    }
  }
  return (
    <div className={`app-info-display mhr ${mobile}`}>
      <div className="w-embed">
        <AppBasicInfo data={data} device={device} />
        {mhrFetched && (
          <ul className="conversion-suggestion-list">
            <h4>Our Deep Recommendation</h4>
            {screenshots && screenshots < 4 && (
              <li className="conversion-first-line bad">
                Nice that you have added add {screenshots} screenshots. Please
                ensure that your screenshots capture the core features and
                experience of your app or game. It is recommended that you add
                upto 8 screenshots per device type
              </li>
            )}
            {screenshots && screenshots < 8 && (
              <li className="conversion-first-line mid">
                Great work adding {screenshots} screenshots. but Including all
                eight screenshots per device type can provide a comprehensive
                view of the app's functionality, features, and user interface.",
              </li>
            )}
            {screenshots && screenshots >= 8 && (
              <li className="conversion-first-line none">
                That's Awesome, you have used {screenshots} screenshots.This
                would also increases the chances of effectively communicating
                the app's value proposition by showcasing various aspects and
                functionalities.
              </li>
            )}
            {video && video === 1 && (
              <li className="conversion-second-line mid">
                Utilizing a video to showcase an app's value proposition offers
                users a preview of what to expect. A Video should highlights
                distinctive features, achievements, and provides insight into
                the user interface.
              </li>
            )}
            {video && video === 2 && (
              <li className="conversion-second-line none">
                Great! Work Adding Video to your Store listing. But Make Sure
                your video highlights distinctive features and provides insight
                into the user interface.
              </li>
            )}
            {mhrScore < 40 && (
              <li className="conversion-third-line bad">
                MHR Score is {mhrScore}, This is not good for your ASO strategy.
                You are losing Installs on your app.
              </li>
            )}
            {mhrScore > 40 && mhrScore < 80 && (
              <li className="conversion-third-line mid">
                MHR Score is {mhrScore}, Which is causing impact on your
                conversion Matrices. Having 80+ MHR Can Increase you conversion
                by 3%-5% from baseline.
              </li>
            )}
            {mhrScore > 80 && (
              <li className="conversion-third-line none">
                That's Nice your MHR Score is {mhrScore}, Having good MHR Score
                is reflected upon your overall conversion metrics.
              </li>
            )}
          </ul>
        )}
        <div className="main-button-box">
          <button
            type="submit"
            className="back-button"
            onClick={() => {
              setuserSelectedAppObject({});
              setAppSelected(false);
            }}
          >
            Back
          </button>
          <Link href="#request-a-quote">
          <button className="contact-button-display-form">Submit App</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MHRScore;
