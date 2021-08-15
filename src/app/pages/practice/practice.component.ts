import {Component, OnInit} from '@angular/core'

import {HeaderService} from '../../../services/header.service'
import {Exercise} from "../../../models/exercise";
import {ExerciseService} from "../../../services/exercise.service";
import {Difficulty} from "../../../models/difficulty";


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  easyExercises: Exercise[] = []
  mediumExercises: Exercise[] = []
  hardExercises: Exercise[] = []

  constructor(private exerciseService: ExerciseService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Üben')

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
