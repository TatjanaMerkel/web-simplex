import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'

import {Exercise} from '../../../models/exercise'
import {ExerciseService} from '../../../services/exercise.service'
import {HeaderService} from '../../../services/header.service'
import {StandardFormInput} from '../../components/standard-form/standard-form-input'


@Component({
  selector: 'app-practice-exercise',
  templateUrl: './practice-exercise.component.html',
  styleUrls: ['./practice-exercise.component.css']
})
export class PracticeExerciseComponent implements OnInit {

  exercise: undefined | Exercise

  constructor(private route: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const exercise_id = Number(params['exercise_id'])

      this.exerciseService.getExercise(exercise_id).subscribe((exercise: Exercise) => {
        this.exercise = exercise

        console.log(this.exercise)
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
