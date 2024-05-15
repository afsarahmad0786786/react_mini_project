import { useState, useEffect } from 'react';
import './style.scss';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import { BiSun, BiCloudRain, BiCloud, BiMoon } from 'react-icons/bi';
import { RiSnowyFill } from 'react-icons/ri';

const WeatherDisplay = ({ cityName }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let date = moment().format('YYYY-MM-DD HH:mm:ss');
                let newDate = date.replace(' ', 'T')
                const key = 'N9YTZQVS4C34DDVUL9U9Q2FMG'
                const result = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${newDate}?unitGroup=metric&key=${key}&include=current,hours`);
                setWeatherData(result.data)
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        if (cityName) {
            fetchData();
        }
    }, [cityName]);
    console.log(weatherData)
    const renderWeatherIcon = (iconName) => {
        switch (iconName) {
            case 'clear-day':
                return <BiSun />;
            case 'clear-night':
                return <BiMoon />;
            case 'cloudy':
            case 'fog':
                return <BiCloud />;
            case 'hail':
                return <BiCloudRain />;
            case 'partly-cloudy-day':
                return <BiCloudRain />;
            case 'partly-cloudy-night':
                return <BiMoon />;
            case 'rain-snow-showers-day':
            case 'rain-snow-showers-night':
            case 'rain-snow':
            case 'rain':
            case 'showers-day':
            case 'showers-night':
            case 'snow-showers-day':
            case 'snow-showers-night':
            case 'snow':
                return <RiSnowyFill />;
            case 'thunder-rain':
            case 'thunder-showers-day':
            case 'thunder-showers-night':
            case 'thunder':
                return <BiCloudRain />;
            case 'wind':
                return <BiCloudRain />;
            default:
                return <BiCloud />;
        }
    };
    return (
        <div className="weather-display">
            {weatherData ? (
                <>
                    <h2>{(weatherData.address.toUpperCase())}</h2>
                    <div>
                        <span>{weatherData.currentConditions.icon}&nbsp;{renderWeatherIcon(weatherData.currentConditions.icon)}</span>
                        <p>{weatherData.currentConditions.description}</p>
                    </div>
                    <div>
                        <p>Temperature: {weatherData.currentConditions.temp} °C</p>
                    </div>
                </>
            ) : (
                <p>No weather data available</p>
            )}
        </div>
    );
}

WeatherDisplay.propTypes = {
    cityName: PropTypes.string.isRequired,
};

export default WeatherDisplay;
