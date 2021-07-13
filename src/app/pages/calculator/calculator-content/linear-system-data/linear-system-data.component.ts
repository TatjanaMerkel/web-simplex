import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {LinearSystemDataInput} from "./linear-system-data-input";
import {LinearSystemDataOutput} from "./linear-system-data-output";
import {Fraction} from "mathjs";
import * as math from "mathjs";


@Component({
  selector: 'app-linear-system-data',
  templateUrl: './linear-system-data.component.html',
  styleUrls: ['./linear-system-data.component.css']
})
export class LinearSystemDataComponent implements OnChanges {

  @Input() data: LinearSystemDataInput | undefined


  @Output() change = new EventEmitter<LinearSystemDataOutput>()

  initialized = false
  editable = true

  targetVars!: Array<Fraction | null>
  constraintVars!: Array<Array<Fraction | null>>
  constraintVals!: Array<Fraction | null>




  ngOnChanges(changes: SimpleChanges): void {
    const data = this.data!
    const numberOfVars = data.numberOfVars
    const numberOfConstraints = data.numberOfConstraints

    this.targetVars = new Array<Fraction | null>(numberOfVars).fill(null)

    this.constraintVars = new Array<Array<Fraction | null>>(numberOfConstraints)
    for (let c = 0; c < this.constraintVars.length; c++) {
      this.constraintVars[c] = new Array<Fraction | null>(numberOfVars).fill(null)
    }

    this.constraintVals = new Array<Fraction | null>(numberOfConstraints).fill(null)

    this.initialized = true
  }


  onTargetVarChanged(event: Event, v: number) {
    const inputValue = (<HTMLInputElement>event.target).value

    try {
      this.targetVars[v] = math.fraction(inputValue) as Fraction
    } catch(e) {
      this.targetVars[v] = null
    }

  }

  onConstraintVarChanged(event: Event, c: number, v: number) {
    const inputValue = (<HTMLInputElement>event.target).value

    try {
      this.constraintVars[c][v] = math.fraction(inputValue) as Fraction
    } catch(e) {
      this.constraintVars[c][v] = null
    }

  }

  onConstraintConstantChanged(event: Event, c: number) {
    const inputValue = (<HTMLInputElement>event.target).value

    try {
      this.constraintVals[c] = math.fraction(inputValue) as Fraction
    } catch(e) {
      this.constraintVals[c] = null
    }


  }

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

    return this.constraintVals.indexOf(null) === -1;
  }

  /**
   * Must only be invoked if sure that all input values !== null
   */

  emitValues() {
    this.change.emit({
      targetVarsRow: this.targetVars as Array<Fraction>,
      constraintVarsMatrix: this.constraintVars as Array<Array<Fraction>>,
      constraintValsCol: this.constraintVals as Array<Fraction>

    })
    this.editable = false
  }
}

