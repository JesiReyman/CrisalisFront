import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmarPedidoComponent } from './armar-pedido.component';

describe('ArmarPedidoComponent', () => {
  let component: ArmarPedidoComponent;
  let fixture: ComponentFixture<ArmarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArmarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
