import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  // templateUrl: './search.component.html',
  template: `<form class="form-header" onsubmit="return false;" method="GET">
    <input
      #myInput
      class="au-input au-input-xl"
      type="text"
      placeholder="Search for products"
      (keyup.enter)="doSearch(myInput.value)"
    />
    <button class="au-btn-submit" type="submit">Search</button>
  </form> `,
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }
}
