import { TestBed } from '@angular/core/testing';

import { DatehelperService } from './datehelper.service';

describe('DatehelperService', () => {
  let service: DatehelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatehelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
