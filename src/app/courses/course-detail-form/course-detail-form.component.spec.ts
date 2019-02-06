import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailFormComponent } from './course-detail-form.component';

describe('CourseDetailFormComponent', () => {
  let component: CourseDetailFormComponent;
  let fixture: ComponentFixture<CourseDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
