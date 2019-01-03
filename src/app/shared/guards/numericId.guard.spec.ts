import { TestBed, async, inject } from '@angular/core/testing';

import {  NumericIdGuard } from './numericId.guard';

describe('StudentDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NumericIdGuard]
    });
  });

  it('should ...', inject([NumericIdGuard], (guard: NumericIdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
