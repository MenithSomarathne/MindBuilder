import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLessonListComponent } from './admin-lesson-list.component';

describe('AdminLessonListComponent', () => {
  let component: AdminLessonListComponent;
  let fixture: ComponentFixture<AdminLessonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLessonListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLessonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
