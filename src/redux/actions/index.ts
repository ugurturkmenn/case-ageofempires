import { Unit } from "../../models"

export const FETCH_UNITS_REQUEST = 'FETCH_UNITS_REQUEST';
export const FETCH_UNITS_SUCCESS = 'FETCH_UNITS_SUCCESS';
export const FETCH_UNITS_FAILURE = 'FETCH_UNITS_FAILURE';
export const SET_COST = 'SET_COST';
export const SET_COST_FILTERS = 'SET_COST_FILTERS';
export const SET_AGE = 'SET_AGE';
export const SET_AGE_FILTER = 'SET_AGE_FILTER';
export const TOGGLE_CHECK = 'TOGGLE_CHECK';
export const SET_FILTERED = 'SET_FILTERED';

export const fetchUnit = () => ({
  type: FETCH_UNITS_REQUEST
})

export const fetchUnitSuccess = (units: Unit[]) => ({
  type: FETCH_UNITS_SUCCESS,
  payload: units,
})

export const fetchUnitError = (error: any) => ({
  type: FETCH_UNITS_FAILURE,
  error,
})

export const setAgeFilter = (age: any) => ({
  type: SET_AGE_FILTER,
  payload: age,
})

export const setToggleCheck = (type: string, range: any, checked: boolean) => ({
  type: TOGGLE_CHECK,
  payload: { type, range, checked }
})

export const setCostFilter = (type: string, range: any, checked: boolean) => ({
  type: SET_COST_FILTERS,
  payload: { type, range, checked },
})