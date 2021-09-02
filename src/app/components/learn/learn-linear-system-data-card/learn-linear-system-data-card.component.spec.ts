import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LearnLinearSystemDataCardComponent} from './learn-linear-system-data-card.component'

describe('LearnLinearSystemDataCardComponent', () => {
  let component: LearnLinearSystemDataCardComponent
  let fixture: ComponentFixture<LearnLinearSystemDataCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnLinearSystemDataCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnLinearSystemDataCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
