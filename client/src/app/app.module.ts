import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly

import { NbThemeModule } from '@nebular/theme';

import { AppComponent } from './app.component';
import { MainModule } from './views/main/main.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // this will enable the default theme, you can change this to `cosmic` to enable the dark theme,
    NbThemeModule.forRoot({ name: 'default' }),
    RouterModule,
    MainModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
