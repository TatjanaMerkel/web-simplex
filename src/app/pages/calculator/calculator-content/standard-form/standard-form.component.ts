import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {StandardFormInput} from "./standard-form-input";
import {StandardFormOutput} from "./standard-form-output";
import {Fraction} from "mathjs";
import * as math from "mathjs";

@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.css']
})
export class StandardFormComponent implements OnChanges {

  @Input() data!: StandardFormInput

  @Output() dataChange = new EventEmitter<StandardFormOutput>()

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

  formatFraction(fraction: Fraction): string {
    if (fraction.n === 0) {
      return '';
    } else if (fraction.n === 1 && fraction.d === 1) {
      return '';
    } else if (fraction.d === 1) {
      return fraction.n + '';
    } else {
      return fraction.n + '/' + fraction.d;
    }
  }

  formatVariable(fraction: Fraction, variable: number): string {
    return fraction.n === 0 ? '' : 'x' + '<sub>' + variable + '</sub>';
  }

  formatSign(fraction: Fraction): string {
    return fraction.s === 1 ? '' : '-';
  }

  formatOperator(fraction: Fraction): string {
    if (fraction.n === 0) {
      return '';
    } else if (fraction.s === 1) {
      return '+';
    } else {
      return '-';
    }
  }
}
