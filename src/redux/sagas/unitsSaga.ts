import { put, takeLatest, select, all } from 'redux-saga/effects';
import { SET_AGE, SET_COST } from '../actions';

function* filter() {
  const state = yield select();
  let filteredData = state.units.units;

  function filterCost(costName) {
    return filteredData.filter((unit) => {
      if (
        state.units.costFilters[costName].range.min == 0 &&
        (unit.cost === null || unit.cost.hasOwnProperty(costName) && unit.cost[costName] === undefined)
      ) {
        return true;
      } else {
        return(
          unit.cost && unit.cost[costName] >= state.units.costFilters[costName].range.min && unit.cost[costName] <= state.units.costFilters[costName].range.max
        )
      }
    })
  }

  if (state.units.age !== "ALL") {
    const { age } = state.units;
    filteredData = filteredData.filter((unit) => unit.age.toLowerCase() === age.toLowerCase());
  }

  if (state.units.costFilters["Gold"].checked) {
    filteredData = filterCost("Gold");
  }
  
  if (state.units.costFilters["Food"].checked) {
    filteredData = filterCost("Food");
  }
  
  if (state.units.costFilters["Wood"].checked) {
    filteredData = filterCost("Wood");
  }

  yield put({ type: "SET_FILTERED", payload: filteredData });
}

function* ageFilter(act) {
  yield put({ type: SET_AGE, payload: act.payload });
  yield put({ type: "FILTER" });
}

function* costFilter(act) {
  yield put({ type: SET_COST, payload: act.payload });
  yield put({ type: "FILTER" })
}

export default function* unitsSaga() {
  yield all([
    yield takeLatest("AGE_FILTER", ageFilter),
    yield takeLatest("COST_FILTER", costFilter),
    yield takeLatest("FILTER", filter),
  ])
}
