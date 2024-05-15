import { useState } from 'react';
import axios from 'axios';
import MovieList from './movieList/index'
import SearchForm from './search/index';

const Movie = () => {
    const [movies, setMovies] = useState([]);

    //   const fetchDefaultMovie = async () => {
    //     try {
    //       const response = await axios.get('your_default_movie_api_url');
    //       setMovies([response.data]);
    //     } catch (error) {
    //       console.error('Error fetching default movie:', error);
    //     }
    //   };

    const searchMovies = async (query) => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?t=${query}&page=2&apikey=dbee93e2`);
            setMovies(response.data);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    console.log('hello umair', movies)

    return (
        <div className='login-form-container'>
            <h1>Movie Search App</h1>
            <SearchForm onSearch={searchMovies} />
            <MovieList movies={movies} />
        </div>
    );
};

export default Movie;