import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'manage-data', pathMatch: 'full' },
  {
    path: 'manage-data',
    loadChildren: async () =>
      (await import('./core/pages/manage-data-page/manage-data-page.module'))
        .ManageDataPageModule,
  },
  {
    path: '**',
    redirectTo: '404',
  },
  {
    path: '404',
    loadChildren: async () =>
      (await import('./core/pages/not-found-page/not-found-page.module'))
        .NotFoundPageModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
