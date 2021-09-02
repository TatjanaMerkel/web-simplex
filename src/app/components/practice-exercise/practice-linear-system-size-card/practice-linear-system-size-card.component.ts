import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

import {ExpectedLinearSystemSize} from './expected-linear-system-size'

@Component({
  selector: 'app-practice-linear-system-size-card[expected]',
  templateUrl: './practice-linear-system-size-card.component.html',
  styleUrls: ['./practice-linear-system-size-card.component.css']
})
export class PracticeLinearSystemSizeCardComponent implements OnInit {

  @Input() expected!: ExpectedLinearSystemSize
  @Input() disabled = false

  @Output() correct = new EventEmitter<void>()

  initialized = false

  numberOfVars: null | number = null
  numberOfConstraints: null | number = null

  numberOfVarsCorrect = true
  numberOfConstraintsCorrect = true

  get isInputCorrect(): boolean {
    return this.numberOfVarsCorrect && this.numberOfConstraintsCorrect
  }

  ngOnInit() {
    this.initialized = true
  }

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

    if (this.isInputCorrect) {
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
