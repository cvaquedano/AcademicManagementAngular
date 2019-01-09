import { TestBed, async, inject } from '@angular/core/testing';

import { TeacherFormGuard } from './teacher-form.guard';

describe('TeacherFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherFormGuard]
    });
  });

  it('should ...', inject([TeacherFormGuard], (guard: TeacherFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
