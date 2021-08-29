import {ComponentFixture, TestBed} from '@angular/core/testing'

import {PracticeLinearSystemSizeCardComponent} from './practice-linear-system-size-card.component'

describe('PracticeLinearSystemSizeComponent', () => {
  let component: PracticeLinearSystemSizeCardComponent
  let fixture: ComponentFixture<PracticeLinearSystemSizeCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticeLinearSystemSizeCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeLinearSystemSizeCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
