import {Component} from '@angular/core';
import {LinearSystemSizeOutput} from './calculator-content/linear-system-size/linear-system-size-output';
import {LinearSystemDataOutput} from './calculator-content/linear-system-data/linear-system-data-output';
import * as math from 'mathjs';
import {Fraction} from 'mathjs';
import {TableauData} from './tableau-data';
import {StandardFormOutput} from './calculator-content/standard-form/standard-form-output';
import {LinearSystemDataInput} from './calculator-content/linear-system-data/linear-system-data-input';
import {SolutionInput} from './calculator-content/solution/solution-input';
import {TableauInput} from './calculator-content/tableau/tableau-input';
import {StandardFormInput} from "./calculator-content/standard-form/standard-form-input";



@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  linearSystemSizeOutput: LinearSystemSizeOutput | null = null
  linearSystemDataOutput: LinearSystemDataOutput | null = null

  standardFormOutput: StandardFormOutput | null = null


  tableauData: Array<TableauData> | null = null;


  //
  // Data Change Listeners
  //
  onLinearSystemSizeChange(linearSystemSizeOutput: LinearSystemSizeOutput | null): void {
    if (linearSystemSizeOutput !== null) {
      this.linearSystemSizeOutput = linearSystemSizeOutput
    } else {
      this.linearSystemSizeOutput = null
      this.linearSystemDataOutput = null
      this.standardFormOutput = null
      this.tableauData = null
    }
  }


  onLinearSystemDataChange(linearSystemDataOutput: LinearSystemDataOutput | null): void {
    if (linearSystemDataOutput !== null) {
      this.linearSystemDataOutput = linearSystemDataOutput;
    } else {
      this.linearSystemDataOutput = null
      this.standardFormOutput = null
      this.tableauData = null
    }
  }

  onStandardFormChange(standardFormOutput: StandardFormOutput): void {
    this.standardFormOutput = standardFormOutput


    this.calcTableaus()

  }

  //
  // Input Data Getters
  //
  /**
   * Must only be called when linear-system-size output is available.
   */
  getLinearSystemDataInput(): LinearSystemDataInput {
    const linearSystemSizeOutput = this.linearSystemSizeOutput!

    return {
      numberOfVars: linearSystemSizeOutput.numberOfVars,
      numberOfConstraints: linearSystemSizeOutput.numberOfConstraints
    }
  }

  /**
   * Must only be called when linear-system-size output and
   * linear-system-data output is available.
   */
  getStandardFormInput(): StandardFormInput {
    const linearSystemSizeOutput = this.linearSystemSizeOutput!
    const linearSystemDataOutput = this.linearSystemDataOutput!

    return {
      numberOfVars: linearSystemSizeOutput.numberOfVars,
      numberOfConstraints: linearSystemSizeOutput.numberOfConstraints,

      targetVars: linearSystemDataOutput.targetVars,
      constraintVars: linearSystemDataOutput.constraintVars,
      constraintVals: linearSystemDataOutput.constraintVals
    }
  }


  getTableauInput(tableauData: TableauData): TableauInput {
    const linearSystemSizeOutput = this.linearSystemSizeOutput!

    const numberOfVars = linearSystemSizeOutput.numberOfVars
    const numberOfConstraints = linearSystemSizeOutput.numberOfConstraints

    return {
      numberOfVars: numberOfVars + numberOfConstraints,
      numberOfConstraints: numberOfConstraints,

      ...tableauData
    }
  }

  /**
   * Must only be called when tableau data has been calculated.
   */
  getSolutionInput(): SolutionInput {
    const tableauData = this.tableauData!

    const lastTableau = tableauData[tableauData.length - 1]

    return {
      targetVal: lastTableau.targetVal
    }
  }


  //
  // Simplex
  //

  /**
   * Must only be called when standard-form output is set.
   */
  calcTableaus(): void {
    const standardFormOutput = this.standardFormOutput!

    this.tableauData = new Array<TableauData>();

    //
    // First tableau contains input data
    //

    this.tableauData[0] = {
      targetVars: standardFormOutput.targetVars,
      targetVal: math.fraction(0) as Fraction,

      constraintVars: standardFormOutput.constraintVars,
      constraintVals: standardFormOutput.constraintVals,

      pivotRow: null,
      pivotCol: null,

      thetas: null
    };

    let prevTableau = this.tableauData[0];
    let minTargetVar = math.min(...prevTableau.targetVars);

    while (math.smaller(minTargetVar, 0)) {

      //
      // Find pivot col (var with most negative value)
      //

      const pivotCol = prevTableau.targetVars.indexOf(minTargetVar);

      prevTableau.pivotCol = pivotCol;

      //
      // Calculate theta values
      //

      const numberOfConstraints = this.linearSystemSizeOutput!.numberOfConstraints

      const thetas = new Array<Fraction>(numberOfConstraints);

      for (let c = 0; c < thetas.length; c++) {
        thetas[c] = math.divide(prevTableau.constraintVals[c], prevTableau.constraintVars[c][pivotCol]) as Fraction;
      }

      prevTableau.thetas = thetas;

      //
      // Find pivot row (row with smallest positive theta) and pivot element
      //

      let minPosTheta = math.fraction('9999') as Fraction
      let minPosThetaIndex = -1

      for (let i = 0; i < thetas.length; i++) {
        const theta = thetas[i]
        if (math.larger(theta, 0) && math.smaller(theta, minPosTheta)) {
          minPosTheta = theta
          minPosThetaIndex = i
        }
      }

      const pivotRow = minPosThetaIndex


      prevTableau.pivotRow = pivotRow;

      const pivot = prevTableau.constraintVars[pivotRow][pivotCol];

      //
      // Calculate new pivot row by dividing though pivot element
      //

      const newConstraintVars = new Array<Array<Fraction>>(prevTableau.constraintVars.length);
      newConstraintVars[pivotRow] = prevTableau.constraintVars[pivotRow]
        .map(value => math.divide(value, pivot) as Fraction);

      const newConstraintVals = new Array<Fraction>(prevTableau.constraintVals.length);
      newConstraintVals[pivotRow] = math.divide(prevTableau.constraintVals[pivotRow], pivot) as Fraction;

      //
      // Calculate other rows by subtracting multiple of new pivot row
      //

      for (let c = 0; c < prevTableau.constraintVars.length; c++) {
        if (c !== pivotRow) {
          const factor = prevTableau.constraintVars[c][pivotCol];

          newConstraintVars[c] = prevTableau.constraintVars[c].map((value, index) =>
            math.subtract(value, math.multiply(factor, newConstraintVars[pivotRow][index]))
          ) as Fraction[];

          newConstraintVals[c] = math.subtract(prevTableau.constraintVals[c],
            math.multiply(factor, newConstraintVals[pivotRow])) as Fraction;
        }
      }

      //
      // Calculate target row by subtracting multiple of new pivot row
      //

      const factor = prevTableau.targetVars[pivotCol];

      const newTargetVars = prevTableau.targetVars.map((value, index) =>
        math.subtract(value, math.multiply(factor, newConstraintVars[pivotRow][index]))
      ) as Fraction[];

      const newTargetVal = math.subtract(prevTableau.targetVal,
        math.multiply(factor, newConstraintVals[pivotRow])) as Fraction;

      //
      // Add new tableau
      //

      const newTableau = {
        targetVars: newTargetVars,
        targetVal: newTargetVal,

        constraintVars: newConstraintVars,
        constraintVals: newConstraintVals,

        pivotCol: null,
        pivotRow: null,

        thetas: null
      }

      this.tableauData.push(newTableau);

      prevTableau = newTableau;
      minTargetVar = math.min(...prevTableau.targetVars);
    }
  }

  //
  // Mock Data
  //

  getLinearSystemDataInputMock(): LinearSystemDataInput {

    return {
      numberOfVars: 2,
      numberOfConstraints: 3
    }
  }

  getStandardFormInputMock() {
    return {
      numberOfVars: 2,
      numberOfConstraints: 3,

      targetVars: [
        math.fraction('1.1'),
        math.fraction('2/3')
      ] as Fraction[],

      constraintVars: [
        [math.fraction('-4/5'), math.fraction('1')],
        [math.fraction('7'), math.fraction('-8')],
        [math.fraction('9.9'), math.fraction('-1.3')],
      ] as Fraction[][],

      constraintVals: [
        math.fraction('1/8'),
        math.fraction('2/9'),
        math.fraction('30/31')
      ] as Fraction[]
    }
  }

  standardFormOutputMock: StandardFormOutput = {
    numberOfVars: 5,
    numberOfConstraints: 3,

    targetVars: [
      math.fraction('-5'),
      math.fraction('-2'),
      math.fraction(0),
      math.fraction(0),
      math.fraction(0)
    ] as Fraction[],

    targetVal: math.fraction(0) as Fraction,

    constraintVars: [
      [
        math.fraction('-3'),
        math.fraction('4'),
        math.fraction(1),
        math.fraction(0),
        math.fraction(0)
      ],
      [
        math.fraction('6'),
        math.fraction('-7'),
        math.fraction(0),
        math.fraction(1),
        math.fraction(0)
      ],
      [
        math.fraction('9'),
        math.fraction('10'),
        math.fraction(0),
        math.fraction(0),
        math.fraction(1)
      ],
    ] as Fraction[][],

    constraintVals: [
      math.fraction('5'),
      math.fraction('8'),
      math.fraction('11')
    ] as Fraction[],

    slackVars: [1, 2, 3]

  }

  getSolutionInputMock(): SolutionInput {
    return {
      targetVal: math.fraction(42) as Fraction
    }
  }
}
