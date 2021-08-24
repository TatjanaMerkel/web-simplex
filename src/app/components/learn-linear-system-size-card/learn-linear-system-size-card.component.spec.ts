import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnLinearSystemSizeCardComponent } from './learn-linear-system-size-card.component';

describe('LearnLinearSystemSizeCardComponent', () => {
  let component: LearnLinearSystemSizeCardComponent;
  let fixture: ComponentFixture<LearnLinearSystemSizeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnLinearSystemSizeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnLinearSystemSizeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
