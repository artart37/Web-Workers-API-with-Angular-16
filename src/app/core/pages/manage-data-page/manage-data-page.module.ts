import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManageDataPageComponent } from './manage-data-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule, OptionsInputModule } from '../../../shared/ui';

@NgModule({
  declarations: [ManageDataPageComponent],
  imports: [
    CommonModule,
    DataTableModule,
    OptionsInputModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManageDataPageComponent,
      },
    ]),
  ],
  exports: [RouterModule, ManageDataPageComponent],
})
export class ManageDataPageModule {}
