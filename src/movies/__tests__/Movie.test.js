// imports
import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import Movie, { POSTER_PATH } from '../Movie';

// cleanup
afterEach(() => {
    cleanup();
    console.error.mockClear();
});

// mock console err
console.error = jest.fn();

// test that movie comp errors without props
test('<Movie />', () => {
    render(<Movie />);
    expect(console.error).toHaveBeenCalled();
});

const movie = {
    title: 'hello',
    id: '123',
    poster_path: 'fkasjflkjsf.jpg',
};

// test that movie comp works with correct props
test('<Movie /> with movie', () => {
    const { getByTestId } = render(
        <MemoryRouter>
            <Movie movie={movie} />
        </MemoryRouter>,
    );
    expect(console.error).not.toHaveBeenCalled();
    // check that it links to appropriate desination
    expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
    expect(getByTestId('movie-img').src).toBe(`${POSTER_PATH}${movie.poster_path}`);    
});
