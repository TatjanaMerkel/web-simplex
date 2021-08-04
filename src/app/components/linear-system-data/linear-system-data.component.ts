import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {LinearSystemDataInput} from './linear-system-data-input'
import {LinearSystemDataOutput} from './linear-system-data-output'

@Component({
  selector: 'app-linear-system-data',
  templateUrl: './linear-system-data.component.html',
  styleUrls: ['./linear-system-data.component.css']
})
export class LinearSystemDataComponent implements OnChanges {

  @Input() data: undefined | LinearSystemDataInput

  @Output() dataChange = new EventEmitter<LinearSystemDataOutput>()

  targetVars: undefined | Array<null | Fraction>
  constraintVars: undefined | Array<Array<null | Fraction>>
  constraintVals: undefined | Array<null | Fraction>

  //
  // Lifecycle
  //

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      const current = changes.data.currentValue
      const previous = changes.data.previousValue

      if (!previous
        || current.numberOfVars !== previous.numberOfVars
        || current.numberOfConstraints !== previous.numberOfConstraints) {

        const numberOfVars = this.data.numberOfVars
        const numberOfConstraints = this.data.numberOfConstraints

        this.targetVars = new Array<null | Fraction>(numberOfVars).fill(null)

        this.constraintVars = new Array<Array<null | Fraction>>(numberOfConstraints)
        for (let c = 0; c < this.constraintVars.length; c++) {
          this.constraintVars[c] = new Array<null | Fraction>(numberOfVars).fill(null)
        }

        this.constraintVals = new Array<null | Fraction>(numberOfConstraints).fill(null)
      }
    }
  }

  //
  // Event Handlers
  //

  onTargetVarChanged(event: Event, v: number) {
    const targetVars = this.targetVars!

    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      targetVars[v] = math.fraction(inputValue) as Fraction
    } catch (e) {
      targetVars[v] = null
    }

    const isValid = this.validateInput()
    this.emitData(isValid)
  }

  onConstraintVarChanged(event: Event, c: number, v: number) {
    const constraintVars = this.constraintVars!

    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      constraintVars[c][v] = math.fraction(inputValue) as Fraction
    } catch (e) {
      constraintVars[c][v] = null
    }

    const isValid = this.validateInput()
    this.emitData(isValid)
  }

  onConstraintConstantChanged(event: Event, c: number) {
    const constraintVals = this.constraintVals!

    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      constraintVals[c] = math.fraction(inputValue) as Fraction
    } catch (e) {
      constraintVals[c] = null
    }

    const isValid = this.validateInput()
    this.emitData(isValid)
  }

  //
  // Helper
  //

  /**
   * Check if all input fields are filled.
   */
  validateInput(): boolean {
    const targetVars = this.targetVars!
    const constraintVars = this.constraintVars!
    const constraintVals = this.constraintVals!

    if (targetVars.indexOf(null) !== -1) {
      return false
    }

    for (const constraintVarsLine of constraintVars) {
      if (constraintVarsLine.indexOf(null) !== -1) {
        return false
      }
    }

    return constraintVals.indexOf(null) === -1
  }

  emitData(isValid: boolean): void {
    const targetVars = this.targetVars!
    const constraintVars = this.constraintVars!
    const constraintVals = this.constraintVals!

    this.dataChange.emit({
      targetVars,
      constraintVars,
      constraintVals,
      isValid
    })
  }

  trackByIndex(index: number, _item: any) {
    return index
  }
}
