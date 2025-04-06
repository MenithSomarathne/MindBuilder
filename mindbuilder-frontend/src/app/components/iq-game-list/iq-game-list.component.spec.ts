import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqGameListComponent } from './iq-game-list.component';

describe('IqGameListComponent', () => {
  let component: IqGameListComponent;
  let fixture: ComponentFixture<IqGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IqGameListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IqGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
