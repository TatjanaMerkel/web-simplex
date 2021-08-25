import {ComponentFixture, TestBed} from '@angular/core/testing'

import {LearnOverviewCardComponent} from './learn-overview-card.component'

describe('LearnOverviewCardComponent', () => {
  let component: LearnOverviewCardComponent
  let fixture: ComponentFixture<LearnOverviewCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnOverviewCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnOverviewCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
