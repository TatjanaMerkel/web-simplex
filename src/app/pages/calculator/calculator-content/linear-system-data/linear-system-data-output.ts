import {Fraction} from 'mathjs';

export interface LinearSystemDataOutput {
  targetVarsRow: Fraction[],

  constraintVarsMatrix: Fraction[][],
  constraintValsCol: Fraction[]

}
