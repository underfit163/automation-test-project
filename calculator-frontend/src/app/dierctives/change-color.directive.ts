import {Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[changeColor]',
  standalone: true
})
export class ChangeColorDirective implements OnChanges {
  @Input("changeColor") result: number | string = "";

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges) {
    //if ('result' in changes) {
      let numericValue = Number(this.result);
      this.updateColor(numericValue);
   // }
  }

  private updateColor(value: number): void {
    if (value < 0) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'red');
    } else if (value === 0) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'green');
    }
  }
}
