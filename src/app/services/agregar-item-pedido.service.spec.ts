import { TestBed } from '@angular/core/testing';

import { AgregarItemPedidoService } from './agregar-item-pedido.service';

describe('AgregarItemPedidoService', () => {
  let service: AgregarItemPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarItemPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
