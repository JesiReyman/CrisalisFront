import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePersonaComponent } from './cliente-persona.component';

describe('ClientePersonaComponent', () => {
  let component: ClientePersonaComponent;
  let fixture: ComponentFixture<ClientePersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientePersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientePersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
