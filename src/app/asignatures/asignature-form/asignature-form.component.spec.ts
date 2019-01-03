import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignatureFormComponent } from './asignature-form.component';

describe('AsignatureFormComponent', () => {
  let component: AsignatureFormComponent;
  let fixture: ComponentFixture<AsignatureFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignatureFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
