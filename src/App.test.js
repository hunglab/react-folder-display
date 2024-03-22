import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar header text', () => {
  render(<App />);
  const navHeaderText = screen.getByText(/Directory Tree/i);
  expect(navHeaderText).toBeInTheDocument();
});
