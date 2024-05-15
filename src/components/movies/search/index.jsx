import './style.scss'
import '../../../assets/styles/global.scss';
import PropTypes from 'prop-types';

import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
                <input style={{ width: "80%", marginLeft: "80px", marginBottom: "4px" }}
                    type="text"

                    placeholder="Search for movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button style={{ width: "80%", marginLeft: "80px" }} type="submit">Search</button>
            </div>
        </form>
    );
};

SearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchForm;