
const MoviesList = ({ movies, setMoviePopup, setSelectedMovie }) => {

    const onImageClick = (movie) => {
        setMoviePopup(true);
        setSelectedMovie(movie);
    }

    return (
        <div className="ens-movielist" data-testid="test-ens-movielist">
            {movies.map((movie, index) =>
                <div
                    key={`movie-${index}`}
                    className="ens-image-container d-flex justify-content-start"
                >
                    <div className="ens-movie-post" data-movie-imdb={movie.imdbID} onClick={() => onImageClick(movie)}>
                        <img src={movie.Poster} alt={`movie-${index}`}></img>
                        <div className="ens-overlay"></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MoviesList;