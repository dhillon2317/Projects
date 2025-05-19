import "./current-weather.css";

const CurrentWeather = ({data}) => {
  return (
    <div className="weather">
      <div className="top">
      <div className="top-container">

        <div className="w-widget">
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>

        <div>
        <img alt="weather" className="weather-icon" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img>
        </div>

      </div>
      </div>
      <div className="bottom">
        <div className="temp">{Math.round(data.main.temp)}&deg;C</div>
        <div className="details"><p className="head">Details</p>
        <div className="info-container">

          <div className="info">

          <div>Feels like</div>
          <div>Wind</div>
          <div>Humidity</div>
          <div>Pressure</div>

          </div>
          <div className="value">
            <div>{Math.round(data.main.feels_like)}&deg;C</div>
            <div>{Math.round(data.wind.speed)} m/s</div>
            <div>{Math.round(data.main.humidity)}%</div>
            <div>{Math.round(data.main.pressure)} hpa</div>

          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
export default CurrentWeather;
