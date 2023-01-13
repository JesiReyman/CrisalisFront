import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaClienteComponent } from './empresa-cliente.component';

describe('EmpresaClienteComponent', () => {
  let component: EmpresaClienteComponent;
  let fixture: ComponentFixture<EmpresaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
