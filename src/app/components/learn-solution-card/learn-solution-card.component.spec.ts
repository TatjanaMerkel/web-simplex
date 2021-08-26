import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnSolutionCardComponent } from './learn-solution-card.component';

describe('LearnSolutionCardComponent', () => {
  let component: LearnSolutionCardComponent;
  let fixture: ComponentFixture<LearnSolutionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnSolutionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnSolutionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
