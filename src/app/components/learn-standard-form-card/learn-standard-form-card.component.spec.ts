import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LearnStandardFormCardComponent} from './learn-standard-form-card.component'

describe('LearnStandardFormCardComponent', () => {
  let component: LearnStandardFormCardComponent
  let fixture: ComponentFixture<LearnStandardFormCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnStandardFormCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnStandardFormCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
