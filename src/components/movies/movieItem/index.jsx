
import PropTypes from 'prop-types';
import './style.scss'; // Import your component-specific CSS file

const MovieItem = ({ movie }) => {
    return (
        <div className="movie-item-container" style={{ backgroundImage: `url(${movie.Poster})`, width: "80%", marginLeft: "85.5px" }}>
            {movie.Title ? (
                <div className='movie-details'>
                    <h2>{movie.Title}</h2>
                    <p>{movie.Released}</p>
                    <p>{movie.Plot}</p>
                    <p>{movie.Actors}</p>
                </div>
            ) : (
                <p>No Movie data available</p>
            )}
        </div>
    );
}

MovieItem.propTypes = {
    movie: PropTypes.object.isRequired,
};

export default MovieItem;
