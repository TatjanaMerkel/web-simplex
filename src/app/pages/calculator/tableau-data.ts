import {Fraction} from 'mathjs';

export interface TableauData {
  targetVars: Fraction[],
  targetVal: Fraction,

  constraintVars: Fraction[][],
  constraintVals: Fraction[],

  pivotCol: number | null,
  pivotRow: number | null,

  thetas: Fraction[] | null,

  slackVars: number[]
}
