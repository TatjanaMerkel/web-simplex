import {Fraction} from 'mathjs'

export interface LinearSystemData {
  targetVars: Fraction[]

  constraintVars: Fraction[][]
  constraintVals: Fraction[]
}
