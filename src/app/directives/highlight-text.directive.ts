import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective implements AfterViewInit {

  @Input('appHighlightText') highLightText: string;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    console.log('string is: ' + this.el.nativeElement.innerText);
    const regex = new RegExp(this.highLightText, 'gi');
    const match = this.el.nativeElement.innerText.match(regex);

    if (match) {
      this.el.nativeElement.innerHTML = this.el.nativeElement.innerText
        .replace(regex, `<span class='highlightText'>${match}</span>`);
    }
  }
}
