import { render, screen } from "@testing-library/react";
import Home2 from "./Details";

test("renders learn react link", () => {
  render(<Home2 />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
