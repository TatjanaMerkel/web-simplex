import {Fraction} from 'mathjs';

export interface NewTableauData {
  targetVars: Fraction[],
  targetVal: Fraction,

  constraintVars: Fraction[][],
  constraintVals: Fraction[]
}
