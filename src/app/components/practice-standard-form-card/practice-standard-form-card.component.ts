import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {PracticeStandardFormCardExpected} from './practice-standard-form-card-expected'

@Component({
  selector: 'app-practice-standard-form-card',
  templateUrl: './practice-standard-form-card.component.html',
  styleUrls: ['./practice-standard-form-card.component.css']
})

export class PracticeStandardFormCardComponent implements OnChanges {

  @Input() expected: undefined | PracticeStandardFormCardExpected
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

  //
  // Getter
  //

  get allCorrect(): boolean {
    for (let targetVarCorrect of this.targetVarsCorrect) {
      if (!targetVarCorrect) {
        return false
      }
    }

    if (!this.targetZValCorrect) {
      return false
    }

    if (!this.targetValCorrect) {
      return false
    }

    for (let constraintVarsCorrect of this.constraintVarsCorrect) {
      for (let constraintVarCorrect of constraintVarsCorrect) {
        if (!constraintVarCorrect) {
          return false
        }
      }
    }

    for (let constraintZValCorrect of this.constraintZValsCorrect) {
      if (!constraintZValCorrect) {
        return false
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

  saveTargetZVal(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      this.targetZVal = math.fraction(inputValue) as Fraction
    } catch (e) {
      this.targetZVal = null
    }
  }

  saveTargetVal(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      this.targetVal = math.fraction(inputValue) as Fraction
    } catch (e) {
      this.targetVal = null
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

  saveConstraintZVal(event: Event, c: number): void {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      this.constraintZVals[c] = math.fraction(inputValue) as Fraction
    } catch (e) {
      this.constraintZVals[c] = null
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

  trackByIndex(index: number, _item: any) {
    return index
  }

}
