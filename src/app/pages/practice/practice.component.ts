import {Component, OnInit} from '@angular/core'
import {ExerciseService} from '../../../services/exercise.service'
import {Exercise} from '../../../models/exercise'


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})

export class PracticeComponent implements OnInit {

  exercises: undefined | Exercise[]

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe(exercises => {
      this.exercises = exercises
    })
  }
}
