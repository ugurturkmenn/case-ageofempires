import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import Units from "./";
import { BrowserRouter } from "react-router-dom";
import { fetchUnit } from '../../redux/actions';

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
  return render(<Provider store={store}><BrowserRouter>{ui}</BrowserRouter></Provider>);
};

describe('Units Component', () => {

  test('should render without crashing', () => {
    const store = mockStore(initialState);
    renderWithStore(<Units />, { store });
    expect(screen.getByText(/Units Page/i)).toBeInTheDocument();
  });

  test('should display loading message when loading', () => {
    const loadingState = {
      ...initialState,
      units: { ...initialState.units, loading: true }
    };
    const store = mockStore(loadingState);

    renderWithStore(<Units />, { store });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('should display error message when there is an error', () => {
    const errorState = {
      ...initialState,
      units: { ...initialState.units, error: 'Error fetching data' }
    };
    const store = mockStore(errorState);

    renderWithStore(<Units />, { store });
    expect(screen.getByText(/Error: Error fetching data/i)).toBeInTheDocument();
  });

  test('should dispatch fetchUnit action on mount', () => {
    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    renderWithStore(<Units />, { store });

    expect(store.dispatch).toHaveBeenCalledWith(fetchUnit());
  });

  test('should render AgesFilter, CostFilters, and Table components', () => {
    const store = mockStore(initialState);
    renderWithStore(<Units />, { store });

    expect(screen.getByTestId('ages-filter')).toBeInTheDocument();
    expect(screen.getByTestId('costs-filter')).toBeInTheDocument(); 
    expect(screen.getByTestId('units-table')).toBeInTheDocument(); 
  });

  test('should render table with filtered data', () => {
    const filteredState = {
      ...initialState,
      units: { ...initialState.units, filteredUnits: initialState.units.units }
    };
    const store = mockStore(filteredState);
    
    renderWithStore(<Units />, { store });

    expect(screen.getByText(/Archer/i)).toBeInTheDocument();
  });

  test('should render table with original units data if no filtered data', () => {
    const store = mockStore(initialState);

    renderWithStore(<Units />, { store });

    expect(screen.getByText(/Archer/i)).toBeInTheDocument(); 
  });
});
