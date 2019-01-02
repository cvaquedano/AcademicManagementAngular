import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignatureDetailComponent } from './asignature-detail.component';

describe('AsignatureDetailComponent', () => {
  let component: AsignatureDetailComponent;
  let fixture: ComponentFixture<AsignatureDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignatureDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignatureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
