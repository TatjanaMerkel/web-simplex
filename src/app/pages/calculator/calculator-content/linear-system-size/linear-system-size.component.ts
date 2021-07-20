import {Component, EventEmitter, Output} from '@angular/core';
import {LinearSystemSizeOutput} from "./linear-system-size-output";


@Component({
  selector: 'app-linear-system-size',
  templateUrl: './linear-system-size.component.html',
  styleUrls: ['./linear-system-size.component.css']
})
export class LinearSystemSize {

  @Output() dataChange = new EventEmitter<LinearSystemSizeOutput | null>()


  editable = true
  inputValid = false


  numberOfVars: number | null = null
  numberOfConstraints: number | null = null


  validateInput(): boolean {
    return this.numberOfVars !== null && this.numberOfConstraints !== null
  }

  onGenerate(): void {

    this.dataChange.emit({
      numberOfVars: this.numberOfVars!,
      numberOfConstraints: this.numberOfConstraints!


    })
    this.editable = false

  }

  onEdit(): void {

    this.dataChange.emit(null)

    this.editable = true
  }


  onNumberOfVarsChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    if (inputValue === '') {
      this.numberOfVars = null
    } else {
      this.numberOfVars = Number(inputValue)
    }

    this.inputValid = this.validateInput()
  }

  onNumberOfConstraintsChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    if (inputValue === '') {
      this.numberOfConstraints = null
    } else {
      this.numberOfConstraints = Number(inputValue)
    }

    this.inputValid = this.validateInput()
  }

}
