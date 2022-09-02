import '@testing-library/jest-dom'
import { render, screen, cleanup } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import Searchbox from '../Searchbox.component';

afterEach(() => {
    cleanup();
})

test('sample test', () => {
    expect(true).toBe(true);
})

test('should render Searchbox component', () => {
    render(<Searchbox />);
    const SearchboxElement = screen.getByTestId('test-ens-searchbox');
    expect(SearchboxElement).toBeInTheDocument();
})

test('should add input value to Searchbox', () => {
    const testValue = 'Test value';

    render(<Searchbox value={testValue} />);
    const SearchboxElement = screen.getByDisplayValue(testValue);
    expect(SearchboxElement).toBeInTheDocument();

})

test('matches snapshot', () => {
    const testValue = 'Test value';

    const tree = TestRenderer.create(<Searchbox value={testValue} />).toJSON();
    expect(tree).toMatchSnapshot();
}) 