import {ComponentFixture, TestBed} from '@angular/core/testing'

import {PracticeStandardFormCardComponent} from './practice-standard-form-card.component'

describe('PracticeStandardFormCardComponent', () => {
  let component: PracticeStandardFormCardComponent
  let fixture: ComponentFixture<PracticeStandardFormCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticeStandardFormCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeStandardFormCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
