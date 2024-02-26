import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NumberInputComponent} from './number-input.component';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ENumberSystem} from "../entities/ENumberSystem";
import {EOperation} from "../entities/EOperation";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

describe('NumberInputComponent', () => {
  let component: NumberInputComponent;
  let fixture: ComponentFixture<NumberInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberInputComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.numberFormControl = new FormControl();
    component.form = new FormGroup({
      operation: new FormControl(),
      base: new FormControl(),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle input for EOperation.div', () => {
    component.form.controls['operation'].setValue(EOperation.div);
    const inputElement = fixture.nativeElement.querySelector('input');
    let inputValue = '00123';
    fixture.detectChanges();
    for (let i = 0; i < inputValue.length; i++) {
      inputElement.value += inputValue[i];
      // Генерируем событие input
      inputElement.dispatchEvent(new Event('input'));
      // Обновляем представление
      fixture.detectChanges();
    }
    expect(inputElement.value).toBe('123');
  });

  it('should handle input for ENumberSystem.BIN', () => {
    // Устанавливаем значение формы, соответствующее ENumberSystem.BIN
    component.form.controls['base'].setValue(ENumberSystem.BIN);
    // Получаем элемент input
    const inputElement = fixture.nativeElement.querySelector('input');
    // Задаем значение для ввода
    const inputValue = '1109010819792dfhy5tq';
    // Проходим по каждой цифре в значении и генерируем событие input
    fixture.detectChanges();
    for (let i = 0; i < inputValue.length; i++) {
      inputElement.value += inputValue[i];
      // Генерируем событие input
      inputElement.dispatchEvent(new Event('input'));
      // Обновляем представление
      fixture.detectChanges();
    }
    expect(inputElement.value).toBe('1100101');
  });

  it('should render the label', () => {
    component.label = 'Операнд 1';

    fixture.detectChanges();

    const labelDebugElement = fixture.debugElement.query(By.css('mat-label'));
    expect(labelDebugElement.nativeElement.textContent).toContain('Операнд');
  });
});
