import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const HOST = environment.apiUrl;
const httpOptionsPlain: Object = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain; charset=utf-8'
  }),
  responseType: 'text'
};

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient) {
  }

  getResult(operation: string, base1: string, num1: string, base2: string, num2: string): Observable<string> {
    return this.http.get<string>(
      `${HOST}/calculator/calculate/${operation}/${base1}/${num1}/${base2}/${num2}`, httpOptionsPlain)
  }
}
