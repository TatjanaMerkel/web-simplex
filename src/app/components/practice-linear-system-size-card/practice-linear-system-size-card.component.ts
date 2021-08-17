import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {PracticeLinearSystemSizeCardData} from './practice-linear-system.size-card-data'


@Component({
  selector: 'app-practice-linear-system-size-card',
  templateUrl: './practice-linear-system-size-card.component.html',
  styleUrls: ['./practice-linear-system-size-card.component.css']
})
export class PracticeLinearSystemSizeCardComponent implements OnInit {

  @Input() expectedUserInput: undefined | PracticeLinearSystemSizeCardData
  @Input() disabled = false

  @Output() userInputCorrect = new EventEmitter<void>()

  numberOfVars: null | number = null
  numberOfConstraints: null | number = null

  numberOfVarsCorrect = true
  numberOfConstraintsCorrect = true

  get isInputCorrect(): boolean {
    return this.numberOfVarsCorrect && this.numberOfConstraintsCorrect
  }

  constructor() {
  }

  ngOnInit(): void {
  }


  storeNumberOfVars(event: Event): void {
    const numberInput = event.target as HTMLInputElement

    this.numberOfVars = Number(numberInput.value)
  }

  storeNumberOfConstraints(event: Event): void {
    const numberInput = event.target as HTMLInputElement

    this.numberOfConstraints = Number(numberInput.value)
  }

  checkUserInputAndEmit(): void {
    const userInputCorrect = this.checkUserInput()

    if (userInputCorrect) {
      this.userInputCorrect.emit()
    }
  }

  checkUserInput(): boolean {
    if (!this.expectedUserInput) {
      return true
    }

    let allCorrect = true

    if (this.numberOfVars !== this.expectedUserInput.numberOfVars) {
      this.numberOfVarsCorrect = false
      allCorrect = false
    }

    if (this.numberOfConstraints !== this.expectedUserInput.numberOfConstraints) {
      this.numberOfConstraintsCorrect = false
      allCorrect = false
    }

    return allCorrect
  }


}
