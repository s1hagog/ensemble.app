import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import MoviePopup from '../MoviePopup.component';

afterEach(() => {
    cleanup();
})

test('should render Movie Popup component', () => {
    const trigger = true;
    const movie = {
        Title: "Test Film",
        Year: "2022",
        imbdID: "tt00000",
        Poster: "test.jpg",
    }

    render(<MoviePopup trigger={trigger} movie={movie} setTrigger={false} />);
    const MoviePopupElement = screen.getByTestId('test-ens-movie-popup');
    expect(MoviePopupElement).toBeInTheDocument();
})

// test('should add header heading', () => {
//     const heading = 'Testing Heading';

//     render(<Header heading={heading} />);
//     const HeaderElement = screen.getByTestId('test-ens-header');
//     expect(HeaderElement).toBeInTheDocument();
//     expect(HeaderElement).toHaveTextContent(heading);
// })

// test('matches snapshot', () => {
//     const heading = 'Testing Heading';

//     const tree = TestRenderer.create(<Header heading={heading} />).toJSON();
//     expect(tree).toMatchSnapshot();
// })