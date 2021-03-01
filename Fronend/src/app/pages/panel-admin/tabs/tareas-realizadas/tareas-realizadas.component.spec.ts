import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasRealizadasComponent } from './tareas-realizadas.component';

describe('TareasRealizadasComponent', () => {
  let component: TareasRealizadasComponent;
  let fixture: ComponentFixture<TareasRealizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasRealizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
