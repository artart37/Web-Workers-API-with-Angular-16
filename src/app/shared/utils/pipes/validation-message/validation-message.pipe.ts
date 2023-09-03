import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { VALIDATION_MESSAGES } from '../../constants';

@Pipe({
  name: 'ftValidationMessage',
})
export class ValidationMessagePipe implements PipeTransform {
  transform(value: ValidationErrors | null): string | null {
    if (!value || !value['value']) {
      return null;
    }
    const key = value['key'];
    return key ? VALIDATION_MESSAGES?.get(key) || 'Invalid' : null;
  }
}
