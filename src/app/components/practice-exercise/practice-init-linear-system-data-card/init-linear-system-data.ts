import {Fraction} from 'mathjs'

export interface InitLinearSystemData {
  targetVars: Fraction[]
  constraintVars: Fraction[][]
  constraintVals: Fraction[]
}
