import {Fraction} from 'mathjs'

export default interface ExpectedTableau {
  numberOfVars: number
  numberOfConstraints: number

  targetVars: Fraction[]
  targetVal: Fraction

  constraintVars: Fraction[][]
  constraintVals: Fraction[]

  thetas: Fraction[] | null
}
