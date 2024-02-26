import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'roundNumber',
  standalone: true
})
export class RoundNumberPipe implements PipeTransform {

  transform(value: number | string, digits: number = 2): number {
    value = Number(value);
    if (isNaN(value) || isNaN(value) || digits < 0) {
      return 0;
    }
    const multiplier = Math.pow(10, digits);
    return Math.round(value * multiplier) / multiplier;
  }
}
