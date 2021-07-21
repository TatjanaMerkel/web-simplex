import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {LinearSystemDataInput} from './linear-system-data-input';
import {LinearSystemDataOutput} from './linear-system-data-output';
import {Fraction} from 'mathjs';
import * as math from 'mathjs';

@Component({
  selector: 'app-linear-system-data',
  templateUrl: './linear-system-data.component.html',
  styleUrls: ['./linear-system-data.component.css']
})
export class LinearSystemDataComponent implements OnChanges {

  @Input() data: LinearSystemDataInput | null = null

  @Output() dataChange = new EventEmitter<LinearSystemDataOutput | null>()

  editable = true
  inputValid = false

  targetVars!: Array<Fraction | null>
  constraintVars!: Array<Array<Fraction | null>>
  constraintVals!: Array<Fraction | null>

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && changes.data.firstChange) {
      const numberOfVars = this.data.numberOfVars
      const numberOfConstraints = this.data.numberOfConstraints

      this.targetVars = new Array<Fraction | null>(numberOfVars).fill(null)

      this.constraintVars = new Array<Array<Fraction | null>>(numberOfConstraints)
      for (let c = 0; c < this.constraintVars.length; c++) {
        this.constraintVars[c] = new Array<Fraction | null>(numberOfVars).fill(null)
      }

      this.constraintVals = new Array<Fraction | null>(numberOfConstraints).fill(null)
    }
  }

  /**
   * Must only be invoked if sure that all input values !== null
   */
  onCalculate(): void {
    this.dataChange.emit({
      targetVars: this.targetVars as Array<Fraction>,
      constraintVars: this.constraintVars as Array<Array<Fraction>>,
      constraintVals: this.constraintVals as Array<Fraction>
    })

    this.editable = false
  }

  onEdit(): void {
    this.dataChange.emit(null)

    this.editable = true
  }

  onTargetVarChanged(event: Event, v: number) {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      this.targetVars[v] = math.fraction(inputValue) as Fraction
    } catch(e) {
      this.targetVars[v] = null
    }

    this.inputValid = this.validateInput()
  }

  onConstraintVarChanged(event: Event, c: number, v: number) {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      this.constraintVars[c][v] = math.fraction(inputValue) as Fraction
    } catch(e) {
      this.constraintVars[c][v] = null
    }

    this.inputValid = this.validateInput()
  }

  onConstraintConstantChanged(event: Event, c: number) {
    const inputElement = event.target as HTMLInputElement
    const inputValue = inputElement.value

    try {
      this.constraintVals[c] = math.fraction(inputValue) as Fraction
    } catch(e) {
      this.constraintVals[c] = null
    }

    this.inputValid = this.validateInput()
  }

  /**
   * Check if all input fields are filled.
   */
  validateInput(): boolean {
    if (this.targetVars.indexOf(null) !== -1) {
      return false;
    }

    for (const constraintVarsLine of this.constraintVars) {
      if (constraintVarsLine.indexOf(null) !== -1) {
        return false;
      }
    }

    return this.constraintVals.indexOf(null) === -1;
  }

  trackByIndex(index: number, _item: any) {
    return index;
  }
}
