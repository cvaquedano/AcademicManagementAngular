import { TestBed, async, inject } from '@angular/core/testing';

import { StudentDetailGuard } from './student-detail.guard';

describe('StudentDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentDetailGuard]
    });
  });

  it('should ...', inject([StudentDetailGuard], (guard: StudentDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
