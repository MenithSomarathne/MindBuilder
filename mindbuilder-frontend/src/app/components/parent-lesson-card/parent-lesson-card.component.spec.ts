import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentLessonCardComponent } from './parent-lesson-card.component';

describe('ParentLessonCardComponent', () => {
  let component: ParentLessonCardComponent;
  let fixture: ComponentFixture<ParentLessonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentLessonCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentLessonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
