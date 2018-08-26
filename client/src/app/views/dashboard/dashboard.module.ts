import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';

import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MainComponent },
];

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    MainComponent
  ],
  providers: [
    NbSidebarService
  ]
})
export class DashboardModule { }
