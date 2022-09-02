import { useEffect, useState } from 'react';
import { getRandomQuery, selectRandomMovie, sliderScrollToMovie } from './utils/functions';

// Simple Components
import Header from './components/Header.component';
import Searchbox from './components/ui/Searchbox.component';
import MoviesList from './pages/Home/MoviesList';
import MoviePopup from './pages/Home/MoviePopup';


function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [selectedMovie, setSelectedMovie] = useState({});
  const [moviePopup, setMoviePopup] = useState(false);
  const [randomMovieRequest, setRandomMovieRequest] = useState(false);

  // For future to setup our Error UI
  const [error, setError] = useState(null);


  // Function to prepare random movie search
  const prepareRandomMovieSearch = async () => {
    const randomQuery = getRandomQuery();
    setRandomMovieRequest(true);
    setSearchMovie(randomQuery);
  }

  // Main hook to the searchbox that triggers on changing user input
  useEffect(() => {
    // We dont want to do anything with no movie to search
    if (!searchMovie) return;

    const getMoviesRequest = async () => {
      const url = `http://www.omdbapi.com/?s=${searchMovie}&apikey=6b0d5914`;
      const response = await fetch(url);
      const json = await response.json();

      if (json.Search) {
        setMovies(json.Search);
      }
    }

    getMoviesRequest();

  }, [searchMovie]);


  // A hook that tracks changes in the movie list that checks if it was a request for random movie
  // or a user search for particular movie.
  // Side Note: I am quite sure it is not the best approach. However I could not find a way to ask my
  // random movie request to wait for movie list to render. The problem was that, because of asynchronous behaviour
  // the random movie request would always be first and not wait for movie list to render, causing errors or undesired behaviour.
  useEffect(() => {
    // We dont want to do anything if there is no movies in the list
    if (!movies || movies.length === 0) return;

    if (randomMovieRequest) {
      const randomMovie = selectRandomMovie(movies);
      sliderScrollToMovie(randomMovie);
      setSelectedMovie(randomMovie);
      setMoviePopup(true);
      setRandomMovieRequest(false);
    }
  }, [movies]);

  return (
    <div className="ens-app">
      <div className="container-fluid ens-nowrap">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <Header heading="Movies" />
          <Searchbox
            searchMovie={searchMovie}
            setSearchMovie={setSearchMovie}
          />
        </div>
      </div>
      <MoviesList
        movies={movies}
        setMoviePopup={setMoviePopup}
        setSelectedMovie={setSelectedMovie}
      />
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-dark mt-4" onClick={prepareRandomMovieSearch}>Find me a random movie</button>
      </div>
      <MoviePopup
        trigger={moviePopup}
        movie={selectedMovie}
        setTrigger={setMoviePopup}
      />
    </div>
  );
}

export default App;
