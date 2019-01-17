import { TestBed } from '@angular/core/testing';

import { StudentFilterParameterService } from './student-filter-parameter.service';

describe('StudentFilterParameterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentFilterParameterService = TestBed.get(StudentFilterParameterService);
    expect(service).toBeTruthy();
  });
});
