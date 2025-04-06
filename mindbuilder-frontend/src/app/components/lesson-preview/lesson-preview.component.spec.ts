import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPreviewComponent } from './lesson-preview.component';

describe('LessonPreviewComponent', () => {
  let component: LessonPreviewComponent;
  let fixture: ComponentFixture<LessonPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
