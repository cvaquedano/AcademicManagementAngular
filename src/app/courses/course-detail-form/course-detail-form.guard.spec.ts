import { TestBed, async, inject } from '@angular/core/testing';

import { CourseDetailFormGuard } from './course-detail-form.guard';

describe('CourseDetailFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseDetailFormGuard]
    });
  });

  it('should ...', inject([CourseDetailFormGuard], (guard: CourseDetailFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
