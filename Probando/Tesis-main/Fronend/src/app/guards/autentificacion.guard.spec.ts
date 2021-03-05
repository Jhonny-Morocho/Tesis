import { TestBed, async, inject } from '@angular/core/testing';

import { AutentificacionGuard } from './autentificacion.guard';

describe('AutentificacionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutentificacionGuard]
    });
  });

  it('should ...', inject([AutentificacionGuard], (guard: AutentificacionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
