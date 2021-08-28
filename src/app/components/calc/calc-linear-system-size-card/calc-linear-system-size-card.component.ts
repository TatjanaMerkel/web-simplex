import {Component, EventEmitter, Output} from '@angular/core'

import {CalcLinearSystemSizeCardOutput} from './calc-linear-system-size-card-output'
import {numberFromInputEvent} from '../../../../common/numbers'

@Component({
  selector: 'app-calc-linear-system-size-card',
  templateUrl: './calc-linear-system-size-card.component.html',
  styleUrls: ['./calc-linear-system-size-card.component.css']
})
export class CalcLinearSystemSizeCardComponent {

  @Output() outputChange = new EventEmitter<CalcLinearSystemSizeCardOutput | null>()

  editable = true

  numberOfVars: null | number = null
  numberOfConstraints: null | number = null

  numberOfVarsValid = true
  numberOfConstraintsValid = true

  numberFromInputEvent = numberFromInputEvent

  get isInputValid(): boolean {
    return this.numberOfVarsValid && this.numberOfConstraintsValid
  }

  checkUserInputAndEmit(): void {
    this.checkUserInput()

    if (this.isInputValid) {
      const numberOfVars = this.numberOfVars!
      const numberOfConstraints = this.numberOfConstraints!

      this.outputChange.emit({numberOfVars, numberOfConstraints})

      this.editable = false
    }
  }

  startEditing(): void {
    this.outputChange.emit(null)

    this.editable = true
  }

  private checkUserInput(): void {
    this.numberOfVarsValid = this.numberOfVars !== null
    this.numberOfConstraintsValid = this.numberOfConstraints !== null
  }
}
