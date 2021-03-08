import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioInfoEmpleadorComponent } from './formulario-info-empleador.component';

describe('FormularioInfoEmpleadorComponent', () => {
  let component: FormularioInfoEmpleadorComponent;
  let fixture: ComponentFixture<FormularioInfoEmpleadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioInfoEmpleadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioInfoEmpleadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
