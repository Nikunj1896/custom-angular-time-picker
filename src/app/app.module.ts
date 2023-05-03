import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomAngularTimePickerComponentModule } from 'custom-angular-time-picker';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CustomAngularTimePickerComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
