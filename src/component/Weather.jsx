import React, { useEffect, useState, } from 'react'
import './Weather.css'
import search_icon from '../assets/search-icon.png'
import Clear_icon from '../assets/clear-sun-icon.png'
import humidity_icon from '../assets/humidity-icon.png'
import wind_icon from '../assets/wind-icon.png'
import rainy_icon from '../assets/rainy-icons.png'
import drizzle_icon from '../assets/drizzle-icon.png'
import cloud_icon from '../assets/cloud-icon.png'
import { useRef } from 'react'


const Weather = () => {
  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": Clear_icon,
    "01n": Clear_icon,
    "02d": Clear_icon,
    "02n": drizzle_icon,
    "03d": rainy_icon,
    "03n": rainy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d":  cloud_icon,
    "09n": cloud_icon,
    "010d": cloud_icon,
    "010n": rainy_icon,
    "013d": Clear_icon,
    "013n": rainy_icon,


  }


  const search = async (city) => {
    if (city ===""){
       alert("Enter City Name")
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon]  || clear_icon
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

    } catch (error) {

    }
  }
  useEffect(() => {
    search("london");
  }, [])

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="" onClick={()=>search (inputRef.current.value)} />
      </div>
      <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temperature}</p>
      <p className='location'>{weatherData.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" className='humidity' />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="" className='wind-speed ' />
          <div>
            <p>{weatherData.windSpeed}</p>
            <span>Wind speed</span>
          </div>
        </div>
      </div>


    </div>


  )
}

export default Weather;