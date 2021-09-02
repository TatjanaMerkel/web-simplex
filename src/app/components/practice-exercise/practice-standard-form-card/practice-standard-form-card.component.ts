import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {ExpectedStandardForm} from './expected-standard-form'
import {fractionFromInputEvent} from '../../../../common/fractions'

@Component({
  selector: 'app-practice-standard-form-card[expected]',
  templateUrl: './practice-standard-form-card.component.html',
  styleUrls: ['./practice-standard-form-card.component.css']
})
export class PracticeStandardFormCardComponent implements OnInit {

  @Input() expected!: ExpectedStandardForm
  @Input() disabled = false

  @Output() correct = new EventEmitter<void>()

  initialized = false

  targetVars!: Array<null | Fraction>
  targetZVal: null | Fraction = null
  targetVal: null | Fraction = null
  constraintVars!: Array<Array<null | Fraction>>
  constraintZVals!: Array<null | Fraction>
  constraintVals!: Array<null | Fraction>

  targetVarsCorrect!: Array<boolean>
  targetZValCorrect = true
  targetValCorrect = true
  constraintVarsCorrect!: Array<Array<boolean>>
  constraintZValsCorrect!: Array<boolean>
  constraintValsCorrect!: Array<boolean>

  get isInputCorrect(): boolean {
    return this.targetVarsCorrect.every(bool => bool)
      && this.targetZValCorrect
      && this.targetValCorrect
      && this.constraintVarsCorrect.every(bools => bools.every(bool => bool))
      && this.constraintZValsCorrect.every(bool => bool)
      && this.constraintValsCorrect.every(bool => bool)
  }

  ngOnInit() {
    const expected = this.expected!

    this.targetVars = new Array<null | Fraction>(expected.targetVars.length).fill(null)
    this.targetVarsCorrect = new Array<boolean>(expected.targetVars.length).fill(true)

    this.constraintVars = new Array<Array<null | Fraction>>(expected.constraintVars.length)
    this.constraintVarsCorrect = new Array<Array<boolean>>(expected.constraintVars.length)

    for (let c = 0; c < expected.constraintVars.length; c++) {
      this.constraintVars[c] = new Array<null | Fraction>(expected.constraintVars[c].length).fill(null)
      this.constraintVarsCorrect[c] = new Array<boolean>(expected.constraintVars[c].length).fill(true)
    }

    this.constraintZVals = new Array<null | Fraction>(expected.constraintVars.length).fill(null)
    this.constraintZValsCorrect = new Array<boolean>(expected.constraintVars.length).fill(true)

    this.constraintVals = new Array<null | Fraction>(expected.constraintVars.length).fill(null)
    this.constraintValsCorrect = new Array<boolean>(expected.constraintVars.length).fill(true)

    this.initialized = true
  }

  saveTargetVar(event: Event, v: number): void {
    this.targetVars[v] = fractionFromInputEvent(event)
  }

  saveTargetZVal(event: Event): void {
    this.targetZVal = fractionFromInputEvent(event)
  }

  saveTargetVal(event: Event): void {
    this.targetVal = fractionFromInputEvent(event)
  }

  saveConstraintVar(event: Event, c: number, v: number): void {
    this.constraintVars[c][v] = fractionFromInputEvent(event)
  }

  saveConstraintZVal(event: Event, c: number): void {
    this.constraintZVals[c] = fractionFromInputEvent(event)
  }

  saveConstraintVal(event: Event, c: number): void {
    this.constraintVals[c] = fractionFromInputEvent(event)
  }

  checkUserInputAndEmit(): void {
    this.checkUserInput()

    if (this.isInputCorrect) {
      this.correct.emit()
    }
  }

  private checkUserInput(): void {
    const expected = this.expected!

    for (let v = 0; v < this.targetVars.length; v++) {
      const targetVar = this.targetVars[v]

      if (!targetVar || !math.equal(targetVar, expected.targetVars[v])) {
        this.targetVarsCorrect[v] = false
      }
    }

    if (!this.targetZVal || !math.equal(this.targetZVal, math.fraction(1))) {
      this.targetZValCorrect = false
    }

    if (!this.targetVal || !math.equal(this.targetVal, math.fraction(0))) {
      this.targetValCorrect = false
    }

    for (let c = 0; c < this.constraintVars.length; c++) {
      for (let v = 0; v < this.constraintVars[c].length; v++) {
        const constraintVar = this.constraintVars[c][v]

        if (!constraintVar || !math.equal(constraintVar, expected.constraintVars[c][v])) {
          this.constraintVarsCorrect[c][v] = false
        }
      }
    }

    for (let c = 0; c < this.constraintZVals.length; c++) {
      const constraintZVal = this.constraintZVals[c]

      if (!constraintZVal || !math.equal(constraintZVal, math.fraction(0))) {
        this.constraintZValsCorrect[c] = false
      }
    }

    for (let c = 0; c < this.constraintVals.length; c++) {
      const constraintVal = this.constraintVals[c]

      if (!constraintVal || !math.equal(constraintVal, expected.constraintVals[c])) {
        this.constraintValsCorrect[c] = false
      }
    }
  }

  trackByIndex(index: number): number {
    return index
  }
}
