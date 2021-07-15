import {ChangeDetectorRef, Component} from '@angular/core';
import {LinearSystemSizeOutput} from "./calculator-content/linear-system-size/linear-system-size-output";
import {LinearSystemDataOutput} from "./calculator-content/linear-system-data/linear-system-data-output";
import {StandardFormInput} from "./calculator-content/standard-form/standard-form-input";
import * as math from "mathjs";
import {Fraction} from "mathjs";
import {TableauData} from "./tableau-data";
import {StandardFormOutput} from "./calculator-content/standard-form/standard-form-output";
import {LinearSystemDataInput} from "./calculator-content/linear-system-data/linear-system-data-input";
import {SolutionInput} from "./calculator-content/solution/solution-input";
import {TableauInput} from "./calculator-content/tableau/tableau-input";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  numberOfVars: number = 2;
  numberOfConstraints: number = 3;

  showLinearSystem: boolean = false;

  targetVars: number[] | undefined;
  targetSlackVars: number[] | undefined;
  targetConstant: number | undefined;

  constraintVars: number[][] | undefined;
  constraintSlackVars: number[][] | undefined;
  constraintConstants: number[] | undefined;

  showSolution = false;

  tableauData: Array<TableauData> | undefined;

  bla!: LinearSystemDataOutput;

  newStandardFormData: StandardFormInput = {
    numberOfVars: 2,
    numberOfConstraints: 3,

    targetVars: [math.fraction('1.1'), math.fraction('2/3')] as Fraction[],

    constraintVars: [
      [math.fraction('-4/5'), math.fraction('1')],
      [math.fraction('7'), math.fraction('-8')],
      [math.fraction('9.9'), math.fraction('-1.3')],
    ] as Fraction[][],

    constraintVals: [math.fraction('1/8'), math.fraction('2/9'), math.fraction('30/31')] as Fraction[]
  }

  constructor(private changeDetection: ChangeDetectorRef) {
  }

  onLinearSystemSizeChange(largeLpData: LinearSystemSizeOutput) {
    this.numberOfVars = largeLpData.numberOfVars;
    this.numberOfConstraints = largeLpData.numberOfConstraints;
    this.showLinearSystem = true;
  }

  // negateTargetVars(data: LinearSystemDataOutput): LinearSystemDataOutput {
  //   return {
  //     targetVars: data.targetVars.map(x => -x),
  //     constraintVars: data.constraintVars,
  //     constraintConstants: data.constraintConstants
  //   }
  // }

  // onStandardFormDataChange(standardFormData: StandardFormData) {
  //   this.standardFormData = standardFormData;
  //
  //   this.targetVars = standardFormData.targetVars;
  //   this.targetSlackVars = standardFormData.targetSlackVars;
  //   this.targetConstant = 0;
  //
  //   this.constraintVars = standardFormData.constraintVars;
  //   this.constraintSlackVars = standardFormData.constraintSlackVars;
  //   this.constraintConstants = standardFormData.constraintConstants;
  //
  //   const allTargetVarsPositive = this.targetVars.reduce((old, next) => old && next >= 0, true);
  //
  //   if (allTargetVarsPositive) {
  //     this.showSolution = true;
  //   }
  //
  //   this.calcNewTableaus();
  // }

  getTableauInput(tableauData: TableauData): TableauInput {
    return {
      numberOfVars: this.numberOfVars + this.numberOfConstraints,
      numberOfConstraints: this.numberOfConstraints,

      ...tableauData
    }
  }

  ngOnInit(): void {
    this.calcNewTableaus();
  }

  newStandardFormOutput: StandardFormOutput = {
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

  calcNewTableaus(): void {
    this.tableauData = new Array<TableauData>();

    //
    // First tableau contains input data
    //

    this.tableauData[0] = {
      targetVars: this.newStandardFormOutput.targetVars,
      targetVal: math.fraction(0) as Fraction,

      constraintVars: this.newStandardFormOutput.constraintVars,
      constraintVals: this.newStandardFormOutput.constraintVals,

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

      const thetas = new Array<Fraction>(this.numberOfConstraints);

      for (let c = 0; c < thetas.length; c++) {
        thetas[c] = math.divide(prevTableau.constraintVals[c], prevTableau.constraintVars[c][pivotCol]) as Fraction;
      }

      prevTableau.thetas = thetas;

      //
      // Find pivot row (row with smallest positive theta) and pivot element
      //

      const positiveThetas = thetas.filter(value => math.larger(value, 0));
      const pivotRow = positiveThetas.indexOf(math.min(...positiveThetas));

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

  getLinearSystemDataInput(): LinearSystemDataInput {
    // return {
    //   numberOfVars: this.numberOfVars,
    //   numberOfConstraints: this.numberOfConstraints
    // }

    return {
      numberOfVars: 2,
      numberOfConstraints: 3
    }
  }

  onLinearSystemDataChange(linearSystemDataOutput: LinearSystemDataOutput): void {
    this.bla = linearSystemDataOutput;
  }

  getStandardFormInput() {
    return this.newStandardFormData;
  }

  onStandardFormChange(standardFormOutput: StandardFormOutput) {

  }

  getSolutionInput(): SolutionInput {
    return {targetConstant: this.targetConstant!}
  }
}
