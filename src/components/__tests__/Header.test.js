import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import Header from '../Header.component';

afterEach(() => {
    cleanup();
})

test('should render Header component', () => {
    const heading = 'Testing Heading';

    render(<Header heading={heading} />);
    const HeaderElement = screen.getByTestId('test-ens-header');
    expect(HeaderElement).toBeInTheDocument();
})

test('should add header heading', () => {
    const heading = 'Testing Heading';

    render(<Header heading={heading} />);
    const HeaderElement = screen.getByTestId('test-ens-header');
    expect(HeaderElement).toBeInTheDocument();
    expect(HeaderElement).toHaveTextContent(heading);
})

test('matches snapshot', () => {
    const heading = 'Testing Heading';

    const tree = TestRenderer.create(<Header heading={heading} />).toJSON();
    expect(tree).toMatchSnapshot();
})