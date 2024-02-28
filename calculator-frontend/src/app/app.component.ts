import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NumberInputComponent} from "./number-input/number-input.component";
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {EOperation} from "./entities/EOperation";
import {ENumberSystem} from "./entities/ENumberSystem";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {CalculatorService} from "./services/calculator.service";
import {ChangeColorDirective} from "./dierctives/change-color.directive";
import {RoundNumberPipe} from "./pipes/round-number.pipe";

@Component({
    selector: 'app-root',
    standalone: true,
  imports: [RouterOutlet,
    NumberInputComponent,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    NgForOf,
    NgIf,
    MatFormFieldModule, MatButton, MatCardContent, MatCard, HttpClientModule, ChangeColorDirective, RoundNumberPipe],
    providers: [CalculatorService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    form: FormGroup;
    protected readonly eOperation = EOperation;
    protected readonly eNumberSystem = ENumberSystem;
    result: string  = "";
    showResult: boolean = false;

    constructor(private calcService: CalculatorService, private fb: FormBuilder) {
        this.form = this.fb.group({
            operation: [EOperation.add, [Validators.required]],
            base: [ENumberSystem.DEC, [Validators.required]],
            num1: ["", [Validators.required, Validators.pattern(/^(-)?[0-9]+$/)]],
            num2: ["", [Validators.required, Validators.pattern(/^(-)?[0-9]+$/)]],
        });
    }

    enumToArr(enumObj: any) {
        return Object.keys(enumObj);
    }

    onBaseAndOperationChange() {
        this.form.controls['num1'].clearValidators();
        this.form.controls['num2'].clearValidators();

        let validators = [Validators.required];

        if (this.form.controls['operation'].value == EOperation.div) {
            validators.push(Validators.pattern(/^[^0]/));
        }

        switch (this.form.controls['base'].value) {
            case ENumberSystem.BIN:
                validators.push(Validators.pattern(/^(-)?[01]+$/));
                break;
            case ENumberSystem.OCT:
                validators.push(Validators.pattern(/^(-)?[0-7]+$/));
                break;
            case ENumberSystem.DEC:
                validators.push(Validators.pattern(/^(-)?[0-9]+$/));
                break;
            case ENumberSystem.HEX:
                validators.push(Validators.pattern(/^(-)?[0-9a-fA-F]+$/));
                break;
        }
        this.form.controls['num1'].addValidators(validators);
        this.form.controls['num2'].addValidators(validators);
        this.form.controls['num1'].updateValueAndValidity();
        this.form.controls['num2'].updateValueAndValidity();
    }


    onGetResult() {
        this.calcService.getResult(
            this.form.controls['operation'].value,
            this.form.controls['base'].value,
            this.form.controls['num1'].value,
            this.form.controls['base'].value,
            this.form.controls['num2'].value
        ).subscribe({
            next: data => {
                this.result = data;
                this.showResult = true;
            },
            error: err => {
              alert(err)
                alert(err.message);
                this.showResult = false;
            }
        });
    }

}
