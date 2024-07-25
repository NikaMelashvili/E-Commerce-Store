import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  getCreditCardMonth(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    const currentYear: number = new Date().getFullYear();
    const endyear = currentYear + 10;

    for (let year = currentYear; year <= endyear; year++) {
      data.push(year);
    }

    return of(data);
  }
}
