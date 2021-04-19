import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditarAdminComponent } from './form-editar-admin.component';

describe('FormEditarAdminComponent', () => {
  let component: FormEditarAdminComponent;
  let fixture: ComponentFixture<FormEditarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
