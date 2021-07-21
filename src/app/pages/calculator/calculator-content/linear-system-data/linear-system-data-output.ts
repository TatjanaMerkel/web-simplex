import {Fraction} from 'mathjs';

export interface LinearSystemDataOutput {
  targetVars: Fraction[],

  constraintVars: Fraction[][],
  constraintVals: Fraction[]

}
