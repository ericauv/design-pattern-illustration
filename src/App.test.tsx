import React from 'react';
import {
  render,
  getByPlaceholderText,
  getAllByPlaceholderText
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import App from './App';

test('renders name input', () => {
  const { getByPlaceholderText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const nameInput = getByPlaceholderText('name');
  expect(nameInput).toBeInTheDocument();
});
