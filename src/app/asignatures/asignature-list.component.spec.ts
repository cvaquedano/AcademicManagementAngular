import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignatureListComponent } from './asignature-list.component';

describe('AsignatureListComponent', () => {
  let component: AsignatureListComponent;
  let fixture: ComponentFixture<AsignatureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignatureListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
