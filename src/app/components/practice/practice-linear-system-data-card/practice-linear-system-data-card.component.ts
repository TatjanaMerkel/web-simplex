import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {PracticeLinearSystemDataCardExpected} from './practice-linear-system-data-card-expected'

@Component({
  selector: 'app-practice-linear-system-data-card',
  templateUrl: './practice-linear-system-data-card.component.html',
  styleUrls: ['./practice-linear-system-data-card.component.css']
})
export class PracticeLinearSystemDataCardComponent {

  @Input() expected: undefined | PracticeLinearSystemDataCardExpected
  @Input() disabled = false

  @Output() correct = new EventEmitter<void>()

  numberOfVars!: number
  numberOfConstraints!: number

  targetVars!: Array<null | Fraction>
  constraintVars!: Array<Array<null | Fraction>>
  constraintVals!: Array<null | Fraction>

  targetVarsCorrect!: Array<boolean>
  constraintVarsCorrect!: Array<Array<boolean>>
  constraintValsCorrect!: Array<boolean>

  //
  // Getter
  //

  get allCorrect(): boolean {
    for (let targetVarCorrect of this.targetVarsCorrect) {
      if (!targetVarCorrect) {
        return false
      }
    }

    for (let constraintVarsCorrect of this.constraintVarsCorrect) {
      for (let constraintVarCorrect of constraintVarsCorrect) {
        if (!constraintVarCorrect) {
          return false
        }
      }
    }

    for (let constraintValCorrect of this.constraintValsCorrect) {
      if (!constraintValCorrect) {
        return false
      }
    }

    return true
  }

  //
  // Lifecycle
  //

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expected'] && changes['expected'].firstChange) {

      const numberOfVars = changes.expected.currentValue.numberOfVars
      const numberOfConstraints = changes.expected.currentValue.numberOfConstraints

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
    }
  }

  //
  // Methods
  //

  saveTargetVar(event: Event, v: number): void {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      this.targetVars[v] = math.fraction(inputValue) as Fraction
    } catch (e) {
      this.targetVars[v] = null
    }
  }

  saveConstraintVar(event: Event, c: number, v: number): void {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      this.constraintVars[c][v] = math.fraction(inputValue) as Fraction
    } catch (e) {
      this.constraintVars[c][v] = null
    }
  }

  saveConstraintVal(event: Event, c: number): void {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      this.constraintVals[c] = math.fraction(inputValue) as Fraction
    } catch (e) {
      this.constraintVals[c] = null
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

  trackByIndex(index: number, _item: any): number {
    return index
  }

  checkUserInputAndEmit(): void {
    this.checkUserInput()

    if (this.allCorrect) {
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
