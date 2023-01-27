import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpuestoItemComponent } from './impuesto-item.component';

describe('ImpuestoItemComponent', () => {
  let component: ImpuestoItemComponent;
  let fixture: ComponentFixture<ImpuestoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpuestoItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpuestoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
