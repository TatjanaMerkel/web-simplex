import {ChangeDetectorRef, Component} from '@angular/core';
import {LinearSystemSizeOutput} from "./calculator-content/linear-system-size/linear-system-size-output";
import {LinearSystemDataOutput} from "./calculator-content/linear-system-data/linear-system-data-output";
import {StandardFormInput} from "./calculator-content/standard-form/standard-form-input";
import * as math from "mathjs";
import {Fraction} from "mathjs";
import {NewTableauData} from "./new-tableau-data";
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

  tableauData: Array<NewTableauData> | undefined;

  bla!: LinearSystemDataOutput;

  newStandardFormData: StandardFormInput = {
    numberOfVars: 2,
    numberOfConstraints: 3,

    targetVars: [math.fraction('1.1'), math.fraction('2/3')] as Fraction[],

    constraintVars: [
      [math.fraction('-4/5'), math.fraction('1')],
      [math.fraction('7'), math.fraction('-8')],
      [math.fraction('9.9'), math.fraction('-1.3')]
    ] as Fraction[][],

    constraintVals: [math.fraction('10/11'), math.fraction('20/21'), math.fraction('30/31')] as Fraction[]
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




  getNewTableauInput(tableauData: NewTableauData): TableauInput {
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
      math.fraction('-1.1'),
      math.fraction('-2/3'),
      math.fraction(0),
      math.fraction(0),
      math.fraction(0)
    ] as Fraction[],

    targetVal: math.fraction(0) as Fraction,

    constraintVars: [
      [
        math.fraction('-4/5'),
        math.fraction('1'),
        math.fraction(1),
        math.fraction(0),
        math.fraction(0)
      ],
      [
        math.fraction('7'),
        math.fraction('-8'),
        math.fraction(0),
        math.fraction(1),
        math.fraction(0)
      ],
      [
        math.fraction('9.9'),
        math.fraction('-1.3'),
        math.fraction(0),
        math.fraction(0),
        math.fraction(1)
      ],
    ] as Fraction[][],

    constraintVals: [
      math.fraction('1/8'),
      math.fraction('2/9'),
      math.fraction('30/31')
    ] as Fraction[],

    slackVars: [1, 2, 3]
  }


  calcNewTableaus(): void {
    this.tableauData = new Array<NewTableauData>();

    //
    // First tableau contains input data
    //
    this.tableauData[0] = {
      targetVars: this.newStandardFormOutput.targetVars,
      targetVal: math.fraction(0) as Fraction,
      constraintVars: this.newStandardFormOutput.constraintVars,
      constraintVals: this.newStandardFormOutput.constraintVals
    }

    let previousTableau = this.tableauData[0];
    let minTargetVar = math.min(...previousTableau.targetVars);


    while (math.smaller(minTargetVar, 0)) {

      /*
       * Find (non-slack) variable with most negative target variable
       */

      const pivotCol = previousTableau.targetVars.indexOf(minTargetVar);

      /*
       * Shorter var names
       */

      const oldTargetVars = previousTableau.targetVars;
      const oldTargetVal = previousTableau.targetVal;

      const oldConstraintVars = previousTableau.constraintVars;
      const oldConstraintVals = previousTableau.constraintVals;


      /*
       * Create new data arrays with same size as input arrays
       */

      const newConstraintVars = new Array<Array<Fraction>>(oldConstraintVars.length);
      const newConstraintVals = new Array<Fraction>(oldConstraintVals.length);

      /*
       * Calculate theta values
       */

      const thetas = new Array<Fraction>(this.numberOfConstraints);

      for (let i = 0; i < thetas.length; i++) {
        thetas[i] = math.divide(oldConstraintVals[i], oldConstraintVars[i][pivotCol]) as Fraction;

      }

      /*
       * - Find pivot row, i.e. row with smallest positive theta value
       * - Get pivot element at pivot row/column intersection
       */

      const positiveThetas = thetas.filter(value => math.larger(value, 0));
      const pivotRow = positiveThetas.indexOf(math.min(...positiveThetas));


      const pivot = oldConstraintVars[pivotRow][pivotCol];

      /*
       * Calculate new pivot row by dividing though pivot element
       */

      newConstraintVars[pivotRow] = oldConstraintVars[pivotRow]
        .map(value => math.divide(value, pivot) as Fraction);

      newConstraintVals[pivotRow] = math.divide(oldConstraintVals[pivotRow], pivot) as Fraction;

      /*
       * Calculate other rows by subtracting multiple of new pivot row
       */

      for (let row = 0; row < oldConstraintVars.length; row++) {
        if (row !== pivotRow) {
          const factor = oldConstraintVars[row][pivotCol];

          newConstraintVars[row] = oldConstraintVars[row].map((value, index) =>
            math.subtract(value, math.multiply(factor, newConstraintVars[pivotRow][index]))
          ) as Fraction[];

          newConstraintVals[row] = math.subtract(oldConstraintVals[row],
            math.multiply(factor, newConstraintVals[pivotRow])) as Fraction;

        }
      }
      /*
       * Calculate target row by subtracting multiple of new pivot row
       */

      const factor = oldTargetVars[pivotCol];

      const newTargetVars = oldTargetVars.map((value, index) =>
        math.subtract(value, math.multiply(factor, newConstraintVars[pivotRow][index]))
      ) as Fraction[];

      const newTargetVal = math.subtract(oldTargetVal,
        math.multiply(factor, newConstraintVals[pivotRow])) as Fraction;


      const newTableau = {
        targetVars: newTargetVars,
        targetVal: newTargetVal,


        constraintVars: newConstraintVars,
        constraintVals: newConstraintVals
      }


      this.tableauData.push(newTableau);

      previousTableau = newTableau;
      minTargetVar = math.min(...previousTableau.targetVars);
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


