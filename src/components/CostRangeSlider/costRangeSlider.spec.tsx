import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import CostRangeSlider from "./";
import { BrowserRouter } from "react-router-dom";

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

describe('CostRangeSlider Component', () => {

  test('should render the component', () => {
    const store = mockStore(initialState);
    renderWithStore(<CostRangeSlider type="Gold" />, { store });
    expect(screen.getByText(/Gold/i)).toBeInTheDocument();
    expect(screen.getByText(/0 - 200/i)).toBeInTheDocument();
  });

  test('should dispatch SET_COST action when checkbox is clicked', () => {
    const store = mockStore(initialState);
    renderWithStore(<CostRangeSlider type="Gold" />, { store });

    const checkbox = screen.getByLabelText(/Gold/i);
    fireEvent.click(checkbox);

    const actions = store.getActions();
    expect(actions).toEqual([{
      type: "SET_COST",
      payload: { type: 'Gold', range: { min: 0, max: 200 }, checked: true }
    }]);
  });

  test.skip('should dispatch COST_FILTER action when slider is adjusted', () => {
    const store = mockStore(initialState);
    renderWithStore(<CostRangeSlider type="Gold" />, { store });

    const checkbox = screen.getByLabelText(/Gold/i);
    fireEvent.click(checkbox);

    const sliderWrapper = screen.getByTestId('range-slider-input-Gold');
    const inputs = sliderWrapper.querySelectorAll('input[type="range"]');

    const minSlider = inputs[0];
    const maxSlider = inputs[1];

    if(minSlider && maxSlider) {
      fireEvent.change(minSlider, { target: { value: 50 } });
      fireEvent.change(maxSlider, { target: { value: 150 } });

      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: 'SET_COST',
          payload: { type: 'Gold', range: { min: 0, max: 200 }, checked: true },
        },
        {
          type: 'COST_FILTER',
          payload: { type: 'Gold', range: { min: 50, max: 150 }, checked: true },
        },
      ]);
    }
  });

  test('should disable the slider when checkbox is unchecked', async() => {
    const store = mockStore(initialState);
    renderWithStore(<CostRangeSlider type="Gold" />, { store });
    
    const sliderWrapper = screen.getByTestId('range-slider-input-Gold');

    const sliderIsDisabled = sliderWrapper.querySelector('.range-slider-input-Gold')?.getAttributeNames().includes('data-disabled')
    expect(sliderIsDisabled).toBeTruthy();
  });
});
