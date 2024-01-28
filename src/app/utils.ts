import {FormControl} from '@angular/forms';

export class Utils{
  static emailValidator(email: FormControl): {[s: string]: boolean} {
    if (email.value !== '' && !email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return {invalidEmail: true};
    }
  }
}

