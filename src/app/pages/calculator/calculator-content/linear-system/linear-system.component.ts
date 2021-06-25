import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-linear-system',
  templateUrl: './linear-system.component.html',
  styleUrls: ['./linear-system.component.css']
})
export class LinearSystemComponent implements OnChanges {

  @Input() numberOfVars = -1; // Number of variables
  @Input() numberOfConstraints = -1; // Number of constraints

  @Output() targetVarsEmitter = new EventEmitter<number[]>();
  @Output() constraintVarsEmitter = new EventEmitter<number[][]>();
  @Output() constraintConstantsEmitter = new EventEmitter<number[]>();

  @Output() showTableau = new EventEmitter<boolean>();

  editable = true;

  targetVars: (number | null)[] = []
  constraintVars: (number | null)[][] = []
  constraintConstants: (number | null)[] = []

  initialized = false;


  ngOnChanges(): void {
    this.targetVars = new Array<number | null>(this.numberOfVars).fill(null);
    this.constraintVars = new Array<Array<number | null>>(this.numberOfConstraints);

    for (let i = 0; i < this.constraintVars.length; i++) {
      this.constraintVars[i] = new Array<number | null>(this.numberOfVars).fill(null);

    }

    this.constraintConstants = new Array<number | null>(this.numberOfConstraints).fill(null);
    this.initialized = true;
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
    this.targetVarsEmitter.emit(this.targetVars as number[]);
    this.constraintVarsEmitter.emit(this.constraintVars as number[][]);
    this.constraintConstantsEmitter.emit(this.constraintConstants as number[]);
    this.showTableau.emit(true)

    this.editable = false;
  }


}

