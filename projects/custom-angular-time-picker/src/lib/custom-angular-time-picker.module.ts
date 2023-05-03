import { NgModule } from '@angular/core';
import { CustomAngularTimePickerComponent } from './custom-angular-time-picker.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomAngularTimePickerComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CustomAngularTimePickerComponent
  ]
})
export class CustomAngularTimePickerComponentModule { }
