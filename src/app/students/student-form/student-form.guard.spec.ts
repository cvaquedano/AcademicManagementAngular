import { TestBed, async, inject } from '@angular/core/testing';

import { StudentFormGuard } from './student-form.guard';

describe('StudentFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentFormGuard]
    });
  });

  it('should ...', inject([StudentFormGuard], (guard: StudentFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
