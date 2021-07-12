import {Fraction} from "mathjs";

export interface NewLinearSystemOutput {
  targetVarsRow: Fraction[],

  constraintVarsMatrix: Fraction[][],
  constraintValsCol: Fraction[]
}
