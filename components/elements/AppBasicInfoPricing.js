import Image from "next/image";
const AppBasicInfoPricing = ({ data, device }) => {
  return (
    <>
      {data && device === "apple" && (
        <div className="top-part padding">
          <div className="image-content-wrapper centre-aligned centre-alignmed">
            <div className="app-logo-info_holder">
              <div className="app-logo_holder small-icon pricing">
                <Image
                  width={140}
                  height={140}
                  id="App-Platform"
                  loading="lazy"
                  src="https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f645042f50918e6e390f_app-store.svg"
                  alt=""
                  className="logo-image-lead small-icon-platform"
                />
              </div>
              <div className="app-logo_holder bottom-spacing-margin pricing">
                <Image
                  width={140}
                  height={140}
                  id="App-Icon"
                  loading="lazy"
                  alt="ios-app-logo"
                  src={data.artworkUrl100}
                  className="logo-image-lead"
                />
              </div>
            </div>
            <div className="name-content-wrapper left-margin">
              <h2 id="App-Name" className="titile-heading centre-alignmed">
                {data.trackName}
              </h2>
              <div id="App-Info" className="text-block-25">
                ⭐️ {data.averageUserRating.toFixed(1)} {data.genres[0]}
              </div>
            </div>
          </div>
        </div>
      )}
      {data && device === "android" && (
        <div className="top-part padding">
          <div className="image-content-wrapper centre-aligned centre-alignmed">
            <div className="app-logo-info_holder">
              <div className="app-logo_holder small-icon pricing">
                <Image
                  width={140}
                  height={140}
                  id="App-Platform"
                  loading="lazy"
                  src="https://uploads-ssl.webflow.com/63806eb7687817f7f9be26de/6492f644817f822625b18bb6_google-play-store.svg"
                  alt=""
                  className="logo-image-lead small-icon-platform"
                />
              </div>
              <div className="app-logo_holder bottom-spacing-margin pricing">
                <Image
                  width={140}
                  height={140}
                  id="App-Icon"
                  loading="lazy"
                  alt="ios-app-logo"
                  src={data.icon}
                  className="logo-image-lead"
                />
              </div>
            </div>
            <div className="name-content-wrapper left-margin">
              <h2 id="App-Name" className="titile-heading centre-alignmed">
                {data.title}
              </h2>
              <div id="App-Info" className="text-block-25">
                ⭐️ {data.score.toFixed(1)} {data.genre}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppBasicInfoPricing;
