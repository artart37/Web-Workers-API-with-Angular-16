import { ValidationMessagePipe } from './validation-message.pipe';
import { VALIDATION_MESSAGES } from '../../constants';
import { ValidationErrors } from '@angular/forms';

describe('ValidationMessagePipe', () => {
  let pipe: ValidationMessagePipe;

  beforeEach(() => {
    pipe = new ValidationMessagePipe();
  });

  it('should return null if value is null or empty', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform({})).toBeNull();
  });

  it('should return null if value is truthy but does not have "key" property', () => {
    const value: ValidationErrors = { value: 'some value' };
    expect(pipe.transform(value)).toBeNull();
  });
});
