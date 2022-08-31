import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Simple Components
import Header from './components/Header.component';
import Searchbox from './components/Searchbox.component';
import MoviesList from './components/MoviesList.component';
import MoviePopup from './components/MoviePopup.component';


function App() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [selectedMovie, setSelectedMovie] = useState({});
  const [moviePopup, setMoviePopup] = useState(false);

  const getMoviesRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchMovie}&apikey=6b0d5914`;
    const response = await fetch(url);
    const json = await response.json();
    
    if(json.Search){
      setMovies(json.Search);
    }
  }

  const sliderScrollRight = () => {
    const slider = document.querySelector('.ens-media-scroller');
    let scrollAmount = slider.scrollLeft;
    const scrollMax = slider.clientWidth;
    slider.scrollTo({
      top: 0,
      left: Math.max(scrollAmount += 500, scrollMax),
      behavior: 'smooth'
    });
  }

  useEffect (()=> {
    getMoviesRequest();
  }, [searchMovie]);

  return (
    <div className="ens-app">
      <div className="container-fluid ens-nowrap">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <Header heading="Movies"/>
          <Searchbox 
            searchMovie={searchMovie} 
            setSearchMovie={setSearchMovie} 
          />
        </div>
      </div>
      <div className="ens-media-scroller ens-snaps-inline">
        <MoviesList 
          movies={movies} 
          setMoviePopup={setMoviePopup}
          setSelectedMovie={setSelectedMovie}
        />
      </div>
      <button className="btn btn-dark mt-4" onClick={sliderScrollRight}>Test Scroll Button</button>
      <MoviePopup 
        trigger={moviePopup} 
        movie={selectedMovie}
        setTrigger={setMoviePopup}
      />
    </div>
  );
}

export default App;
