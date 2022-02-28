import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DetailsState } from "./details.reducer";

export const selectDetailsState = createFeatureSelector<DetailsState>('details');

export const selectDEtailsEntity = createSelector(
    selectDetailsState,
    (detailsState: DetailsState) => detailsState.entity,
);

export const selectDEtailsLoading = createSelector(
    selectDetailsState,
    (detailsState: DetailsState) => detailsState.loading,
);

export const selectDEtailsError = createSelector(
    selectDetailsState,
    (detailsState: DetailsState) => detailsState.error,
);

