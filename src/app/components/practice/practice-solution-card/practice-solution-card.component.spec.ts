import {ComponentFixture, TestBed} from '@angular/core/testing'

import {PracticeSolutionCardComponent} from './practice-solution-card.component'

describe('PracticeSolutionComponent', () => {
  let component: PracticeSolutionCardComponent
  let fixture: ComponentFixture<PracticeSolutionCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticeSolutionCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSolutionCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
