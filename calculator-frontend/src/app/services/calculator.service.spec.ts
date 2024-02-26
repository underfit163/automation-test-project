import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../environments/environment";

const HOST = environment.apiUrl;
describe('CalculatorService', () => {
  let service: CalculatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalculatorService]
    });

    service = TestBed.inject(CalculatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get result for the calculator operation', fakeAsync(() => {
    const operation = 'add';
    const base1 = 'DEC';
    const num1 = '10';
    const base2 = 'DEC';
    const num2 = '5';

    const expectedResult = '15';

    service.getResult(operation, base1, num1, base2, num2).subscribe(result => {
      expect(result).toBe(expectedResult);
    });

    const request = httpMock.expectOne(`${HOST}/calculator/calculate/${operation}/${base1}/${num1}/${base2}/${num2}`);
    expect(request.request.method).toBe('GET');

    // Моделируем ответ от сервера
    request.flush(expectedResult);

    // Используем tick() для завершения асинхронной операции
    tick();
  }));
});
