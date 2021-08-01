import {Component, OnInit} from '@angular/core'

import {Difficulty} from '../../../models/difficulty'
import {Exercise} from '../../../models/exercise'
import {ExerciseService} from '../../../services/exercise.service'

@Component({
  selector: 'app-admin-exercises',
  templateUrl: './admin-exercises.component.html',
  styleUrls: ['./admin-exercises.component.css']
})
export class AdminExercisesComponent implements OnInit {

  easyExercises: Exercise[] = []
  mediumExercises: Exercise[] = []
  hardExercises: Exercise[] = []

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe(exercises => {
      this.easyExercises = exercises
        .filter(exercise => exercise.difficulty === Difficulty.EASY)

      this.mediumExercises = exercises
        .filter(exercise => exercise.difficulty === Difficulty.MEDIUM)

      this.hardExercises = exercises
        .filter(exercise => exercise.difficulty === Difficulty.HARD)
    })
  }
}
