import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbCardModule, NbSearchModule } from '@nebular/theme';
import { ChartModule } from 'angular2-chartjs';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { JobsComponent } from './dashboard/jobs/jobs.component';
import { SettingsComponent } from './dashboard/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'jobs', component: JobsComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbLayoutModule,
    NbSearchModule,
    RouterModule.forRoot(routes),
    ChartModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    DashboardComponent,
    AnalyticsComponent,
    JobsComponent,
    SettingsComponent
  ],
  providers: [
    NbSidebarService
  ]
})
export class MainModule { }
