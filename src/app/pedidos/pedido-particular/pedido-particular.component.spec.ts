import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoParticularComponent } from './pedido-particular.component';

describe('PedidoParticularComponent', () => {
  let component: PedidoParticularComponent;
  let fixture: ComponentFixture<PedidoParticularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoParticularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoParticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
