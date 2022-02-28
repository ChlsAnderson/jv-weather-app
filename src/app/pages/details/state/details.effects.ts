import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { combineLatest } from "rxjs";
import { catchError, mergeMap, withLatestFrom } from "rxjs/operators";
import { WeatherService } from "src/app/shared/services/weather.service";

@Injectable()
export class DetailsEffect {

    loadCurrentWeather$ = createEffect(() => this.actions$
        .pipe(
            ofType(fromDetailsActions.loadWeatherDetails),
            withLatestFrom(this.store.pipe(select(fromRouterSelectors.selectRouterQueryParams))),
            mergeMap(([,queryParams]: [any, Params]) => 
                combineLatest([
                    this.weatherService.getCityWeatherByCoord(queryParams.lat,queryParams.lon),
                    this.weatherService.getWeatherDetails(queryParams.lat,  queryParams.lon),
                ])
                ),
                catchError((err,caught$) => {
                    this.store.dispatch(fromDetailsActions.loadWeatherDetailsFailed()),
                    return caught$;
                }),
                map(([current, daily]) => {
                    const entity = daily;
                    entity.city = {...current.city, timeZone: daily.city.timeZone};
                    return fromDetailsActions.loadWeatherDetailsSucess({ entity });
                })
            ) );

    constructor (private actions$: Actions,
                private store: Store<AppStore>,
                private weatherService: WeatherService) {   
    }

};

