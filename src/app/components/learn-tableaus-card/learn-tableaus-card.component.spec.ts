import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTableausCardComponent } from './learn-tableaus-card.component';

describe('LearnTableausCardComponent', () => {
  let component: LearnTableausCardComponent;
  let fixture: ComponentFixture<LearnTableausCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnTableausCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnTableausCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
