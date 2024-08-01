import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import { ReactNode } from "react";

const renderWithRouter = (ui: ReactNode) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('Header Component', () => {

  test('should match the snapshot', () => {
    const { asFragment } = renderWithRouter(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render the Home and Units links', () => {
    renderWithRouter(<Header />);

    const homeLink = screen.getByText(/Home/i);
    const unitsLink = screen.getByText(/Units/i);

    expect(homeLink).toBeInTheDocument();
    expect(unitsLink).toBeInTheDocument();
  });

  test('should navigate to the correct route when links are clicked', () => {
    renderWithRouter(<Header />);

    const homeLink = screen.getByText(/Home/i);
    const unitsLink = screen.getByText(/Units/i);

    expect(homeLink.getAttribute('href')).toBe('/');
    expect(unitsLink.getAttribute('href')).toBe('/units');

    fireEvent.click(homeLink);
    fireEvent.click(unitsLink);
  });

});
