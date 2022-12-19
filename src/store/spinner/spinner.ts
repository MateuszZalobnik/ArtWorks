import { Reducer } from 'redux';

export enum SpinnerActionTypes {
  SET_SPINNER = 'SET_SPINNER',
}

export interface SpinnerState {
  spinner: boolean;
}

const initialState: SpinnerState = {
  spinner: false,
};

export const spinnerReducer: Reducer<SpinnerState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SpinnerActionTypes.SET_SPINNER:
      return {
        ...state,
        spinner: action.payload,
      };
    default:
      return state;
  }
};
