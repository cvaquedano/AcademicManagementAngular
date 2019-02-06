import { TestBed, async, inject } from '@angular/core/testing';

import { CourseFormGuard } from './course-form.guard';

describe('CourseFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseFormGuard]
    });
  });

  it('should ...', inject([CourseFormGuard], (guard: CourseFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
