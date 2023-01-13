import { TestBed } from '@angular/core/testing';

import { ClientePersonaService } from './cliente-persona.service';

describe('ClientePersonaService', () => {
  let service: ClientePersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientePersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
