import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TableauInput} from "./tableau-input";


@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent  implements OnChanges {


  @Input() inputData: TableauInput | undefined;

  targetVars: number[] | undefined;
  targetSlackVars: number[] | undefined;
  targetConstant: number | undefined;

  constraintVars: number[][] | undefined;
  constraintSlackVars: number[][] | undefined;
  constraintConstants: number[] | undefined;

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.inputData) {
      if (!this.inputData.calculate) {
        // initial tableau with specified data

        this.targetVars = this.inputData.targetVars;
        this.targetSlackVars = this.inputData.targetSlackVars;
        this.targetConstant = this.inputData.targetConstant;

        this.constraintVars = this.inputData.constraintVars;
        this.constraintSlackVars = this.inputData.constraintSlackVars;
        this.constraintConstants = this.inputData.constraintConstants;

      } else {
        // calculate tableau from previous tableau

        const numberOfConstraints = this.inputData.numberOfConstraints

        const targetVars = this.inputData.targetVars;
        const targetSlackVars = this.inputData.targetSlackVars;
        const targetConstant = this.inputData.targetConstant;

        const constraintVars = this.inputData.constraintVars;
        const constraintSlackVars = this.inputData.constraintSlackVars;
        const constraintConstants = this.inputData.constraintConstants;

        /*
         * Create new data arrays with same size as input arrays
         */

        this.targetVars = new Array<number>(targetVars.length);
        this.targetSlackVars = new Array<number>(targetSlackVars.length);

        this.constraintVars = new Array<Array<number>>(constraintVars.length);
        this.constraintSlackVars = new Array<Array<number>>(constraintSlackVars.length);
        this.constraintConstants = new Array<number>(constraintConstants.length);

        /*
         * Find (non-slack) variable with most negative target variable
         */

        const pivotCol = targetVars.indexOf(Math.min(...targetVars));

        /*
         * Calculate theta values
         */

        const thetas = new Array<number>(numberOfConstraints);
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

        this.constraintVars[pivotRow] = constraintVars[pivotRow].map(x => x / pivot);
        this.constraintSlackVars[pivotRow] = constraintSlackVars[pivotRow].map(x => x / pivot);
        this.constraintConstants[pivotRow] = constraintConstants[pivotRow] / pivot;

        /*
         * Calculate other rows by subtracting multiple of new pivot row
         */

        for (let row = 0; row < constraintVars.length; row++) {
          if (row !== pivotRow) {
            const factor = constraintVars[row][pivotCol];

            this.constraintVars[row] = constraintVars[row].map(
              (x, i) => x - factor * this.constraintVars![pivotRow][i])

            this.constraintSlackVars[row] = constraintSlackVars[row].map(
              (x, i) => x - factor * this.constraintSlackVars![pivotRow][i]);

            this.constraintConstants[row] = constraintConstants[row] - factor * this.constraintConstants[pivotRow];
          }
        }

        /*
         * Calculate target row by subtracting multiple of new pivot row
         */

        const factor = targetVars[pivotCol];

        this.targetVars = targetVars.map(
          (x, i) => x - factor * this.constraintVars![pivotRow][i])

        this.targetSlackVars = targetSlackVars.map(
          (x, i) => x - factor * this.constraintSlackVars![pivotRow][i]);

        this.targetConstant = targetConstant - factor * this.constraintConstants[pivotRow];
      }
    }
  }


}


