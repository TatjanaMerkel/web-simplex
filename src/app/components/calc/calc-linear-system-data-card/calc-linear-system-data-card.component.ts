import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {CalcLinearSystemDataCardInput} from './calc-linear-system-data-card-input'
import {CalcLinearSystemDataCardOutput} from './calc-linear-system-data-card-output'
import {fractionFromInputEvent} from '../../../../common/fractions'

@Component({
  selector: 'app-calc-linear-system-data-card[input]',
  templateUrl: './calc-linear-system-data-card.component.html',
  styleUrls: ['./calc-linear-system-data-card.component.css']
})
export class CalcLinearSystemDataCardComponent implements OnInit {

  @Input() input!: CalcLinearSystemDataCardInput

  @Output() outputChange = new EventEmitter<CalcLinearSystemDataCardOutput | null>()

  initialized = false

  targetVars!: Array<null | Fraction>
  constraintVars!: Array<Array<null | Fraction>>
  constraintVals!: Array<null | Fraction>

  targetVarsValid!: boolean[]
  constraintVarsValid!: boolean[][]
  constraintValsValid!: boolean[]

  editable = true

  fractionFromInputEvent = fractionFromInputEvent

  get isInputCorrect(): boolean {
    return this.targetVarsValid.every(bool => bool)
      && this.constraintVarsValid.every(bools => bools.every(bool => bool))
      && this.constraintValsValid.every(bool => bool)
  }

  ngOnInit(): void {
    this.createArrays()

    this.initialized = true
  }

  checkUserInputAndEmit(): void {
    this.checkUserInput()

    if (this.isInputCorrect) {
      const targetVars = this.targetVars as Fraction[]
      const constraintVars = this.constraintVars as Fraction[][]
      const constraintVals = this.constraintVals as Fraction[]

      this.outputChange.emit({targetVars, constraintVars, constraintVals})

      this.editable = false
    }
  }

  startEditing(): void {
    this.outputChange.emit(null)

    this.editable = true
  }

  trackByIndex(index: number): number {
    return index
  }

  private createArrays(): void {
    const {numberOfVars, numberOfConstraints} = this.input

    this.targetVars = new Array<null | Fraction>(numberOfVars).fill(null)
    this.targetVarsValid = new Array<boolean>(numberOfVars).fill(true)

    this.constraintVars = new Array<Array<null | Fraction>>(numberOfConstraints)
    this.constraintVarsValid = new Array<Array<boolean>>(numberOfConstraints)

    for (let c = 0; c < this.constraintVars.length; c++) {
      this.constraintVars[c] = new Array<null | Fraction>(numberOfVars).fill(null)
      this.constraintVarsValid[c] = new Array<boolean>(numberOfVars).fill(true)
    }

    this.constraintVals = new Array<null | Fraction>(numberOfConstraints).fill(null)
    this.constraintValsValid = new Array<boolean>(numberOfConstraints).fill(true)
  }

  private checkUserInput(): void {
    for (let v = 0; v < this.targetVars.length; v++) {
      this.targetVarsValid[v] = this.targetVars[v] !== null
    }

    for (let c = 0; c < this.constraintVars.length; c++) {
      for (let v = 0; v < this.constraintVars[c].length; v++) {
        this.constraintVarsValid[c][v] = this.constraintVars[c][v] !== null
      }
    }

    for (let c = 0; c < this.constraintVals.length; c++) {
      const constraintVal = this.constraintVals[c]
      this.constraintValsValid[c] = constraintVal !== null && math.largerEq(constraintVal, 0) as boolean
    }
  }
}
