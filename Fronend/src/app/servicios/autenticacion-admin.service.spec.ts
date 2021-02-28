import { TestBed } from '@angular/core/testing';

import { AutenticacionAdminService } from './autenticacion-admin.service';

describe('AutenticacionAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenticacionAdminService = TestBed.get(AutenticacionAdminService);
    expect(service).toBeTruthy();
  });
});
