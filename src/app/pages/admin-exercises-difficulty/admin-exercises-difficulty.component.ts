import {Component, OnInit} from '@angular/core'

import {Router, ActivatedRoute, ParamMap} from '@angular/router'
import {Difficulty} from '../../../models/difficulty'
import {Exercise} from '../../../models/exercise'
import {ExerciseService} from '../../../services/exercise.service'


@Component({
  selector: 'app-admin-exercises-difficulty',
  templateUrl: './admin-exercises-difficulty.component.html',
  styleUrls: ['./admin-exercises-difficulty.component.css']
})
export class AdminExercisesDifficultyComponent implements OnInit {

  difficulty: undefined | Difficulty
  exercises: undefined | Exercise[]

  constructor(private route: ActivatedRoute,
              private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      switch (params['difficulty']) {
        case 'easy':
          this.difficulty = Difficulty.EASY;
          break;

        case 'medium':
          this.difficulty = Difficulty.MEDIUM;
          break;

        case 'hard':
          this.difficulty = Difficulty.HARD;
          break;
      }

      this.exerciseService.getExercises().subscribe(exercises => {
        this.exercises = exercises.filter(exercise => exercise.difficulty === this.difficulty)
      })
    })
  }

}
