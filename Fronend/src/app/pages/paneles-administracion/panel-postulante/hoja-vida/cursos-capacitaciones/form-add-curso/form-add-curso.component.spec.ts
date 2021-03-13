import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddCursoComponent } from './form-add-curso.component';

describe('FormAddCursoComponent', () => {
  let component: FormAddCursoComponent;
  let fixture: ComponentFixture<FormAddCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
