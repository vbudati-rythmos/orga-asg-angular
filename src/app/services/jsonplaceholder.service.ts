import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonplaceholderService {

  constructor(private httpClient: HttpClient) { }

  getData(): Observable<any> {
    let url = 'https://jsonplaceholder.typicode.com/users';
    
    return this.httpClient.get<any>(url).pipe(map(result => result));
  }
}
