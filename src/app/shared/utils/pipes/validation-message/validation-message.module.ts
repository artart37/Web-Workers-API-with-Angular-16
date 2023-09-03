import { NgModule } from '@angular/core';
import { ValidationMessagePipe } from './validation-message.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ValidationMessagePipe],
  imports: [CommonModule],
  exports: [ValidationMessagePipe],
})
export class ValidationMessageModule {}
