import {Fraction} from 'mathjs'

export interface Exercise {
  task: string,

  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: Fraction[],
  constraintVars: Fraction[][]
  constraintVals: Fraction[]
}
