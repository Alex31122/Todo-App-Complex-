import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date2'
})
export class DatePipe2 implements PipeTransform {

  transform(value: string | null, ...args: string[]): string {
    let index = -1;
    let message = '';
    if(value){
      index = value.indexOf(',');
      message = value?.slice(index + 1);
    }

    if(args[0] == "day"){      
      message = value?.slice(0, index) ?? '';
    }    
    return message;
  }

}
