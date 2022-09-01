import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import MoviesList from '../MoviesList.component';

afterEach(() => {
    cleanup();
})

test('should render MoviesList component', () => {
    const movies = [
        {
            Title: "Test Film 1",
            Year: "2022",
            imbdID: "tt00001",
            Poster: "test1.jpg",
        },
        {
            Title: "Test Film 2",
            Year: "2022",
            imbdID: "tt00002",
            Poster: "test2.jpg",
        },
    ];


    render(<MoviesList movies={movies} />);
    const MoviesListElement = screen.getByTestId('test-ens-movielist');
    expect(MoviesListElement).toBeInTheDocument();
})