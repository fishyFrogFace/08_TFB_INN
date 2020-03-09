import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders start page', () => {
  const { getByText } = render(<App />);
  const buttonElements = getByText(/Tittel/i);
  expect(buttonElements).toBeInTheDocument();
});
