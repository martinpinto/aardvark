import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly

import { NbThemeModule } from '@nebular/theme';

import { AppComponent } from './app.component';
import { DashboardModule } from './views/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({ name: 'default' }), // this will enable the default theme, you can change this to `cosmic` to enable the dark theme,
    RouterModule,
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
