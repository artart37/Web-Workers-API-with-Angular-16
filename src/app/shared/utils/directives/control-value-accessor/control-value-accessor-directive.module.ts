import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessorDirective } from './control-value-accessor.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ControlValueAccessorDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ControlValueAccessorDirective],
})
export class ControlValueAccessorDirectiveModule {}
