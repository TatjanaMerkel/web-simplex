import {Fraction} from 'mathjs'

export interface LinearSystemDataValues {
  targetVars: Array<null | Fraction>,
  constraintVars: Array<Array<null | Fraction>>,
  constraintVals: Array<null | Fraction>,

  isValid: boolean
}
