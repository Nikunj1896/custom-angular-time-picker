# Angular Custom Time Picker

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Installation

1. Install package from npm.

```
    npm install custom-angular-time-picker --save
```

## Usage

2. Include CustomAngularTimePickerComponentModule into your application.

```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomAngularTimePickerComponentModule } from 'ng2-datepicker';

@NgModule({
  imports: [BrowserModule, CustomAngularTimePickerComponentModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

3. And that's it, you can then use it in your component as [ts] file:

```
<form [formGroup]="addNewTime">
    <custom-angular-time-picker 
        [value]="addNewTime.value.workSheduleTime"
        (onChange)="handleOnTimeChange($event)" >
    </custom-angular-time-picker>
</form>
```

3. And that's it, you can then use it in your component as [html] file:

```
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'ParentComponentName',
  templateUrl: '',
  styleUrls: [''],
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }]
})

export class ParentComponentName implements OnInit {

    addNewTime!: FormGroup;

    constructor(private fb: FormBuilder){
    }

    initForm() {
        this.addNewTime = this.fb.group({
        'workSheduleTime': ['', Validators.required]
        })
    }

}
```


## Run Demo

1. Clone this repository.

```
git clone https://github.com/Nikunj1896/custom-angular-time-picker
```

2. Install dependencies.

```
npm install
```

3. Start the demo

```
ng serve
```


