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

  numberOfVars: number | null = null
  numberOfConstraints: number | null = null

  onGenerate(): void {
    this.dataChange.emit({
      numberOfVars: this.numberOfVars!,
      numberOfConstraints: this.numberOfConstraints!
    })

    this.editable = false
  }

  onEdit(): void {
    this.dataChange.emit(null)

    this.editable = true
  }

  onNumberOfVarsChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    if (inputValue === '') {
      this.numberOfVars = null
    } else {
      this.numberOfVars = Number(inputValue)
    }

    this.inputValid = this.validateInput()
  }

  onNumberOfConstraintsChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    if (inputValue === '') {
      this.numberOfConstraints = null
    } else {
      this.numberOfConstraints = Number(inputValue)
    }

    this.inputValid = this.validateInput()
  }

  validateInput(): boolean {
    return this.numberOfVars !== null && this.numberOfConstraints !== null
  }
}
