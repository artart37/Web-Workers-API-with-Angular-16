import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessorDirectiveModule } from './control-value-accessor';

@NgModule({
  imports: [CommonModule, ControlValueAccessorDirectiveModule],
})
export class SharedDirectivesModule {}
