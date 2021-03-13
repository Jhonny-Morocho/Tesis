import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarCursoComponent } from './form-editar-curso.component';

describe('FormEditarCursoComponent', () => {
  let component: FormEditarCursoComponent;
  let fixture: ComponentFixture<FormEditarCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditarCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
