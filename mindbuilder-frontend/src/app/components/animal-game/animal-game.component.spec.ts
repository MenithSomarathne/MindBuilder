import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalGameComponent } from './animal-game.component';

describe('AnimalGameComponent', () => {
  let component: AnimalGameComponent;
  let fixture: ComponentFixture<AnimalGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
