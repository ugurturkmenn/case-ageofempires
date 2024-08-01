import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import UnitDetail from '.';

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
  window.history.pushState({}, 'Test page', '/unit/1');
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/unit/:id" element={ui} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

describe('UnitDetail Component', () => {

  test('should render without crashing', () => {
    const store = mockStore(initialState);
    renderWithStore(<UnitDetail />, { store });
  });

  test('should display loading message when loading', () => {
    const loadingState = {
      ...initialState,
      units: { ...initialState.units, loading: true }
    };
    const store = mockStore(loadingState);

    renderWithStore(<UnitDetail />, { store });
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('should display error message when there is an error', () => {
    const errorState = {
      ...initialState,
      units: { ...initialState.units, error: 'Error fetching data' }
    };
    const store = mockStore(errorState);

    renderWithStore(<UnitDetail />, { store });
    expect(screen.getByText(/Error: Error fetching data/i)).toBeInTheDocument();
  });

  test('should display unit details when unit is found', () => {
    const store = mockStore(initialState);
    renderWithStore(<UnitDetail />, { store });

    expect(screen.getByText(/Unit Detail Page/i)).toBeInTheDocument();
    expect(screen.getByText(/ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
  });

  test('should display "Unit not found" message when unit is not found', () => {
    const emptyState = {
      ...initialState,
      units: { ...initialState.units, units: [] }
    };
    const store = mockStore(emptyState);

    renderWithStore(<UnitDetail />, { store });
    expect(screen.getByText(/Unit not found/i)).toBeInTheDocument();
  });

  test('should handle edge cases with missing or undefined values', () => {
    const undefinedState = {
      ...initialState,
      units: {
        ...initialState.units,
        units: [{
          id: 1,
          name: undefined,
          description: undefined,
          age: undefined,
          cost: undefined,
          build_time: undefined,
          reload_time: undefined,
          hit_points: undefined,
          attack: undefined,
          accuracy: undefined
        }]
      }
    };
    const store = mockStore(undefinedState);
    renderWithStore(<UnitDetail />, { store });

    expect(screen.getByText(/Unit Detail Page/i)).toBeInTheDocument();
    expect(screen.getByText(/ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/No Name/i)).toBeInTheDocument();
  });
});
