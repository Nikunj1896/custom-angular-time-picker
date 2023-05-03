import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAngularTimePickerComponent } from './custom-angular-time-picker.component';

describe('CustomAngularTimePickerComponent', () => {
  let component: CustomAngularTimePickerComponent;
  let fixture: ComponentFixture<CustomAngularTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomAngularTimePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomAngularTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
