import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders start page', () => {
  const { getByText } = render(<App />);
  const buttonElement = getByText(/start/i);
  expect(buttonElement).toBeInTheDocument();
});
