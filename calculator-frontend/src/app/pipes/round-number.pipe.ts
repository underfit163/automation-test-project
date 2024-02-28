import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'roundNumber',
  standalone: true
})
export class RoundNumberPipe implements PipeTransform {

  transform(value: string| number, digits: number = 2): number|string {
      if(this.isHexNumber(value)) return value;
      let numVal = Number(value);
      if (isNaN(numVal) || isNaN(numVal) || digits < 0) {
        return 0;
      }
      const multiplier = Math.pow(10, digits);
      return Math.round(numVal * multiplier) / multiplier;
  }

  private isHexNumber(input: string|number): boolean {
    // Паттерн для проверки на шестнадцатеричное число
    const hexPattern = /[a-fA-F]/;

    // Проверяем соответствие паттерну
    return hexPattern.test(input.toString());
  }
}
