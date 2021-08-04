import {Fraction} from 'mathjs'

export interface LinearSystemDataCardOutput {
  targetVars: Array<Fraction>,

  constraintVars: Array<Array<Fraction>>,
  constraintVals: Array<Fraction>
}
