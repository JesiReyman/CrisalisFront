import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificacionEmpresaComponent } from './verificacion-empresa.component';

describe('VerificacionEmpresaComponent', () => {
  let component: VerificacionEmpresaComponent;
  let fixture: ComponentFixture<VerificacionEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificacionEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificacionEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
