import { TestBed } from '@angular/core/testing';

import { AgeGuard } from './age.guard';

describe('AgeGuard', () => {
  let guard: AgeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AgeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
