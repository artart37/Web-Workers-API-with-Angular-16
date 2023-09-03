import { Directive, Inject, Injector } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';
import { Subject, distinctUntilChanged, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[ftControlValueAccessor]',
})
export class ControlValueAccessorDirective<T> implements ControlValueAccessor {
  control!: FormControl;
  disabled = false;
  protected valueChanged$$ = new Subject<T>();
  protected valueChanged$ = this.valueChanged$$.asObservable();
  protected unsubscribe$$ = new Subject<void>();
  private onTouched!: () => void;

  constructor(@Inject(Injector) protected injector: Injector) {}

  initFormControl(): void {
    try {
      const formControl = this.injector.get(NgControl);
      switch (formControl.constructor) {
        case FormControlName:
          this.control = this.injector
            .get(FormGroupDirective)
            .getControl(formControl as FormControlName);
          break;
        default:
          this.control = (formControl as FormControlDirective)
            .form as FormControl;
          break;
      }
    } catch (err) {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
    this.control
      ? this.control.setValue(value)
      : (this.control = new FormControl(value));
  }

  registerOnChange(fn: (value: T | undefined) => void): void {
    this.control?.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$$),
        distinctUntilChanged(),
        tap((val) => fn(val))
      )
      .subscribe((val) => this.valueChanged$$.next(val));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
