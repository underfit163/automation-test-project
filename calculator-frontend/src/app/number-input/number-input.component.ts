import {Component, Input} from '@angular/core';
import {MatFormField, MatLabel, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {EOperation} from "../entities/EOperation";
import {ENumberSystem} from "../entities/ENumberSystem";

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.css'
})
export class NumberInputComponent {
  @Input() label!: string;
  @Input() numberFormControl!: FormControl;
  @Input() form!: FormGroup;

  /**
   * Проверка ввода в инпуты
   * @param event возникающее событие при вводе
   */
  handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.form.controls['operation'].value == EOperation.div) {
      if (inputElement.value.startsWith('0')) {
        inputElement.value = inputElement.value.slice(1);
      }
    }

    if (this.form.controls['base'].value == ENumberSystem.BIN) {
      inputElement.value = inputElement.value.replace(/[^-01]/, '');
    }
    if (this.form.controls['base'].value == ENumberSystem.OCT) {
      inputElement.value = inputElement.value.replace(/[^-0-7]/, '');
    }
    if (this.form.controls['base'].value == ENumberSystem.DEC) {
      inputElement.value = inputElement.value.replace(/[^-0-9]/, '');
    }
    if (this.form.controls['base'].value == ENumberSystem.HEX) {
      inputElement.value = inputElement.value.replace(/[^-0-9a-fA-F]/, '');
    }
  }
}
