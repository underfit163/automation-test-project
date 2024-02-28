import {ChangeColorDirective} from './change-color.directive';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from '../app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('ChangeColorDirective', () => {
  let fixture: ComponentFixture<AppComponent>;
  let testComponent: AppComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    testComponent = fixture.componentInstance;
  });

  it('should set color to red when result is less than 0', () => {
    testComponent.result = '-5';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const cardContent = fixture.debugElement.query(By.directive(ChangeColorDirective));
      if (cardContent) {
        const nativeElement = cardContent.nativeElement;
        expect(nativeElement.style.color).toBe('red');
      } else {
        fail('ChangeColorDirective not found on the element');
      }
    });
  });

  it('should set color to black when result is 0', () => {
    testComponent.result = '0';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const cardContent = fixture.debugElement.query(By.directive(ChangeColorDirective));
      if (cardContent) {
        const nativeElement = cardContent.nativeElement;
        expect(nativeElement.style.color).toBe('black');
      } else {
        fail('ChangeColorDirective not found on the element');
      }
    });
  });

  it('should set color to green when result is greater than 0', () => {
    testComponent.result = '5';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const cardContent = fixture.debugElement.query(By.directive(ChangeColorDirective));
      if (cardContent) {
        const nativeElement = cardContent.nativeElement;
        expect(nativeElement.style.color).toBe('green');
      } else {
        fail('ChangeColorDirective not found on the element');
      }
    });
  });

  it('should update color when result changes', () => {
    testComponent.result = '-5';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let cardContent = fixture.debugElement.query(By.directive(ChangeColorDirective));
      if (cardContent) {
        let nativeElement = cardContent.nativeElement;
        expect(nativeElement.style.color).toBe('red');
      } else {
        fail('ChangeColorDirective not found on the element');
      }

      testComponent.result = '10';
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        cardContent = fixture.debugElement.query(By.directive(ChangeColorDirective));
        if (cardContent) {
          const nativeElement = cardContent.nativeElement;
          expect(nativeElement.style.color).toBe('green');
        } else {
          fail('ChangeColorDirective not found on the element');
        }
      });
    });
  });
});
