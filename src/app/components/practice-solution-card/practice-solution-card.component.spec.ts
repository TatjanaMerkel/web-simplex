import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSolutionComponentCard } from './practice-solution-card.component';

describe('PracticeSolutionComponent', () => {
  let component: PracticeSolutionComponentCard;
  let fixture: ComponentFixture<PracticeSolutionComponentCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeSolutionComponentCard ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSolutionComponentCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
