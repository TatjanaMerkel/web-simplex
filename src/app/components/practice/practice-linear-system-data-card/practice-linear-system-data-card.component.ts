import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {ExpectedLinearSystemData} from './expected-linear-system-data'
import {fractionFromInputEvent} from '../../../../common/fractions'

@Component({
  selector: 'app-practice-linear-system-data-card[expected]',
  templateUrl: './practice-linear-system-data-card.component.html',
  styleUrls: ['./practice-linear-system-data-card.component.css']
})
export class PracticeLinearSystemDataCardComponent implements OnInit {

  @Input() expected!: ExpectedLinearSystemData
  @Input() disabled = false

  @Output() correct = new EventEmitter<void>()

  initialized = false

  numberOfVars!: number
  numberOfConstraints!: number

  targetVars!: Array<null | Fraction>
  constraintVars!: Array<Array<null | Fraction>>
  constraintVals!: Array<null | Fraction>

  targetVarsCorrect!: Array<boolean>
  constraintVarsCorrect!: Array<Array<boolean>>
  constraintValsCorrect!: Array<boolean>

  get isInputCorrect(): boolean {
    return this.targetVarsCorrect.every(bool => bool)
      && this.constraintVarsCorrect.every(bools => bools.every(bool => bool))
      && this.constraintValsCorrect.every(bool => bool)
  }

  ngOnInit(): void {
    const numberOfVars = this.expected.numberOfVars
    const numberOfConstraints = this.expected.numberOfConstraints

    this.numberOfVars = numberOfVars
    this.numberOfConstraints = numberOfConstraints

    this.targetVars = new Array<null | Fraction>(numberOfVars).fill(null)
    this.targetVarsCorrect = new Array<boolean>(numberOfVars).fill(true)

    this.constraintVars = new Array<Array<null | Fraction>>(numberOfConstraints)
    this.constraintVarsCorrect = new Array<Array<boolean>>(numberOfConstraints)

    for (let c = 0; c < numberOfConstraints; c++) {
      this.constraintVars[c] = new Array<null | Fraction>(numberOfVars).fill(null)
      this.constraintVarsCorrect[c] = new Array<boolean>(numberOfVars).fill(true)
    }

    this.constraintVals = new Array<null | Fraction>(numberOfConstraints).fill(null)
    this.constraintValsCorrect = new Array<boolean>(numberOfConstraints).fill(true)

    this.initialized = true
  }

  saveTargetVar(event: Event, v: number): void {
    this.targetVars[v] = fractionFromInputEvent(event)
  }

  saveConstraintVar(event: Event, c: number, v: number): void {
    this.constraintVars[c][v] = fractionFromInputEvent(event)
  }

  saveConstraintVal(event: Event, c: number): void {
    this.constraintVals[c] = fractionFromInputEvent(event)
  }

  trackByIndex(index: number): number {
    return index
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

    for (let c = 0; c < this.constraintVars.length; c++) {
      for (let v = 0; v < this.constraintVars[c].length; v++) {
        const constraintVar = this.constraintVars[c][v]

        if (!constraintVar || !math.equal(constraintVar, expected.constraintVars[c][v])) {
          this.constraintVarsCorrect[c][v] = false
        }
      }
    }

    for (let c = 0; c < this.constraintVals.length; c++) {
      const constraintVal = this.constraintVals[c]

      if (!constraintVal || !math.equal(constraintVal, expected.constraintVals[c])) {
        this.constraintValsCorrect[c] = false
      }
    }
  }
}
