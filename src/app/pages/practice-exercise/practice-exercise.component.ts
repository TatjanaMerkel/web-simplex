import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

import {Exercise} from '../../../models/exercise'
import {ExerciseService} from '../../../services/exercise.service'
import {HeaderService} from '../../../services/header.service'
import {StandardFormInput} from '../../components/standard-form/standard-form-input'
import {PracticeLinearSystemDataCardExpected} from "../../components/practice-linear-system-data-card/practice-linear-system-data-card-expected";
import * as math from "mathjs";

@Component({
  selector: 'app-practice-exercise',
  templateUrl: './practice-exercise.component.html',
  styleUrls: ['./practice-exercise.component.css']
})
export class PracticeExerciseComponent implements OnInit {

  exercise: undefined | Exercise

  linearSystemSizeCorrect = false
  linearSystemDataCorrect = false
  standardFormCorrect = false
  tableausCorrect = false
  solutionCorrect = false

  get expectedLinearSystemData(): PracticeLinearSystemDataCardExpected {
    const exercise = this.exercise!

    return {
      numberOfVars: exercise.numberOfVars,
      numberOfConstraints: exercise.numberOfConstraints,
      targetVars: exercise.targetVars,
      constraintVars: exercise.constraintVars,
      constraintVals: exercise.constraintVals
    }
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Üben')

    this.route.params.subscribe(params => {
      const exercise_id = Number(params['exercise_id'])

      this.exerciseService.getExercise(exercise_id).subscribe((exercise: Exercise) => {
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

  getStandardFormInput(): StandardFormInput {
    return {
      numberOfVars: this.exercise!.numberOfVars,
      numberOfConstraints: this.exercise!.numberOfConstraints,

      targetVars: this.exercise!.targetVars,

      constraintVars: this.exercise!.constraintVars,
      constraintVals: this.exercise!.constraintVals,

      slackVars: []
    }
  }
}
