import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';

const url = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorsService {

  constructor(private http: HttpClient) {
  }

  searchEmail(text) {
    // debounce
    return timer(500)
      .pipe(
        switchMap(() => {
          // Check if email is available
          return this.http.get<any>(`${url}?email=${text}`);
        })
      );
  }

  userValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchEmail(control.value)
        .pipe(
          map(res => {
            // if email is already taken
            if (res.length) {
              // return error
              return {emailExists: true};
            }
          })
        );
    };
  }

}
