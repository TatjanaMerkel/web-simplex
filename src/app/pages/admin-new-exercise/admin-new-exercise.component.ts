import {Component} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {Difficulty} from '../../../models/difficulty'
import {Exercise} from '../../../models/exercise'
import {ExerciseService} from '../../../services/exercise.service'
import {LinearSystemDataInput} from '../../components/linear-system-data/linear-system-data-input'
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-new-exercise',
  templateUrl: './admin-new-exercise.component.html',
  styleUrls: ['./admin-new-exercise.component.css']
})
export class AdminNewExerciseComponent {

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

  constructor(private router: Router,
              private exerciseService: ExerciseService) {
  }

  getLinearSystemDataInput(): LinearSystemDataInput {
    return {
      numberOfVars: this.newExercise.numberOfVars,
      numberOfConstraints: this.newExercise.numberOfConstraints
    }
  }

  onSubmit() {
    this.exerciseService.postExercise(this.newExercise).subscribe(() => {
      this.router.navigate(['/admin/exercises'])
    })
  }
}
