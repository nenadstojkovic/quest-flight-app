// Vendor
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Time format pipe class.
 *
 * @author Nenad Stojković
 */
@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {

  /**
   * Its format number to time.
   *
   * @author Nenad Stojković <nenstojkovic@gmail.com>
   * @return `number`.
   */
  transform(number: number) {
    let sign: any = number >= 0 ? 1 : -1;

    number = number * sign;

    let hour = Math.floor(number);
    let decpart = number - hour;
    let min = 1 / 60;
    decpart = min * Math.round(decpart / min);

    let minute = Math.floor(decpart * 60) + '';

    if (minute.length < 2) {
      minute = '0' + minute;
    }

    sign = sign == 1 ? '' : '-';

    const time = sign + hour + 'h ' + minute + 'm';

    return time;
  }

}
