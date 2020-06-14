import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:"cut"})
export class Cut  implements PipeTransform{
    transform(value: string, slice:number) {
        let array:string[]=value.split(' ')
        return array.slice(0,slice).join(' ');
    }

}