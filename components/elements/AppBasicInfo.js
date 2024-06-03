const AppBasicInfo = ({ data, device }) => {
  return (
    <>
      {data && device === "apple" && (
        <div className="app-basic-info-box">
          <div className="app-img-box">
            <img
              src={data.artworkUrl100}
              alt="application logo"
              className="app-image"
            />
          </div>
          <div className="app-information">
            <div>
              <h4>{data.trackName}</h4>
            </div>
            <div>
              <img src="/assets/imgs/target.svg" alt="R: " />
              <strong>{data.averageUserRating.toFixed(1)}</strong>
              <em> {data.genres[0]}</em>
            </div>
            <div className="app-developer-name">By {data.artistName}</div>
          </div>
        </div>
      )}
      {data && device === "android" && (
        <div className="app-basic-info-box">
          <div className="app-img-box">
            <img src={data.icon} alt="application logo" className="app-image" />
          </div>
          <div className="app-information">
            <div>
              <h4>{data.title}</h4>
            </div>
            <div>
              <img src="/assets/imgs/target.svg" alt="R: " />
              <strong>{data.score.toFixed(1)}</strong>
              <em> {data.genre}</em>
            </div>
            <div className="app-developer-name"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppBasicInfo;
