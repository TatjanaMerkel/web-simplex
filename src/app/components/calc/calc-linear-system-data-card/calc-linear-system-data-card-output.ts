import {Fraction} from 'mathjs'

export interface CalcLinearSystemDataCardOutput {
  targetVars: Fraction[]
  constraintVars: Fraction[][]
  constraintVals: Fraction[]
}
