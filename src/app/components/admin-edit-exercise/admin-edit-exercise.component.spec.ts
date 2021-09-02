import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AdminEditExerciseComponent} from './admin-edit-exercise.component'

describe('AdminExerciseDetailsComponent', () => {
  let component: AdminEditExerciseComponent
  let fixture: ComponentFixture<AdminEditExerciseComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEditExerciseComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditExerciseComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
