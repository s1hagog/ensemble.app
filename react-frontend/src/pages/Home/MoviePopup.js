// Movie popup component that user sees when clicking on the poster
const MoviePopup = ({ trigger, setTrigger, movie }) => {

    return (trigger) ? (
        <div className="ens-movie-popup" data-testid="test-ens-movie-popup">
            <div className="ens-popup-inner">
                <div className="left-block">
                    <div className="ens-movie-image">
                        <img src={movie.Poster} alt={movie.imdbID}></img>
                    </div>
                </div>
                <div className="right-block">
                    <div className="ens-movie-title">{movie.Title}</div>
                    <div className="ens-movie-year">Release Year: {movie.Year}</div>
                    <button className="btn btn-dark mt-4">Watch Later</button>
                </div>
                <button className="btn-close btn-close-white" aria-label="Close" onClick={() => setTrigger(false)}></button>
            </div>
        </div>
    ) : '';
}

export default MoviePopup;