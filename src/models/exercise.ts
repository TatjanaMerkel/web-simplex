import {Fraction} from 'mathjs'

import {Difficulty} from './difficulty'

export interface Exercise {
  id: number,

  title: string,

  difficulty: Difficulty,

  task: string,

  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: Fraction[],
  constraintVars: Fraction[][]
  constraintVals: Fraction[]
}
