import {Component, EventEmitter, Input, Output} from '@angular/core'

import {PracticeLinearSystemSizeCardExpected} from './practice-linear-system-size-card-expected'

@Component({
  selector: 'app-practice-linear-system-size-card',
  templateUrl: './practice-linear-system-size-card.component.html',
  styleUrls: ['./practice-linear-system-size-card.component.css']
})
export class PracticeLinearSystemSizeCardComponent {

  @Input() expected: undefined | PracticeLinearSystemSizeCardExpected
  @Input() disabled = false

  @Output() correct = new EventEmitter<void>()

  numberOfVars: null | number = null
  numberOfConstraints: null | number = null

  numberOfVarsCorrect = true
  numberOfConstraintsCorrect = true

  //
  // Getters
  //

  get allCorrect(): boolean {
    return this.numberOfVarsCorrect && this.numberOfConstraintsCorrect
  }

  //
  // Methods
  //

  saveNumberOfVars(event: Event): void {
    const numberInput = event.target as HTMLInputElement

    this.numberOfVars = Number(numberInput.value)
  }

  saveNumberOfConstraints(event: Event): void {
    const numberInput = event.target as HTMLInputElement

    this.numberOfConstraints = Number(numberInput.value)
  }

  checkUserInputAndEmit(): void {
    this.checkUserInput()

    if (this.allCorrect) {
      this.correct.emit()
    }
  }

  private checkUserInput(): void {
    const expected = this.expected!

    if (this.numberOfVars !== expected.numberOfVars) {
      this.numberOfVarsCorrect = false
    }

    if (this.numberOfConstraints !== expected.numberOfConstraints) {
      this.numberOfConstraintsCorrect = false
    }
  }
}
