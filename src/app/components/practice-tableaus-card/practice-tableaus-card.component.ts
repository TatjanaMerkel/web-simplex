import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core'

import {Fraction} from 'mathjs'

import ExpectedTableau from './expected-tableau'
import {fractionFromInputEvent, fractionsEqual} from '../../../common/fractions'


@Component({
  selector: 'app-practice-tableaus-card',
  templateUrl: './practice-tableaus-card.component.html',
  styleUrls: ['./practice-tableaus-card.component.css']
})
export class PracticeTableausCardComponent implements OnChanges {

  @Input() expectedTableaus: undefined | ExpectedTableau[]

  @Output() correct = new EventEmitter<void>()

  targetVars!: Array<Fraction | null>
  targetVal: Fraction | null = null
  constraintVars!: Array<Array<Fraction | null>>
  constraintVals!: Array<Fraction | null>
  thetas!: Array<Fraction | null>


  targetVarsCorrect!: Array<boolean>
  targetValCorrect = true
  constraintVarsCorrect!: Array<Array<boolean>>
  constraintValsCorrect!: Array<boolean>
  thetasCorrect!: Array<boolean>

  initialized = false

  //
  // Getters
  //

  get isInputCorrect(): boolean {
    return this.targetVarsCorrect.every(bool => bool)
      && this.targetValCorrect
      && this.constraintVarsCorrect.every(bools => bools.every(bool => bool))
      && this.constraintValsCorrect.every(bool => bool)
      && this.thetasCorrect.every(bool => bool)
  }


  //
  // Lifecycle
  //

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.expectedTableaus && !this.initialized && this.expectedTableaus!.length > 0) {
      const expected: ExpectedTableau = this.expectedTableaus![0]

      this.targetVars = new Array<Fraction | null>(expected.targetVars.length).fill(null)
      this.targetVarsCorrect = new Array<boolean>(expected.targetVars.length).fill(true)

      this.constraintVars = new Array<Array<Fraction | null>>(expected.constraintVars.length)
      this.constraintVarsCorrect = new Array<Array<boolean>>(expected.constraintVars.length)

      for (let c = 0; c < expected.constraintVars.length; c++) {
        this.constraintVars[c] = new Array<Fraction | null>(expected.constraintVars[c].length).fill(null)
        this.constraintVarsCorrect[c] = new Array<boolean>(expected.constraintVars[c].length).fill(true)
      }

      this.constraintVals = new Array<Fraction | null>(expected.constraintVars.length).fill(null)
      this.constraintValsCorrect = new Array<boolean>(expected.constraintVars.length).fill(true)

      this.thetas = new Array<Fraction | null>(expected.numberOfConstraints).fill(null)
      this.thetasCorrect = new Array<boolean>(expected.numberOfConstraints).fill(true)

      this.initialized = true
    }
  }

  //
  // Methods
  //

  saveTargetVar(event: Event, v: number): void {
    this.targetVars[v] = fractionFromInputEvent(event)
  }

  saveTargetVal(event: Event): void {
    this.targetVal = fractionFromInputEvent(event)
  }

  saveConstraintVar(event: Event, c: number, v: number): void {
    this.constraintVars[c][v] = fractionFromInputEvent(event)
  }

  saveConstraintVal(event: Event, c: number): void {
    this.constraintVals[c] = fractionFromInputEvent(event)
  }

  saveTheta(event: Event, c: number): void {
    this.thetas[c] = fractionFromInputEvent(event)
  }

  checkUserInputAndEmit(): void {
    this.checkUserInput()

    if (this.isInputCorrect) {
      this.correct.emit()
    }
  }

  private checkUserInput(): void {
    const expectedTableaus = this.expectedTableaus!

    const expected = expectedTableaus[0]

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
  }


}
