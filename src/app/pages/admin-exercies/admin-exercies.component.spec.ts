import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExerciesComponent } from './admin-exercies.component';

describe('AdminExerciesComponent', () => {
  let component: AdminExerciesComponent;
  let fixture: ComponentFixture<AdminExerciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExerciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminExerciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
