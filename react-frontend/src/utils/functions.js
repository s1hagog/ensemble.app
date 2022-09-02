
// The function provides possible options for movie search. API is not accepting the search shorter
// than 3 characters. I have tried random letter, but it most of the times provide zero results. So this
// variation is pseudo-random and can be improved by longer dictionary with more search options.
export function getRandomQuery() {
    let result = '';
    const possibleOptions = [
        'car', 'cor', 'sta', 'ste', 'luc', 'lam', 'lol',
        'get', 'got', 'gam', 'pap', 'far', 'for', 'num',
        'opt', 'pos', 'old'
    ];
    result = possibleOptions[Math.floor(Math.random() * possibleOptions.length)];
    return result;
}

// Helper function to select random movie index out of provided movie list array
export function selectRandomMovie(movies) {
    const movie = movies[Math.floor(Math.random() * movies.length)];
    return movie;
}


// Function that adds scrolling to the selected movie
export function sliderScrollToMovie(movie) {
    const slider = document.querySelector('.ens-media-scroller');
    // reset
    slider.scrollTo({
        top: 0,
        left: 0,
    });

    const scrollTarget = slider.querySelector(`.ens-movie-post[data-movie-imdb=${movie.imdbID}]`);
    slider.scrollTo({
        top: 0,
        left: scrollTarget.getBoundingClientRect().left,
        behavior: 'smooth'
    });
}