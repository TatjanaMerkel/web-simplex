import {ComponentFixture, TestBed} from '@angular/core/testing'

import {PracticeLinearSystemDataCardComponent} from './practice-linear-system-data-card.component'

describe('PracticeLinearSystemDataCardComponent', () => {
  let component: PracticeLinearSystemDataCardComponent
  let fixture: ComponentFixture<PracticeLinearSystemDataCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticeLinearSystemDataCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeLinearSystemDataCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
