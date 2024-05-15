import { useState } from 'react';
import './style.scss';
import PropTypes from 'prop-types';

function SearchBar({ onCityChange }) {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCityChange(city)
        // Pass the city to the WeatherDisplay component
    };

    return (

        <div className="search-bar">
            <h2 className='d-flex justify-content-center'>Check Your Weather</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mb-2"
                />
                <button className='btn btn-primary' type="submit">Search</button>
            </form>
        </div>
    );
}

SearchBar.propTypes = {
    onCityChange: PropTypes.func.isRequired, // Update prop type to PropTypes.func
};

export default SearchBar