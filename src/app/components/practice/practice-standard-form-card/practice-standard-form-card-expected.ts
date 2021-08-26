import {Fraction} from 'mathjs'

export interface PracticeStandardFormCardExpected {
  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: Array<Fraction>,
  constraintVars: Array<Array<Fraction>>,
  constraintVals: Array<Fraction>
}
