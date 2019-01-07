import { TestBed, async, inject } from '@angular/core/testing';

import { AsignatureFormGuard } from './asignature-form.guard';

describe('AsignatureFormGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsignatureFormGuard]
    });
  });

  it('should ...', inject([AsignatureFormGuard], (guard: AsignatureFormGuard) => {
    expect(guard).toBeTruthy();
  }));
});
