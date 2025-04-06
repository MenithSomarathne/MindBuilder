import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeGameComponent } from './shape-game.component';

describe('ShapeGameComponent', () => {
  let component: ShapeGameComponent;
  let fixture: ComponentFixture<ShapeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShapeGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
