import {Component, OnInit} from '@angular/core';

import {Exercise} from '../../../models/exercise'
import {ExerciseService} from '../../../services/exercise.service'
import {LinearSystemDataInput} from "../../components/linear-system-data/linear-system-data-input";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-edit-exercise',
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

      this.exerciseService.getExercise(exercise_id).subscribe(exercise => {
        this.exercise = exercise
      })
    })
  }

  getLinearSystemDataInput(): LinearSystemDataInput {
    const exercise = this.exercise!

    return {
      numberOfVars: exercise.numberOfVars,
      numberOfConstraints: exercise.numberOfConstraints,
      editable: true
    }
  }


}
