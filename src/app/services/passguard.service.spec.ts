import { TestBed } from '@angular/core/testing';

import { PassguardService } from './passguard.service';

describe('PassguardService', () => {
  let service: PassguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
