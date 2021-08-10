import {ActivatedRoute, Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'

import * as math from 'mathjs'

import {Exercise} from '../../../models/exercise'
import {ExerciseService} from '../../../services/exercise.service'
import {LinearSystemDataInput} from '../../components/linear-system-data/linear-system-data-input'
import {LinearSystemDataOutput} from "../../components/linear-system-data/linear-system-data-output";
import {Fraction} from "mathjs";

@Component({
  selector: 'app-admin-edit-exercise',
  templateUrl: './admin-edit-exercise.component.html',
  styleUrls: ['./admin-edit-exercise.component.css']
})
export class AdminEditExerciseComponent implements OnInit {

  exercise: undefined | Exercise

  constructor(private route: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const exercise_id = Number(params['exercise_id'])

      this.exerciseService.getExercise(exercise_id).subscribe((exercise: any) => {
        const reviver = (math as any).reviver

        this.exercise = {
          ...exercise,
          targetVars: JSON.parse(JSON.stringify(exercise.targetVars), reviver),
          constraintVars: JSON.parse(JSON.stringify(exercise.constraintVars), reviver),
          constraintVals: JSON.parse(JSON.stringify(exercise.constraintVals), reviver)
        }
      })
    })
  }

  getLinearSystemDataInput(): LinearSystemDataInput {
    const exercise = this.exercise!

    return {
      numberOfVars: exercise.numberOfVars,
      numberOfConstraints: exercise.numberOfConstraints,

      targetVars: exercise.targetVars,
      constraintVars: exercise.constraintVars,
      constraintVals: exercise.constraintVals
    }
  }

  onSubmit() {
    this.exerciseService.putExercise(this.exercise!).subscribe(() => {
      this.router.navigate(['/admin/exercises'])
    })
  }

  onLinearSystemDataChange(linearSystemDataOutput: LinearSystemDataOutput) {
    const {targetVars, constraintVars, constraintVals, isValid} = linearSystemDataOutput

    if (isValid) {
      this.exercise!.targetVars = targetVars as Array<Fraction>
      this.exercise!.constraintVars = constraintVars as Array<Array<Fraction>>
      this.exercise!.constraintVals = constraintVals as Array<Fraction>
    } else {
      // TODO
    }
  }
}
