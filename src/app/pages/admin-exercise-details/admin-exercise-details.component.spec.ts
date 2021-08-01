import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExerciseDetailsComponent } from './admin-exercise-details.component';

describe('AdminExerciseDetailsComponent', () => {
  let component: AdminExerciseDetailsComponent;
  let fixture: ComponentFixture<AdminExerciseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExerciseDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExerciseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
