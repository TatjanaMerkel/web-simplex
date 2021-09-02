import {Fraction} from 'mathjs'

export interface ExpectedLinearSystemData {
  numberOfVars: number
  numberOfConstraints: number

  targetVars: Fraction[]
  constraintVars: Fraction[][]
  constraintVals: Fraction[]
}
