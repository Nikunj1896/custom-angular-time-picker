import { TestBed } from '@angular/core/testing';

import { CustomAngularTimePickerService } from './custom-angular-time-picker.service';

describe('CustomAngularTimePickerService', () => {
  let service: CustomAngularTimePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomAngularTimePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
