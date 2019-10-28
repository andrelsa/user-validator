import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {timer} from 'rxjs';
import {switchMap} from 'rxjs/operators';

const URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorsService {

  constructor(private http: HttpClient) { }

  searchUser(text) {
    // debounce
    return timer(1000)
      .pipe(
        switchMap(() => {
          // Check if username is available
          return this.http.get<any>(`${URL}/users?username=${text}`);
        })
      );
  }
}
