import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

import {Fraction} from 'mathjs'

import ExpectedTableau from './expected-tableau'
import {fractionFromInputEvent, fractionsEqual} from '../../../../common/fractions'
import {numberFromInputEvent} from "../../../../common/numbers";

@Component({
  selector: 'app-practice-tableaus-card[expected]',
  templateUrl: './practice-tableaus-card.component.html',
  styleUrls: ['./practice-tableaus-card.component.css']
})
export class PracticeTableausCardComponent implements OnInit {

  @Input() expected!: ExpectedTableau[]

  @Output() correct = new EventEmitter<void>()

  initialized = false

  solvedTableaus!: boolean[]
  solvedTableausCount = 0

  targetVars!: Array<null | Fraction>
  targetVal: null | Fraction = null
  constraintVars!: Array<Array<null | Fraction>>
  constraintVals!: Array<null | Fraction>
  thetas!: Array<null | Fraction>
  slackVars!: Array<null | number>

  targetVarsCorrect!: boolean[]
  targetValCorrect = true
  constraintVarsCorrect!: boolean[][]
  constraintValsCorrect!: boolean[]
  thetasCorrect!: boolean[]
  slackVarsCorrect!: boolean[]

  numberFromInputEvent = numberFromInputEvent
  fractionFromInputEvent = fractionFromInputEvent

  get isInputCorrect(): boolean {
    return this.targetVarsCorrect.every(bool => bool)
      && this.targetValCorrect
      && this.constraintVarsCorrect.every(bools => bools.every(bool => bool))
      && this.constraintValsCorrect.every(bool => bool)
      && this.thetasCorrect.every(bool => bool)
      && this.slackVarsCorrect.every(bool => bool)
  }

  ngOnInit() {
    const expectedTableaus = this.expected!

    const expected: ExpectedTableau = expectedTableaus[0]

    this.solvedTableaus = new Array<boolean>(expectedTableaus.length)

    this.targetVars = new Array<null | Fraction>(expected.targetVars.length).fill(null)
    this.targetVarsCorrect = new Array<boolean>(expected.targetVars.length).fill(true)

    this.constraintVars = new Array<Array<null | Fraction>>(expected.constraintVars.length)
    this.constraintVarsCorrect = new Array<Array<boolean>>(expected.constraintVars.length)

    for (let c = 0; c < expected.constraintVars.length; c++) {
      this.constraintVars[c] = new Array<null | Fraction>(expected.constraintVars[c].length).fill(null)
      this.constraintVarsCorrect[c] = new Array<boolean>(expected.constraintVars[c].length).fill(true)
    }

    this.constraintVals = new Array<null | Fraction>(expected.constraintVars.length).fill(null)
    this.constraintValsCorrect = new Array<boolean>(expected.constraintVars.length).fill(true)

    this.thetas = new Array<null | Fraction>(expected.numberOfConstraints).fill(null)
    this.thetasCorrect = new Array<boolean>(expected.numberOfConstraints).fill(true)

    this.slackVars = new Array<null | number>(expected.numberOfConstraints).fill(null)
    this.slackVarsCorrect = new Array<boolean>(expected.numberOfConstraints).fill(true)

    this.initialized = true
  }

  checkUserInputAndEmit(): void {
    this.checkUserInput(this.solvedTableausCount)

    if (this.isInputCorrect) {
      this.solvedTableausCount++

      this.resetUserInput()
    }

    if (this.solvedTableausCount === this.solvedTableaus.length) {
      this.correct.emit()
    }
  }

  private checkUserInput(t: number): void {
    const expectedTableaus = this.expected!

    const expected = expectedTableaus[t]

    for (let v = 0; v < this.targetVars.length; v++) {
      this.targetVarsCorrect[v] = fractionsEqual(this.targetVars[v], expected.targetVars[v])
    }

    this.targetValCorrect = fractionsEqual(this.targetVal, expected.targetVal)

    for (let c = 0; c < this.constraintVars.length; c++) {
      for (let v = 0; v < this.constraintVars[c].length; v++) {
        this.constraintVarsCorrect[c][v] = fractionsEqual(this.constraintVars[c][v], expected.constraintVars[c][v])
      }
    }

    for (let c = 0; c < this.constraintVals.length; c++) {
      this.constraintValsCorrect[c] = fractionsEqual(this.constraintVals[c], expected.constraintVals[c])
    }

    if (expected.thetas) {
      for (let c = 0; c < this.thetas.length; c++) {
        this.thetasCorrect[c] = fractionsEqual(this.thetas[c], expected.thetas[c]);
      }
    }

    for (let c = 0; c < this.slackVars.length; c++) {
      this.slackVarsCorrect[c] = this.slackVars[c] === expected.slackVars[c]
    }
  }

  private resetUserInput(): void {
    this.targetVars.fill(null)
    this.targetVal = null

    for (let constraintVarsRow of this.constraintVars) {
      constraintVarsRow.fill(null)
    }

    this.constraintVals.fill(null)
    this.thetas.fill(null)
    this.slackVars.fill(null)
  }

  trackByIndex(index: number): number {
    return index
  }
}
