import { TestBed } from '@angular/core/testing';

import { RegisterPensionerService } from './register-pensioner.service';

describe('RegisterPensionerService', () => {
  let service: RegisterPensionerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterPensionerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
