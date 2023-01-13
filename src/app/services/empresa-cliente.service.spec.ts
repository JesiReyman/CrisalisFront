import { TestBed } from '@angular/core/testing';

import { EmpresaClienteService } from './empresa-cliente.service';

describe('EmpresaClienteService', () => {
  let service: EmpresaClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
