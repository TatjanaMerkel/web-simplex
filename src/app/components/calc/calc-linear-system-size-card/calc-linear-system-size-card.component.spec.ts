import {ComponentFixture, TestBed} from '@angular/core/testing'

import {CalcLinearSystemSizeCardComponent} from './calc-linear-system-size-card.component'

describe('LargeLpComponent', () => {
  let component: CalcLinearSystemSizeCardComponent
  let fixture: ComponentFixture<CalcLinearSystemSizeCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalcLinearSystemSizeCardComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcLinearSystemSizeCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
