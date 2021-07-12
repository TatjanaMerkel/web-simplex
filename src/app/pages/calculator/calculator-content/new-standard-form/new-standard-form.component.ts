import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {NewStandardFormInput} from "./new-standard-form-input";
import {NewStandardFormOutput} from "./new-standard-form-output";
import {Fraction} from "mathjs";
import {StandardFormData} from "../standard-form/standard-form-data";
import * as math from "mathjs";

@Component({
  selector: 'app-new-standard-form',
  templateUrl: './new-standard-form.component.html',
  styleUrls: ['./new-standard-form.component.css']
})
export class NewStandardFormComponent implements OnChanges {

  @Input() data!: NewStandardFormInput

  @Output() dataChange = new EventEmitter<NewStandardFormOutput>()

  numberOfVars!: number
  numberOfConstraints!: number

  targetVars!: Array<Fraction>
  targetVal!: Fraction
  constraintVars!: Array<Array<Fraction>>
  constraintVals!: Array<Fraction>

  slackVars!: Array<number>

  /**
   *  BV | x1 x2 | b       BV | x1 x2 x3 x4 x5 | b      BV | x1 x2 x3 x4 x5 |  b
   *  ---+-------+---      ---+----------------+---     ---+----------------+----
   *  x3 |  1  2 | 3       x3 |  1  2  1  0  0 | 3      x3 | cv cv cv cs cs | cc
   *  x4 |  4  5 | 6  -->  x4 |  4  5  0  1  0 | 6  ==  x4 | cv cv cv cs cs | cc
   *  x5 |  7  8 | 9       x5 |  7  8  0  0  1 | 9      x5 | cv cv cv cs cs | cc
   *  ---+-------+---      ---+----------------+---     ---+----------------+----
   *   z | 10 11 | 0        z | 10 11  0  0  0 | 0       z | tv tv ts ts ts |  0
   */
  ngOnChanges(): void {
    this.numberOfVars = this.data.numberOfVars
    this.numberOfConstraints = this.data.numberOfConstraints

    const targetSlackVars = Array.from({length: this.numberOfConstraints},
      _ => math.fraction(0) as Fraction)
    this.targetVars = this.data.targetVars.concat(targetSlackVars)

    this.targetVal = math.fraction(0) as Fraction

    console.log('test')
    console.log(this.constraintVars)
    this.constraintVars = this.data.constraintVars
    const constraintSlackVars = new Array<Array<Fraction>>(this.numberOfConstraints)
    for (let c = 0; c < constraintSlackVars.length; c++) {
      constraintSlackVars[c] = Array.from({length: this.numberOfConstraints},
        _ => math.fraction(0) as Fraction)
      constraintSlackVars[c][c] = math.fraction(1) as Fraction
      console.log(this.constraintVars[c])
      this.constraintVars[c] = this.constraintVars[c].concat(constraintSlackVars[c])
    }

    this.constraintVals = this.data.constraintVals
  }

  emitValues() {
    this.dataChange.emit({
      numberOfVars: this.numberOfVars,
      numberOfConstraints: this.numberOfConstraints,

      targetVars: this.targetVars,
      targetVal: this.targetVal,
      constraintVars: this.constraintVars,
      constraintVals: this.constraintVals,

      slackVars: this.slackVars
    });
  }
}
