import {Fraction} from 'mathjs';

export interface TableauData {
  targetVars: Fraction[],
  targetVal: Fraction,

  constraintVars: Fraction[][],
  constraintVals: Fraction[],

  pivotCol: number,
  pivotRow: number

}
