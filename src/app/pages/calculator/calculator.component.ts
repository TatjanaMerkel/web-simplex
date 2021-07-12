import {ChangeDetectorRef, Component} from '@angular/core';
import {LargeLpData} from "./calculator-content/large-lp/large-lp-data";
import {LinearSystemData} from "./calculator-content/linear-system/linear-system-data";
import {StandardFormData} from "./calculator-content/standard-form/standard-form-data";
import {TableauInput} from "./calculator-content/tableau/tableau-input";
import {TableauData} from "./tableau-data";
import {NewLinearSystemOutput} from "./calculator-content/new-linear-system/new-linear-system-output";
import {NewStandardFormInput} from "./calculator-content/new-standard-form/new-standard-form-input";
import * as math from "mathjs";
import {Fraction} from "mathjs";



@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  numberOfVars: number = 0;
  numberOfConstraints: number = 0;

  showLinearSystem: boolean = false;

  linearSystemData: LinearSystemData | null = null;

  standardFormData: StandardFormData | null = null;

  targetVars: number[] | undefined;
  targetSlackVars: number[] | undefined;
  targetConstant: number | undefined;

  constraintVars: number[][] | undefined;
  constraintSlackVars: number[][] | undefined;
  constraintConstants: number[] | undefined;

  showSolution = false;

  tableauDataList: Array<TableauData> | undefined;

  bla!: NewLinearSystemOutput;

  newStandardFormData: NewStandardFormInput = {
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

  onLargeLpDataChange(largeLpData: LargeLpData) {
    this.numberOfVars = largeLpData.numberOfVars;
    this.numberOfConstraints = largeLpData.numberOfConstraints;
    this.showLinearSystem = true;
  }

  negateTargetVars(data: LinearSystemData): LinearSystemData {
    return {
      targetVars: data.targetVars.map(x => -x),
      constraintVars: data.constraintVars,
      constraintConstants: data.constraintConstants
    }
  }

  onStandardFormDataChange(standardFormData: StandardFormData) {
    this.standardFormData = standardFormData;

    this.targetVars = standardFormData.targetVars;
    this.targetSlackVars = standardFormData.targetSlackVars;
    this.targetConstant = 0;

    this.constraintVars = standardFormData.constraintVars;
    this.constraintSlackVars = standardFormData.constraintSlackVars;
    this.constraintConstants = standardFormData.constraintConstants;

    const allTargetVarsPositive = this.targetVars.reduce((old, next) => old && next >= 0, true);

    if (allTargetVarsPositive) {
      this.showSolution = true;
    }

    this.calcTableaus();
  }

  getTableauInput(i: number): TableauInput {
    return {
      numberOfVars: this.numberOfVars,
      numberOfConstraints: this.numberOfConstraints,

      ...this.tableauDataList![i],

      calculate: false
    }
  }

  calcTableaus() {
    this.tableauDataList = new Array<TableauData>();

    this.tableauDataList[0] = {
      targetVars: this.standardFormData!.targetVars,
      targetSlackVars: this.standardFormData!.targetSlackVars,
      targetConstant: 0,

      constraintVars: this.standardFormData!.constraintVars,
      constraintSlackVars: this.standardFormData!.constraintSlackVars,
      constraintConstants: this.standardFormData!.constraintConstants
    };

    let previousTableauData = this.tableauDataList[0];
    let minTargetVar = Math.min(...previousTableauData.targetVars, ...previousTableauData.targetSlackVars);


    while (minTargetVar < 0) {

      /*
       * Find (non-slack) variable with most negative target variable
       */

      const pivotCol = previousTableauData.targetVars.indexOf(minTargetVar);

      // calculate tableau from previous tableau

      const targetVars = previousTableauData.targetVars;
      const targetSlackVars = previousTableauData.targetSlackVars;
      const targetConstant = previousTableauData.targetConstant;

      const constraintVars = previousTableauData.constraintVars;
      const constraintSlackVars = previousTableauData.constraintSlackVars;
      const constraintConstants = previousTableauData.constraintConstants;

      /*
       * Create new data arrays with same size as input arrays
       */

      const newConstraintVars = new Array<Array<number>>(constraintVars.length);
      const newConstraintSlackVars = new Array<Array<number>>(constraintSlackVars.length);
      const newConstraintConstants = new Array<number>(constraintConstants.length);

      /*
       * Calculate theta values
       */

      const thetas = new Array<number>(this.numberOfConstraints);
      for (let i = 0; i < thetas.length; i++) {
        thetas[i] = constraintConstants[i] / constraintVars[i][pivotCol];
      }

      /*
       * - Find pivot row, i.e. row with smallest positive theta value
       * - Get pivot element at pivot row/column intersection
       */

      const positiveThetas = thetas.filter(value => value > 0);
      const pivotRow = positiveThetas.indexOf(Math.min(...positiveThetas));

      const pivot = constraintVars[pivotRow][pivotCol];

      /*
       * Calculate new pivot row by dividing though pivot element
       */

      newConstraintVars[pivotRow] = constraintVars[pivotRow].map(x => x / pivot);
      newConstraintSlackVars[pivotRow] = constraintSlackVars[pivotRow].map(x => x / pivot);
      newConstraintConstants[pivotRow] = constraintConstants[pivotRow] / pivot;

      /*
       * Calculate other rows by subtracting multiple of new pivot row
       */

      for (let row = 0; row < constraintVars.length; row++) {
        if (row !== pivotRow) {
          const factor = constraintVars[row][pivotCol];
          console.log('factor');
          console.log(factor);

          newConstraintVars[row] = constraintVars[row].map(
            (x, i) => x - factor * newConstraintVars[pivotRow][i]);

          newConstraintSlackVars[row] = constraintSlackVars[row].map(
            (x, i) => x - factor * newConstraintSlackVars[pivotRow][i]);

          newConstraintConstants[row] = constraintConstants[row] - factor * newConstraintConstants[pivotRow];
        }
      }
      /*
       * Calculate target row by subtracting multiple of new pivot row
       */

      const factor = targetVars[pivotCol];

      const newTargetVars = targetVars.map(
        (x, i) => x - factor * newConstraintVars![pivotRow][i])

      const newTargetSlackVars = targetSlackVars.map(
        (x, i) => x - factor * newConstraintSlackVars![pivotRow][i]);

      const newTargetConstant = targetConstant - factor * newConstraintConstants[pivotRow];


      const newTableau = {
        targetVars: newTargetVars,
        targetSlackVars: newTargetSlackVars,
        targetConstant: newTargetConstant,

        constraintVars: newConstraintVars,
        constraintSlackVars: newConstraintSlackVars,
        constraintConstants: newConstraintConstants
      };

      this.tableauDataList.push(newTableau);

      previousTableauData = newTableau;
      minTargetVar = Math.min(...previousTableauData.targetVars, ...previousTableauData.targetSlackVars);

    }
  }

  log($event: NewLinearSystemOutput) {
    console.log($event)
  }

}
