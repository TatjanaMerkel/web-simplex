import {Component, EventEmitter, Output} from '@angular/core'

import {LinearSystemSize} from './linear-system-size'

@Component({
  selector: 'app-calc-linear-system-size-card',
  templateUrl: './calc-linear-system-size-card.component.html',
  styleUrls: ['./calc-linear-system-size-card.component.css']
})
export class CalcLinearSystemSizeCardComponent {

  @Output() dataChange = new EventEmitter<LinearSystemSize | null>()

  editable = true
  inputValid = false

  numberOfVars: null | number = null
  numberOfConstraints: null | number = null

  emitInput(): void {
    this.dataChange.emit({
      numberOfVars: this.numberOfVars!,
      numberOfConstraints: this.numberOfConstraints!
    })

    this.editable = false
  }

  startEditing(): void {
    this.dataChange.emit(null)

    this.editable = true
  }

  onNumberOfVarsChange(event: Event): void {
    this.numberOfVars = CalcLinearSystemSizeCardComponent.numberFromInputEvent(event)
    this.inputValid = this.validateInput()
  }

  onNumberOfConstraintsChange(event: Event): void {
    this.numberOfConstraints = CalcLinearSystemSizeCardComponent.numberFromInputEvent(event)
    this.inputValid = this.validateInput()
  }

  validateInput(): boolean {
    return this.numberOfVars !== null && this.numberOfConstraints !== null
  }

  private static numberFromInputEvent(event: Event): number | null {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    if (inputValue === '') {
      return null
    } else {
      return Number(inputValue)
    }
  }
}
