import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ENumberSystem} from "./entities/ENumberSystem";
import {EOperation} from "./entities/EOperation";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
    }).compileComponents();
  });
  beforeEach(()=> {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const formValues = {
      operation: EOperation.add,
      base: ENumberSystem.DEC,
      num1: '',
      num2: ''
    };

    expect(app.form.value).toEqual(formValues);
  });

  it(`should have the button`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toEqual('Вычислить');
  });

  it('should render title', () => {
    fixture.detectChanges();
  });
});
