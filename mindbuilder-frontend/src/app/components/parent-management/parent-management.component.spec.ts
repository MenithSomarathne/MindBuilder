import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentManagementComponent } from './parent-management.component';

describe('ParentManagementComponent', () => {
  let component: ParentManagementComponent;
  let fixture: ComponentFixture<ParentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
