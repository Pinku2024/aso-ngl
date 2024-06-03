import { fetchAndStoreAppDataToBox } from "../util";
import { useAtom } from "jotai";
import { showAppSelected, userSelectedApp } from "../../context/store";
import { useQuery } from "@tanstack/react-query";
import AppBasicInfo from "./AppBasicInfo";
const MHRScore = ({ mobile }) => {
  const [userSelectedAppObject, setuserSelectedAppObject] =
    useAtom(userSelectedApp);
  const { appPackageURL, applicationId, device, country } =
    userSelectedAppObject;

  const { data, isFetched } = useQuery({
    queryKey: ["get single app data in mhr score", userSelectedAppObject],
    queryFn: () =>
      fetchAndStoreAppDataToBox(appPackageURL, applicationId, device, country),
  });
  return (
    <div className={`app-info-display mhr ${mobile}`}>
      <div className="w-embed">
        <AppBasicInfo data={data} device={device} />
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
