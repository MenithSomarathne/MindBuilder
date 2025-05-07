import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLessonsCardsComponent } from './student-lessons-cards.component';

describe('StudentLessonsCardsComponent', () => {
  let component: StudentLessonsCardsComponent;
  let fixture: ComponentFixture<StudentLessonsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentLessonsCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLessonsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
