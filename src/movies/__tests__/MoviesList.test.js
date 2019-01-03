import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import MoviesList from '../MoviesList';

global.fetch = require('jest-fetch-mock');

afterEach(() => {
    cleanup();
    console.error.mockClear();
});

const match = {
    params: {
        id: 'fasdjfks;dflk',
    },
};

console.error = jest.fn();

const movies = {
    success: true,
    results: [
        {
            id: '1234',
            title: 'terrance rulez',
            poster_path: 'asflkjl;j.jpg',
        },
        {
            id: '123433',
            title: 'terrance rulezaaaaa',
            poster_path: 'asflkjl;ssssdddj.jpg',
        },
        {
            id: '123444',
            title: 'terrance rulezasfasf',
            poster_path: 'asflkjl;ssdffesj.jpg',
        },
    ],
};

const movie = movies.results[0];

test('<MoviesList />', async () => {
    fetch.mockResponseOnce(JSON.stringify(movies));

    const { getByTestId, queryByTestId, getAllByTestId } = render(
        <MemoryRouter>
            <MoviesList />
        </MemoryRouter>,
    );

    expect(getByTestId('loading')).toBeTruthy();
    await waitForElement(() => getByTestId('movie-link'));
    expect(queryByTestId('loading')).toBeFalsy();   
    expect(getByTestId('movie-link').getAttribute('href')).toBe(`/${movie.id}`);
    expect(getAllByTestId('movie-link').length).toBe(movies.results.length);
});

test('<MoviesList /> api fail', async () => {
    movies.success = false;
    fetch.mockResponseOnce(JSON.stringify(movies));

    const { getByTestId } = render(
        <MemoryRouter>
            <MoviesList />
        </MemoryRouter>,
    );

    expect(getByTestId('loading')).toBeTruthy();
});
