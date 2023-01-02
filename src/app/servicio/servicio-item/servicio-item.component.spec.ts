import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioItemComponent } from './servicio-item.component';

describe('ServicioItemComponent', () => {
  let component: ServicioItemComponent;
  let fixture: ComponentFixture<ServicioItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
