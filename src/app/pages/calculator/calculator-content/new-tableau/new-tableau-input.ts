import {Fraction} from 'mathjs';

export interface NewTableauInput {
  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: Fraction[],
  targetVal: Fraction,

  constraintVars: Fraction[][],
  constraintVals: Fraction[],

  calculate: boolean
}
