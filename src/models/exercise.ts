import {Fraction} from 'mathjs'
import {Difficulty} from './difficulty'


export interface Exercise {
  difficulty: Difficulty,

  task: string | null,

  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: Fraction[],
  constraintVars: Fraction[][]
  constraintVals: Fraction[]
}
