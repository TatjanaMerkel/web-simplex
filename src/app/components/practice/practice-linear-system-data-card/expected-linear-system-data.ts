import {Fraction} from 'mathjs'

export interface ExpectedLinearSystemData {
  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: Array<Fraction>,
  constraintVars: Array<Array<Fraction>>,
  constraintVals: Array<Fraction>
}
