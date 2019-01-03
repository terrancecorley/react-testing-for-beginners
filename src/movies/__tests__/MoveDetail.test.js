// imports
import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import MovieDetail from '../MovieDetail';

global.fetch = require('jest-fetch-mock');

// cleanup
afterEach(() => {
    cleanup();
    console.error.mockClear();
});

const match = {
    params: {
        id: 'lasjd;fkjs;adfj',
    },
};

// mock console err
console.error = jest.fn();

const movie = {
    id: 'hi',
    title: 'level up rules',
};

// test that movie comp errors without props
test('<MovieDetail />', async () => {
    // mock http request
    fetch.mockResponseOnce(
        JSON.stringify(movie),
    );

    const { getByTestId } = render(<MovieDetail match={match} />);
    await waitForElement(() => getByTestId('movie-title'));
    
    expect(getByTestId('movie-title').textContent).toBe(movie.title);
});

// make sure it outputs backdrop path, h3, p