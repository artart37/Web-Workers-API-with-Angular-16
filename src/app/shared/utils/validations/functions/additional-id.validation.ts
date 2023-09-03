import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function additionalIdValidation(): ValidatorFn {
  const pattern: RegExp = /^([a-zA-Z0-9]+(, [a-zA-Z0-9]+)*)(,\s*)?$|^$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) {
      return null;
    }

    const valid = pattern.test(value);

    return valid ? null : { additionalIds: true };
  };
}
