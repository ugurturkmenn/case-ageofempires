import units from "../../data.json";
import { SET_AGE, SET_COST, SET_FILTERED } from "../actions";

const initialState = {
  units: units.units,
  filteredUnits: units.units,
  age: 'ALL',
  loading: false,
  error: null,
  costFilters: {
    Gold: { checked: false, range: { min: 0, max: 200 } },
    Food: { checked: false, range: { min: 0, max: 200 } },
    Wood: { checked: false, range: { min: 0, max: 200 } },
  }
}

const unitsReducer = (state = initialState, action: any) => {
  
  switch (action.type) {
    case SET_AGE:
      return {
        ...state,
        age: action.payload
      }

    case SET_COST:
      return {
        ...state,
        costFilters: {
          ...state.costFilters,
          [action.payload.type]: {
            range: action.payload.range,
            checked: action.payload.checked
          }
        }
      }
    
    case SET_FILTERED:
      return {
        ...state,
        filteredUnits: action.payload
      }
    
    default:
      return state;
  }
}

export default unitsReducer;
