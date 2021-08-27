import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LearnTableausFirstCardComponent} from './learn-tableaus-first-card.component'

describe('LearnTableausFirstCardComponent', () => {
  let component: LearnTableausFirstCardComponent
  let fixture: ComponentFixture<LearnTableausFirstCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnTableausFirstCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnTableausFirstCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
