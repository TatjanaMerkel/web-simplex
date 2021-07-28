import {Injectable} from '@angular/core'
import {Fraction} from 'mathjs'
import * as math from 'mathjs'

import {Exercise} from '../models/exercise'
import {Difficulty} from '../models/difficulty'


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercises: Exercise[] = [

    {
      id: 1,

      title: 'Example Exercise',

      difficulty: Difficulty.Easy,

      task: null,

      numberOfVars: 2,
      numberOfConstraints: 2,

      targetVars: [
        math.fraction(1) as Fraction,
        math.fraction(2) as Fraction
      ],

      constraintVars: [
        [
          math.fraction(3) as Fraction,
          math.fraction(4) as Fraction
        ],
        [
          math.fraction(5) as Fraction,
          math.fraction(6) as Fraction
        ]
      ],

      constraintVals: [
        math.fraction(7) as Fraction,
        math.fraction(8) as Fraction
      ]
    }
  ]

  getExercises(): Exercise[] {
    return this.exercises
  }

  addExercise(exercise: Exercise): void {
    this.exercises.push(exercise)
  }

  constructor() {
  }
}
