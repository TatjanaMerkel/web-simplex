import {Component} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {Difficulty} from '../../../models/difficulty'
import {Exercise} from '../../../models/exercise'
import {ExerciseService} from '../../../services/exercise.service'
import {LinearSystemDataInput} from '../../components/linear-system-data/linear-system-data-input'
import {Router} from "@angular/router"
import {LinearSystemDataOutput} from "../../components/linear-system-data/linear-system-data-output"


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
      numberOfConstraints: this.newExercise.numberOfConstraints,

      targetVars: null,
      constraintVars: null,
      constraintVals: null
    }
  }

  onSubmit() {
    this.exerciseService.postExercise(this.newExercise).subscribe(() => {
      this.router.navigate(['/admin/exercises'])
    })
  }

  onLinearSystemDataChange(linearSystemDataOutput: LinearSystemDataOutput) {
    const {targetVars, constraintVars, constraintVals, isValid} = linearSystemDataOutput

    if (isValid) {
      this.newExercise.targetVars = targetVars as Array<Fraction>
      this.newExercise.constraintVars = constraintVars as Array<Array<Fraction>>
      this.newExercise.constraintVals = constraintVals as Array<Fraction>
    } else {
      // TODO
    }
  }
}
