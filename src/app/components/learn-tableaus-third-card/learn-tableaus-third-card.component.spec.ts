import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LearnTableausThirdCardComponent} from './learn-tableaus-third-card.component'

describe('LearnTableausCardComponent', () => {
  let component: LearnTableausThirdCardComponent
  let fixture: ComponentFixture<LearnTableausThirdCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnTableausThirdCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnTableausThirdCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
