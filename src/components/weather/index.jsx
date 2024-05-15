import { useState } from 'react';
import SearchBar from './searchbar';
import WeatherDisplay from './weatherDisplay';
import '../../assets/styles/global.scss';

const Weather = () => {
    const [cityName, setCityName] = useState('');

    const handleCityChange = (city) => {
        setCityName(city);
    };

    return (
        <>

            <div className='login-form-container'>
                <SearchBar onCityChange={handleCityChange} />
                <WeatherDisplay cityName={cityName} />
            </div>
        </>
    );
};

export default Weather;