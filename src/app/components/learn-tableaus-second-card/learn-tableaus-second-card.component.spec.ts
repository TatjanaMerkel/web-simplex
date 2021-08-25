import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTableausSecondCardComponent } from './learn-tableaus-second-card.component';

describe('LearnTableausSecondCardComponent', () => {
  let component: LearnTableausSecondCardComponent;
  let fixture: ComponentFixture<LearnTableausSecondCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnTableausSecondCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnTableausSecondCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
