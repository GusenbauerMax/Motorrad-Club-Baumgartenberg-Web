import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: 'home', loadChildren: () => import(`./features/home/home.module`).then(m => m.HomeModule)},
  {path: 'admin', loadChildren: () => import(`./features/admin/admin/admin.module`).then(m => m.AdminModule)},
  {path: '**', redirectTo: 'home'},
  {path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
