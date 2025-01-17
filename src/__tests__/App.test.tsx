import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Edit', () => {
  render(<App />);
  expect(screen.getByText(/Edit/i)).toBeInTheDocument();
});