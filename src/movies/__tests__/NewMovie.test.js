import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import NewMovie from '../NewMovie';

afterEach(cleanup); // remove everything from test dom

test('<NewMovie />', () => {
    const { 
        debug, 
        getByTestId, 
        queryByTestId, 
        container,
        getByText, 
    } = render(<NewMovie />);
    expect(getByTestId('page-title').textContent).toBe('New Movie');
    expect(queryByTestId('movie-form')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText('Submit'));
});