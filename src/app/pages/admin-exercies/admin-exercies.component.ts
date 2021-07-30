import {Component, OnInit} from '@angular/core';
import {Difficulty} from '../../../models/difficulty'
import {ExerciseService} from '../../../services/exercise.service'


@Component({
  selector: 'app-admin-exercies',
  templateUrl: './admin-exercies.component.html',
  styleUrls: ['./admin-exercies.component.css']
})
export class AdminExerciesComponent implements OnInit {

  numberOfEasyExercises: undefined | number
  numberOfMediumExercises: undefined | number
  numberOfHardExercises: undefined | number

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe(exercises => {
      this.numberOfEasyExercises = exercises
        .filter(exercise => exercise.difficulty === Difficulty.EASY)
        .length

      this.numberOfMediumExercises = exercises
        .filter(exercise => exercise.difficulty === Difficulty.MEDIUM)
        .length

      this.numberOfHardExercises = exercises
        .filter(exercise => exercise.difficulty === Difficulty.HARD)
        .length
    })

  }

}
