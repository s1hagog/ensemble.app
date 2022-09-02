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



  const prepareRandomMovieSearch = async () => {
    const randomQuery = getRandomQuery();
    setRandomMovieRequest(true);
    setSearchMovie(randomQuery);
  }

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

  useEffect(() => {
    // We dont want to do anything if there is no movies in the list
    if (!movies || movies.length === 0) return;
    console.log('hello');

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
