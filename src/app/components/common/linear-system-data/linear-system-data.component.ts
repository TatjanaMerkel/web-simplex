import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core'

import {Fraction} from 'mathjs'

import {LinearSystemDataInit} from './linear-system-data-init'
import {LinearSystemDataValues} from './linear-system-data-values'
import {fractionFromInputEvent} from '../../../../common/fractions'

@Component({
  selector: 'app-linear-system-data',
  templateUrl: './linear-system-data.component.html',
  styleUrls: ['./linear-system-data.component.css']
})
export class LinearSystemDataComponent implements OnChanges {

  @Input() init: undefined | LinearSystemDataInit
  @Input() disabled = false

  @Output() dataChange = new EventEmitter<LinearSystemDataValues>()

  targetVars: undefined | Array<null | Fraction>
  constraintVars: undefined | Array<Array<null | Fraction>>
  constraintVals: undefined | Array<null | Fraction>

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.init) {
      const previous = changes.init.previousValue
      const current = changes.init.currentValue

      LinearSystemDataComponent.checkData(current)

      const {numberOfVars, numberOfConstraints, targetVars, constraintVars, constraintVals} = current

      if (!previous) {

        this.allocateNewArrays(numberOfVars, numberOfConstraints)

      } else if (LinearSystemDataComponent.linearSystemSizeChanged(previous, current)) {

        const previousTargetVars = this.targetVars!
        const previousConstraintVars = this.constraintVars!
        const previousConstraintVals = this.constraintVals!

        this.allocateNewArrays(numberOfVars, numberOfConstraints)

        this.overwriteArrays(previousTargetVars, previousConstraintVars, previousConstraintVals)
      }

      if (targetVars && constraintVars && constraintVals) {
        this.overwriteArrays(targetVars, constraintVars, constraintVals)
      }
    }
  }

  formatFraction(fraction: null | Fraction): string {
    if (!fraction) {
      return ''
    }

    const sign = fraction.s === 1 ? '' : '-';

    return fraction.d === 1
      ? sign + fraction.n
      : sign + fraction.n + '/' + fraction.d;
  }

  private static checkData(data: LinearSystemDataInit) {
    const {numberOfVars, numberOfConstraints, targetVars, constraintVars, constraintVals} = data

    if (numberOfVars <= 0) {
      throw new Error(`Invalid numberOfVars (${numberOfVars}). Must be > 0.`)
    }

    if (numberOfConstraints <= 0) {
      throw new Error(`Invalid numberOfConstraints (${numberOfConstraints}). Must be > 0.`)
    }

    if (targetVars === null && constraintVars === null && constraintVals === null) {
      // valid

    } else if (targetVars !== null && constraintVars !== null && constraintVals !== null) {

      if (targetVars.length != numberOfVars) {
        throw new Error(`Invalid targetVars (${targetVars}). Length must be numberOfVars (${numberOfVars}).`)
      }

      if (constraintVars.length != numberOfConstraints) {
        throw new Error(`Invalid constraintVars (${constraintVars}). Length must be numberOfConstraints (${numberOfConstraints}).`)
      }

      if (constraintVals.length != numberOfConstraints) {
        throw new Error(`Invalid constraintVals (${constraintVals}). Length must be numberOfConstraints (${numberOfConstraints}).`)
      }

    } else {
      throw new Error('targetVars, constraintVars, and constraintVals must all be null or not null')
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

  private static linearSystemSizeChanged(previous: LinearSystemDataInit, current: LinearSystemDataInit): boolean {
    return current.numberOfVars !== previous.numberOfVars
      || current.numberOfConstraints !== previous.numberOfConstraints
  }

  private overwriteArrays(
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

  onTargetVarChanged(event: Event, v: number) {
    const targetVars = this.targetVars!

    targetVars[v] = fractionFromInputEvent(event)

    const isValid = this.validateInput()
    this.emitData(isValid)
  }

  onConstraintVarChanged(event: Event, c: number, v: number) {
    const constraintVars = this.constraintVars!

    constraintVars[c][v] = fractionFromInputEvent(event)

    const isValid = this.validateInput()
    this.emitData(isValid)
  }

  onConstraintConstantChanged(event: Event, c: number) {
    const constraintVals = this.constraintVals!

    constraintVals[c] = fractionFromInputEvent(event)

    const isValid = this.validateInput()
    this.emitData(isValid)
  }

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

  trackByIndex(index: number): number {
    return index
  }
}
