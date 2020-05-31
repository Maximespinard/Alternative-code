import React, { useState, Fragment, useEffect } from "react";

import "./Weather.css";

//config api
const api = {
  key: "8b638b05935dd7441ac8412197f91980",
  base: "http://api.openweathermap.org/data/2.5/",
};

const Weather = (props) => {
  //get location of user
  let locationUserDatas = {
    longitude: null,
    latitude: null,
    userAdress: null,
  };

  const [locationUser, setLocationUser] = useState(locationUserDatas);
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [backgroundContainer, setBackgroundContainer] = useState("");

  //au clique sur le button localisation je choppe la longitude et latitude
  //puis je converti ces données en ville et je l'insert dans l'input
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates, handleError);
      setInput("Localisation en cours ...");
    } else {
      alert("La géolocalisation n'est pas supporté par ce navigateur");
    }
  };

  useEffect(() => {
    //filtre permettant de ne pas recevoir une 400
    if (
      input === "Localisation en cours ..." &&
      locationUser.latitude !== null
    ) {
      //requête vers l'API avec mes coordonnées gps
      fetch(
        `${api.base}/weather?lat=${locationUser.latitude}&lon=${locationUser.longitude}&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          //j'obtient le nom de la ville et je l'inset dans mon input
          setInput(result.name);
          setWeather(result);
        });
    }
  });

  //je stock les coordonées dans mon state
  const getCoordinates = (position) => {
    setLocationUser({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    });
  };

  //gestion des erreurs
  const handleError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  };

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${input}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setInput("");
        });
    }
  };

  return (
    <div className="weather">
       <p 
       onClick={props.handleWeather}
       className="weather_exit">
        <i 
          className="fas fa-times "
        ></i></p>
      <div className="weather--wrapper">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyPress={search}
          type="text"
          placeholder="Votre position"
        />
        <i
          className="weather_search"
          onClick={getLocation}
          className="fas fa-crosshairs"
        ></i>
      </div>
      {typeof weather.main != "undefined" ? (
        <Fragment>
          <p className="weather_p--result">
            {weather.name} , {weather.sys.country}
          </p>
          {/* gestion du problème unité de mesure kevin et degrés */}
          <p className="weather_p--result">
            {Math.round(
              weather.main.temp > 55
                ? weather.main.temp - 273.15
                : weather.main.temp
            )}
            ºc
          </p>
          <p className="weather_p--result">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt="icone meteo"
            />
          </p>
        </Fragment>
      ) : (
        ""
      )}
    </div>
  );
};

export default Weather;
