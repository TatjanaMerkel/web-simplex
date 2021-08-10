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
  @Input() disabled = false

  @Output() dataChange = new EventEmitter<LinearSystemDataOutput>()

  targetVars: undefined | Array<null | Fraction>
  constraintVars: undefined | Array<Array<null | Fraction>>
  constraintVals: undefined | Array<null | Fraction>

  //
  // Lifecycle
  //

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      const previous = changes.data.previousValue
      const current = changes.data.currentValue



      const numberOfVars = this.data.numberOfVars
      const numberOfConstraints = this.data.numberOfConstraints

      if (!previous) {

        this.allocateNewArrays(numberOfVars, numberOfConstraints)

      } else if (this.linearSystemSizeChanged(previous, current)) {

        const previousTargetVars = this.targetVars!
        const previousConstraintVars = this.constraintVars!
        const previousConstraintVals = this.constraintVals!

        this.allocateNewArrays(numberOfVars, numberOfConstraints)

        this.restorePreviousArrays(previousTargetVars, previousConstraintVars, previousConstraintVals)
      }

      console.log('bla')
      console.log(this.targetVars)
    }
  }

  private allocateNewArrays(numberOfVars: number, numberOfConstraints: number): void {
    this.targetVars = new Array<null | Fraction>(numberOfVars).fill(null)

    this.constraintVars = new Array<Array<null | Fraction>>(numberOfConstraints)
    for (let c = 0; c < this.constraintVars.length; c++) {
      this.constraintVars[c] = new Array<null | Fraction>(numberOfVars).fill(null)
    }

    this.constraintVals = new Array<null | Fraction>(numberOfConstraints).fill(null)
  }

  private linearSystemSizeChanged(previous: LinearSystemDataInput, current: LinearSystemDataInput): boolean {
    return current.numberOfVars !== previous.numberOfVars
      || current.numberOfConstraints !== previous.numberOfConstraints
  }

  private restorePreviousArrays(
    previousTargetVars: Array<null | Fraction>,
    previousConstraintVars: Array<Array<null | Fraction>>,
    previousConstraintVals: Array<null | Fraction>
  ): void {

    const targetVars = this.targetVars!
    const constraintVars = this.constraintVars!
    const constraintVals = this.constraintVals!

    for (let v = 0; v < targetVars.length && v < previousTargetVars.length; v++) {
      targetVars[v] = previousTargetVars[v]
    }

    for (let c = 0; c < constraintVars.length && c < previousConstraintVars.length; c++) {
      for (let v = 0; v < constraintVars[c].length && v < previousConstraintVars[c].length; v++) {
        constraintVars[c][v] = previousConstraintVars[c][v]
      }
    }

    for (let c = 0; c < constraintVals.length && c < previousConstraintVals.length; c++) {
      constraintVals[c] = previousConstraintVals[c]
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
