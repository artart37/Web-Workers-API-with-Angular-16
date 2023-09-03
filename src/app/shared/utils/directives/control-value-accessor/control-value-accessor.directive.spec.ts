import { Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ControlValueAccessorDirective } from './control-value-accessor.directive';

class TestControlValueAccessorDirective<
  T
> extends ControlValueAccessorDirective<T> {
  getProtectedValue<T>(property: keyof ControlValueAccessorDirective<T>): T {
    return (this as any)[property];
  }
}

describe('ControlValueAccessorDirective', () => {
  let directive: TestControlValueAccessorDirective<any>;
  let injectorMock: Injector;

  beforeEach(() => {
    injectorMock = {
      get: jest.fn(),
    } as any as Injector;
    directive = new TestControlValueAccessorDirective<any>(injectorMock);
  });
  it('should write value to the form control', () => {
    const formControlMock = new FormControl();
    const value = 'Test Value';
    directive.control = formControlMock;
    directive.writeValue(value);

    expect(formControlMock.value).toBe(value);
  });

  it('should set the disabled state', () => {
    const isDisabled = true;
    directive.setDisabledState?.(isDisabled);
    expect(directive.disabled).toBe(isDisabled);
  });
});
