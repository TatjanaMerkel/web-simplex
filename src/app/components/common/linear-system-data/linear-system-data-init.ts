import {Fraction} from 'mathjs'

export interface LinearSystemDataInit {
  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: null | Array<null | Fraction>,
  constraintVars: null | Array<Array<null | Fraction>>,
  constraintVals: null | Array<null | Fraction>
}
