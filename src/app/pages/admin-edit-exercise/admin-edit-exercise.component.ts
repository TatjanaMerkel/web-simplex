import {ActivatedRoute} from '@angular/router'
import {Component, OnInit} from '@angular/core'

import * as math from 'mathjs'

import {Exercise} from '../../../models/exercise'
import {ExerciseService} from '../../../services/exercise.service'
import {LinearSystemDataInput} from "../../components/linear-system-data/linear-system-data-input";
import {MathJsJson} from "mathjs";

@Component({
  selector: 'app-admin-edit-exercise',
  templateUrl: './admin-edit-exercise.component.html',
  styleUrls: ['./admin-edit-exercise.component.css']
})
export class AdminEditExerciseComponent implements OnInit {

  exercise: undefined | Exercise

  constructor(private route: ActivatedRoute,
              private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const exercise_id = Number(params['exercise_id'])

      this.exerciseService.getExercise(exercise_id).subscribe((exercise: any) => {
        const reviver = (math as any).reviver

        const ex: Exercise = {
          ...exercise,
          targetVars: JSON.parse(JSON.stringify(exercise.targetVars), reviver),
          constraintVars: JSON.parse(JSON.stringify(exercise.constraintVars), reviver),
          constraintVals: JSON.parse(JSON.stringify(exercise.constraintVals), reviver)
        }
        this.exercise = exercise
        console.log(exercise)
      })
    })
  }

  getLinearSystemDataInput(): LinearSystemDataInput {
    const exercise = this.exercise!

    return {
      numberOfVars: exercise.numberOfVars,
      numberOfConstraints: exercise.numberOfConstraints
    }
  }
}
