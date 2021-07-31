import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExercisesDifficultyComponent } from './admin-exercises-difficulty.component';

describe('AdminExercisesDifficultyComponent', () => {
  let component: AdminExercisesDifficultyComponent;
  let fixture: ComponentFixture<AdminExercisesDifficultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExercisesDifficultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExercisesDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
