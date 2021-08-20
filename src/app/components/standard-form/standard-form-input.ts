import {Fraction} from 'mathjs'

export interface StandardFormInput {
  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: Array<Fraction>,
  constraintVars: Array<Array<Fraction>>,
  constraintVals: Array<Fraction>,

  slackVars: number[]

}
