import { Component, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CityTypeaheadItem } from '../../models/city-typeahead-item.model';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'jv-cities-typeahead',
  templateUrl: './cities-typeahead.component.html',
  styleUrls: ['./cities-typeahead.component.scss']
})
export class CitiesTypeaheadComponent implements OnInit {

  dataSource$: Observable<CityTypeaheadItem[]>;
  search: string;

  constructor(private citiesService: CitiesService) { }

  ngOnInit() {
    this.dataSource$ = new Observable(
      (subscriber: Subscriber<string>) =>  subscriber.next(this.search)
    )
      .pipe(
        switchMap(query => this.citiesService.getCities(query))
      )
  }

  onSelected(match: TypeaheadMatch) {
    console.log(match.item);
  }
}
