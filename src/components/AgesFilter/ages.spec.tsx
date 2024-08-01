import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import AgesFilter from ".";

const AGE_FILTER = 'AGE_FILTER';

const ageFilter = (payload: any) => ({
  type: AGE_FILTER,
  payload
});

const initialState = {
  units: {
    units: [{
      id: 1,
      name: "Archer",
      description: "Quick and light. Weak at close range; excels at battle from distance",
      expansion: "Age of Kings",
      age: "Feudal",
      cost: { Wood: 25, Gold: 45 },
      build_time: 35,
      reload_time: 2,
      attack_delay: 0.35,
      movement_rate: 0.96,
      line_of_sight: 6,
      hit_points: 4,
      range: 30,
      attack: 4,
      armor: "0/0",
      accuracy: "80%"
    }],
    filteredUnits: [{
      id: 1,
      name: "Archer",
      description: "Quick and light. Weak at close range; excels at battle from distance",
      expansion: "Age of Kings",
      age: "Feudal",
      cost: { Wood: 25, Gold: 45 },
      build_time: 35,
      reload_time: 2,
      attack_delay: 0.35,
      movement_rate: 0.96,
      line_of_sight: 6,
      hit_points: 4,
      range: 30,
      attack: 4,
      armor: "0/0",
      accuracy: "80%"
    }],
    age: 'ALL',
    loading: false,
    error: null,
    costFilters: {
      Gold: { checked: false, range: { min: 0, max: 200 } },
      Food: { checked: false, range: { min: 0, max: 200 } },
      Wood: { checked: false, range: { min: 0, max: 200 } },
    }
  }
};

const mockStore = configureStore();

const renderWithStore = (ui: any, { store }: any) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('AgesFilter Component', () => {

  test('should match the snapshot', () => {
    const store = mockStore(initialState);
    const { asFragment } = renderWithStore(<AgesFilter />, { store });
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render all age filter buttons', () => {
    const store = mockStore(initialState);
    renderWithStore(<AgesFilter />, { store });

    expect(screen.getByText(/ALL/i)).toBeInTheDocument();
    expect(screen.getByText(/DARK/i)).toBeInTheDocument();
    expect(screen.getByText(/FEUDAL/i)).toBeInTheDocument();
    expect(screen.getByText(/CASTLE/i)).toBeInTheDocument();
    expect(screen.getByText(/IMPERIAL/i)).toBeInTheDocument();
  });

  test('should dispatch correct action on button click', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    renderWithStore(<AgesFilter />, { store });

    const allButton = screen.getByText(/ALL/i);
    fireEvent.click(allButton);
    expect(store.dispatch).toHaveBeenCalledWith(ageFilter('ALL'));

    const darkButton = screen.getByText(/DARK/i);
    fireEvent.click(darkButton);
    expect(store.dispatch).toHaveBeenCalledWith(ageFilter('DARK'));

  });
});
