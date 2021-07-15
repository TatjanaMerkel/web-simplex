import {Fraction} from 'mathjs';

export interface TableauInput {
  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: Fraction[],
  targetVal: Fraction,

  constraintVars: Fraction[][],
  constraintVals: Fraction[],

  pivotCol: number,
  pivotRow: number

}
