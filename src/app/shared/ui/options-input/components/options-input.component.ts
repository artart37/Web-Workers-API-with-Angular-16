import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../../utils';
import { InputTypes } from '../../../models';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'ft-options-input',
  templateUrl: './options-input.component.html',
  styleUrls: ['./options-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionsInputComponent),
      multi: true,
    },
  ],
})
export class OptionsInputComponent<T>
  extends ControlValueAccessorDirective<T>
  implements OnDestroy, OnInit
{
  @Input() debounceTime = 200;
  @Input() id: string | undefined;
  @Input() label!: string;
  @Input() min: number | undefined = 1;
  @Input() placeholder!: string;
  @Input() type: InputTypes = 'text';
  @Input() value!: T;
  @Output() valueChanges = new EventEmitter<T>();

  ngOnInit(): void {
    this.initFormControl();
    this.valueChanged$
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$$)
      )
      .subscribe((value) => {
        this.valueChanges.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$$.next();
    this.unsubscribe$$.complete();
  }
}
