import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {LinearSystemDataOutput} from "./linear-system-data-output";
import {LinearSystemDataInput} from "./linear-system-data-input";

@Component({
  selector: 'app-linear-system',
  templateUrl: './linear-system-data.component.html',
  styleUrls: ['./linear-system-data.component.css']
})
export class LinearSystemDataComponent implements OnChanges {

  @Input() data: LinearSystemDataInput | undefined

  numberOfVars = -1; // Number of variables
  numberOfConstraints = -1; // Number of constraints

  @Output() change = new EventEmitter<LinearSystemDataOutput>()


  editable = true;

  targetVars: (number | null)[] = []
  constraintVars: (number | null)[][] = []
  constraintConstants: (number | null)[] = []

  initialized = false;


  ngOnChanges(): void {
    if (this.data) {
      this.numberOfVars = this.data.numberOfVars;
      this.numberOfConstraints = this.data.numberOfConstraints;

      this.targetVars = new Array<number | null>(this.numberOfVars).fill(null);
      this.constraintVars = new Array<Array<number | null>>(this.numberOfConstraints);

      for (let i = 0; i < this.constraintVars.length; i++) {
        this.constraintVars[i] = new Array<number | null>(this.numberOfVars).fill(null);

      }

      this.constraintConstants = new Array<number | null>(this.numberOfConstraints).fill(null);
      this.initialized = true;
    }

  }

  onTargetVarChanged(event: Event, v: number) {
    // Convert: string -> number
    const inputValue = (<HTMLInputElement>event.target).value
    this.targetVars[v] = (inputValue === '') ? null : +inputValue;
  }

  onConstraintVarChanged(event: Event, c: number, v: number) {
    const inputValue = (<HTMLInputElement>event.target).value
    this.constraintVars[c][v] = (inputValue === '') ? null : +inputValue;
  }

  onConstraintConstantChanged(event: Event, c: number) {
    const inputValue = (<HTMLInputElement>event.target).value
    this.constraintConstants[c] = (inputValue === '') ? null : +inputValue;

  }

  // Take array-index instead of the array-value
  trackByIndex(index: number, _item: any) {
    return index;
  }

  /**
   * Check if all input fields are filled.
   */
  validInput() {
    if (this.targetVars.indexOf(null) !== -1) {
      return false;
    }
    for (const constraintVarsLine of this.constraintVars) {
      if (constraintVarsLine.indexOf(null) !== -1) {
        return false;
      }
    }

    return this.constraintConstants.indexOf(null) === -1;
  }

  enableEditing() {
    this.editable = true;
  }

  emitValues() {
    this.change.emit({
      targetVars: this.targetVars as number[],
      constraintVars: this.constraintVars as number[][],
      constraintConstants: this.constraintConstants as number[]
    })
    this.editable = false;
  }
}

