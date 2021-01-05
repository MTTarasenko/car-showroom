import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appHighlightText]'
})
export class HighlightTextDirective implements AfterViewInit {

  @Input('appHighlightText') highLightText: string[];

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.highLightText.map(item => {
      const regex = new RegExp(item, 'gi');
      const match = this.el.nativeElement.innerText.match(regex);

      if (match) {
        this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML
          .replace(regex, `<span class='highlightText'>${match[0]}</span>`);
      }
    });

  }
}
