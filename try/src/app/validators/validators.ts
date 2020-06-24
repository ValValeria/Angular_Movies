import { ValidatorFn, AbstractControl } from '@angular/forms';

export function forbiddenextension(file:File): ValidatorFn {
    return (_control: AbstractControl): {[key: string]: any} | null => {
      if(!file.type.startsWith('video/') || !(file.size > 59191204)){
          return  {'required':true}
      }
      return  null;
    };
  }