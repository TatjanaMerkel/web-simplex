import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CalcLinearSystemDataCardComponent} from './calc-linear-system-data-card.component'

describe('LinearSystemDataCardComponent', () => {
  let component: CalcLinearSystemDataCardComponent
  let fixture: ComponentFixture<CalcLinearSystemDataCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcLinearSystemDataCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcLinearSystemDataCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
