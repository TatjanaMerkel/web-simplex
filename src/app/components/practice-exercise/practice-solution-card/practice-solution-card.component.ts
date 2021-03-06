import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

import {Fraction} from 'mathjs'

import {ExpectedSolution} from './expected-solution'
import {fractionFromInputEvent, fractionsEqual} from '../../../../common/fractions'

@Component({
  selector: 'app-practice-solution-card[expected]',
  templateUrl: './practice-solution-card.component.html',
  styleUrls: ['./practice-solution-card.component.css']
})
export class PracticeSolutionCardComponent implements OnInit {

  @Input() expected!: ExpectedSolution
  @Input() disabled = false

  @Output() correct = new EventEmitter<void>()

  initialized = false

  solutionVal: null | Fraction = null
  solutionVars!: Array<null | Fraction>

  solutionValCorrect = true
  solutionVarsCorrect!: boolean[]

  fractionFromInputEvent = fractionFromInputEvent

  get isInputCorrect(): boolean {
    return this.solutionValCorrect
      && this.solutionVarsCorrect.every(bool => bool)
  }

  ngOnInit(): void {
    this.solutionVars = new Array<null | Fraction>(this.expected.solutionVars.length).fill(null)
    this.solutionVarsCorrect = new Array<boolean>(this.expected.solutionVars.length).fill(true)

    this.initialized = true
  }

  checkUserInputAndEmit(): void {
    this.checkUserInput()

    if (this.isInputCorrect) {
      this.correct.emit()
    }
  }

  private checkUserInput(): void {
    this.solutionValCorrect = fractionsEqual(this.solutionVal, this.expected.solutionVal)

    for (let v = 0; v < this.solutionVars.length; v++) {
      this.solutionVarsCorrect[v] = fractionsEqual(this.solutionVars[v], this.expected.solutionVars[v])
    }
  }

  trackByIndex(index: number): number {
    return index
  }
}
