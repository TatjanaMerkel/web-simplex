import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LearnTableausGeneralCardComponent} from './learn-tableaus-general-card.component'

describe('LearnTableausGeneralCardComponent', () => {
  let component: LearnTableausGeneralCardComponent
  let fixture: ComponentFixture<LearnTableausGeneralCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnTableausGeneralCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnTableausGeneralCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
