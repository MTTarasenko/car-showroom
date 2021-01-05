import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(value: any[], page): any {
    return [...value.slice(4 * (page), 4 * (page + 1))];
  }

}
