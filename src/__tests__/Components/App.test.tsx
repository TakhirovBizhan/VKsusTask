import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../../App";

test("renders Edit", async () => {
  render(<App />);
  const hello = await screen.findByText(/Hi VK!/);

  expect(hello).toBeInTheDocument();
});
