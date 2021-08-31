import {ComponentFixture, TestBed} from '@angular/core/testing'

import {PracticeInitLinearSystemDataCardComponent} from './practice-init-linear-system-data-card.component'

describe('PracticeInitLinearSystemDataCardComponent', () => {
  let component: PracticeInitLinearSystemDataCardComponent
  let fixture: ComponentFixture<PracticeInitLinearSystemDataCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PracticeInitLinearSystemDataCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeInitLinearSystemDataCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
