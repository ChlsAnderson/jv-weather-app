import { state } from '@angular/animations';
import { createReducer, Action, on } from '@ngrx/store'
import { strictEqual } from 'assert';

import * as fromHomeActions from './home.actions';

export interface HomeState {
  entity: any;
  loading: boolean;
  error: boolean;
}

export const homeInitialState: HomeState = {
  entity: undefined,
  loading: false,
  error: false,
}

const reducer = createReducer(
  homeInitialState,
  on(fromHomeActions.loadCurrentWeather, state => ({
    ...state,
    loading:true,
    error:true,
  })),
  on(fromHomeActions.loadCurrentWeatherSuccess, (state, {entity})=> ({
    ...state,
    entity,
    loading:false,
  })),
  on(fromHomeActions.loadCurrentWeatherFailed, state => ({
    ...state,
    loading: false,
    error:false,
  })),
);

export function homeReducer(state: HomeState | undefined, action: Action): HomeState {
  return reducer(state, action);
}
