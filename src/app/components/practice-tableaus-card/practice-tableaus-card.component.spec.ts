import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeTableausCardComponent } from './practice-tableaus-card.component';

describe('PracticeTableausCardComponent', () => {
  let component: PracticeTableausCardComponent;
  let fixture: ComponentFixture<PracticeTableausCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeTableausCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeTableausCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
