import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalcSolutionCardComponent} from './calc-solution-card.component';

describe('SolutionComponent', () => {
  let component: CalcSolutionCardComponent;
  let fixture: ComponentFixture<CalcSolutionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcSolutionCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcSolutionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
