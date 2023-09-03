import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotFoundPageComponent } from './not-found-page.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotFoundPageComponent,
      },
    ]),
  ],
  exports: [RouterModule, NotFoundPageComponent],
})
export class NotFoundPageModule {}
