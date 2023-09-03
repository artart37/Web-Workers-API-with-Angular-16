import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionsInputComponent } from './components/options-input.component';
import { ControlValueAccessorDirectiveModule } from '../../utils';
import { ValidationMessageModule } from '../../utils/pipes';

@NgModule({
  declarations: [OptionsInputComponent],
  imports: [
    CommonModule,
    ControlValueAccessorDirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationMessageModule,
  ],
  exports: [OptionsInputComponent],
})
export class OptionsInputModule {}
