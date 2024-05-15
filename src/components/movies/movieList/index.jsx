import './style.scss'
import '../../../assets/styles/global.scss';
import PropTypes from 'prop-types';


import MovieItem from '../movieItem/index';

const MovieList = ({ movies }) => {
    console.log('movies', movies)
    return (
        <div>

            <MovieItem movie={movies} />

        </div>
    );
};

MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
};

export default MovieList;