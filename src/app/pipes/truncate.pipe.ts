import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, max: number = 10, ellipsis: string = " ..." ): string {
    return value.substring(0, max) + (value.length > max ? ellipsis : '');
  }

}
