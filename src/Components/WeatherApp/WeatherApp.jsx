import React, { useEffect, useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear from '../Assets/clear.png'
import cloud from '../Assets/cloud.png'
import drizzle from '../Assets/drizzle.png'
import humid from '../Assets/humidity.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'
import mist from '../Assets/mist.png'

const WeatherApp = () => {

    let api_key = "01ad2ccb90d5dd3e5c5d7dffc4cfed83";
    const [wicon, setWicon] = useState(cloud);

    useEffect( () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    }, []);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput")
        console.log(element)
        if(element[0].value === "") {
            return 0;
        } else {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
            let response = await fetch(url)
            let data = await response.json()

            const humidity = document.getElementsByClassName("humidity-percent")
            const wind = document.getElementsByClassName("wind-rate")
            const temp = document.getElementsByClassName("weather-temp")
            const location = document.getElementsByClassName("weather-location")
        
            humidity[0].innerHTML = data.main.humidity + " %";
            wind[0].innerHTML = Math.floor(data.wind.speed) + " kmph";
            temp[0].innerHTML = Math.floor(data.main.temp) + " °C";
            location[0].innerHTML = data.name;

            if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
                setWicon(clear)
            } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
                setWicon(cloud)
            } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n'){
                setWicon(drizzle)
            } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n'){
                setWicon(drizzle)
            } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n' || data.weather[0].icon === '10d' || data.weather[0].icon === '10n' || data.weather[0].icon === '11d' || data.weather[0].icon === '11n'){
                setWicon(rain)
            } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
                setWicon(snow)
            } else if (data.weather[0].icon === '50d' || data.weather[0].icon === '50n'){
                setWicon(mist)
            } else {
                setWicon(clear)
            }
        }
    }

    return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' className='cityInput' placeholder='Search City' />
            <div className='search-icon' onClick={() => search()}>
                <img src={search_icon} alt='' />
            </div>
        </div>
        <div className='weather-image'>
            <img src={wicon} alt='' className='cloud-icon' />
        </div>
        <div className='weather-temp'>
            24° C
        </div>
        <div className='weather-location'>
            London
        </div>
        <div className='data-container'>
            <div className='element'>
                <img src={humid} alt='' className='icon' />
                <div className='data'>
                    <div className='humidity-percent'>64 %</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
            <div className='element'>
                <img src={wind} alt='' className='icon' />
                <div className='data'>
                    <div className='wind-rate'>18 kmph</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp