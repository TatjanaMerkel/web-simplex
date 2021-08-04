import {Fraction} from 'mathjs'

export interface LinearSystemDataOutput {
  targetVars: Array<null | Fraction>,

  constraintVars: Array<Array<null | Fraction>>,
  constraintVals: Array<null | Fraction>,

  isValid: boolean
}
