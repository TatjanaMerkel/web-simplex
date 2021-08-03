import * as math from 'mathjs'
import {Component, OnInit} from '@angular/core';
import {Difficulty} from '../../../models/difficulty'
import {Exercise} from '../../../models/exercise'
import {Fraction} from 'mathjs'


@Component({
  selector: 'app-admin-new-exercise',
  templateUrl: './admin-new-exercise.component.html',
  styleUrls: ['./admin-new-exercise.component.css']
})
export class AdminNewExerciseComponent implements OnInit {

  newExercise: Exercise = {
    id: -1,
    title: '',
    difficulty: Difficulty.EASY,
    task: '',
    numberOfVars: 2,
    numberOfConstraints: 2,
    targetVars: [
      math.fraction(0) as Fraction,
      math.fraction(0) as Fraction
    ],
    constraintVars: [
      [
        math.fraction(0) as Fraction,
        math.fraction(0) as Fraction
      ],
      [
        math.fraction(0) as Fraction,
        math.fraction(0) as Fraction
      ]
    ],
    constraintVals: [
      math.fraction(0) as Fraction,
      math.fraction(0) as Fraction
    ],
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
