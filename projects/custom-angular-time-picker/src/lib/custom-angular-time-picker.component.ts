import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormControlDirective, FormGroup, Validators } from '@angular/forms';

enum Meridiem {
  AM = "AM",
  PM = "PM"
}

enum keyCode {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  UP_ARROW = 'ArrowUp',
  DOWN_ARROW = 'ArrowDown',
  ENTER = 'Enter',
  ESCAPE = 'Escape',
  SHIFT = "SHIFT",
  TAB = "Tab",
  SPACEBAR = " ",
  BACKSPACE = "Backspace"
}
@Component({
  selector: 'custom-angular-time-picker',
  templateUrl: './angular-time-picker.component.html',
  styleUrls : ['./angular-time-picker.component.css'],
  providers: [{
    provide: FormControlDirective,
    useExisting: ControlContainer
  }]
})
export class CustomAngularTimePickerComponent {
  @Input() cos_formControlName!: string;
  @Input() value!: string;
  @Input() timePicker?: boolean;  //* For time picker 

  @Output() onChange = new EventEmitter<any>();
  @Output() onOpenTimePicker = new EventEmitter<any>();

  timeInput!: FormGroup;
  finalTime: any;
  addMeridiemOnlyOnce: boolean;
  is24Formate: boolean;
  isTimePicker?: boolean;

  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.initForm();
    this.addMeridiemOnlyOnce = true;
    this.is24Formate = false;
    this.timePicker = true;
    this.isTimePicker = false;
  }

  ngOnInit() {
    // this.newTimeComponent.valueChanges.pipe(distinctUntilChanged()).subscribe((item: any) => this.onChange(item));
    this.onTimeInputChange();
    this.onKeyDown()
  }

  onTimeInputChange() {
    this.timeInput.valueChanges.subscribe((formValue: any) => {
      this.validateTimeInput(formValue);
      this.finalTime = this.setFinalTIme(formValue);
      this.value = this.finalTime;
    });
  }

  handleTimePicker(data: any) {
    const params = {
      addInstant: true,
      time: data
    }
    this.onChange.emit(params);
  }

  initForm() {
    this.timeInput = this.fb.group(({
      hour1: ['', Validators.required],
      hour2: ['', Validators.required],
      min1: [''],
      min2: [''],
      meridiem: [''],
    }))
  }

  validateTimeInput(formValue: any) {
    let vHour1 = +formValue.hour1;
    let vHour2 = +formValue.hour2;
    let vMin1 = +formValue.min1;
    let vMin2 = +formValue.min2;
    let vMeridiem = formValue.meridiem;

    // *Hour Validation
    (vHour1 === 2 && vHour2 === 4) && (this.timeInput.value.min1 = "0", this.timeInput.value.min2 = "0");
    (!vHour1 && !!vHour2) && (this.timeInput.value.hour1 = "0");

    // *Min Validation
    (!vMin1 && !!vMin2) && (this.timeInput.value.min1 = "0");
    (vMin1 > 6) && (this.timeInput.value.min1 = "0");
    (+vMin1 === 6 && vMin2 === 0) && (this.timeInput.value.min1 = "0", this.timeInput.value.min2 = "0");

    // *Auto meridiem only once
    (!vHour1 && !vHour2) && (this.addMeridiemOnlyOnce = true);
    if ((this.addMeridiemOnlyOnce && !vMeridiem) && ((!!vHour1 && !!vHour2) || (formValue.hour1 === "0" && !!vHour2) || (!!vHour1 && formValue.hour2 === "0"))) {
      this.addMeridiemOnlyOnce = false;
      this.timeInput.value.meridiem = Meridiem.AM;
    }

    this.convert24To12();
  }

  convert24To12() {
    this.is24Formate = false;
    const hour24 = this.timeInput.value.hour1 + this.timeInput.value.hour2;
    if (+hour24 > 12 && hour24 <= 24) {
      const [cHour1, cHour2] = (+hour24 - 12).toString().padStart(2, '0').split('')
      this.timeInput.patchValue({
        hour1: cHour1,
        hour2: cHour2,
        meridiem: Meridiem.PM
      });
    } else if (+hour24 > 24) {
      this.timeInput.patchValue({
        hour1: "1",
        hour2: "2",
        meridiem: Meridiem.AM
      });
    }
  }

  onKeyDown() {
    const inputs: any = document.querySelectorAll(".time-input")
    const length = inputs.length;
    for (let i = 0; i < length; i++) {
      inputs[i].addEventListener('keydown', function (event: any) {
        if (event.key === keyCode.BACKSPACE && i !== 0) {
          inputs[i].value === '' && inputs[i - 1].focus();
        } else if (event.key === keyCode.TAB) {
          inputs[i].focus();
        } else if (!!inputs[i].value && i !== (length - 1)) {
          inputs[i + 1].focus();
        }
      })
    }
    this.cdr.detectChanges();
  }

  setFinalTIme(formValue: any) {
    let sTime, sHour1, sHour2, sMin1, sMin2, sMeridiem;
    sHour1 = formValue.hour1 || "0";
    sHour2 = formValue.hour2 || "0";
    sMin1 = formValue.min1 || "0";
    sMin2 = formValue.min2 || "0";
    sMeridiem = formValue.meridiem || Meridiem.AM;
    sTime = `${sHour1}${sHour2}:${sMin1}${sMin2} ${sMeridiem}`
    this.timeInput.valid && this.onChange.emit(sTime);
    return sTime
  }

  handleMeridiem(e: any) {
    e.preventDefault();
    const allowedKey = [77, 38, 40]
    if (allowedKey.includes(e.keyCode)) {
      this.timeInput.value.meridiem == Meridiem.PM ? this.timeInput.value.meridiem = Meridiem.AM : this.timeInput.value.meridiem = Meridiem.PM;
    } else if (e.key === keyCode.BACKSPACE) {
      this.timeInput.value.meridiem = '';
    } else if (e.keyCode === 65) {
      this.timeInput.value.meridiem = Meridiem.AM;
    } else if (e.keyCode === 80) {
      this.timeInput.value.meridiem = Meridiem.PM;
    }

    if (e?.type === "click") {
      this.timeInput.value.meridiem == Meridiem.PM ? this.timeInput.value.meridiem = Meridiem.AM : this.timeInput.value.meridiem = Meridiem.PM;
      let meridiem: any = document.querySelector(".meridiem");
      meridiem.focus();
    }
  }
}
