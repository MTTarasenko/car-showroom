import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective {

  @Input() highLightColor: string;
  constructor(el: ElementRef) {
    console.log(this.highLightColor);
    el.nativeElement.style.backgroundColor = this.highLightColor;
  }

}
