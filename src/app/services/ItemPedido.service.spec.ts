/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItemPedidoService } from './ItemPedido.service';

describe('Service: ItemPedido', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemPedidoService]
    });
  });

  it('should ...', inject([ItemPedidoService], (service: ItemPedidoService) => {
    expect(service).toBeTruthy();
  }));
});
