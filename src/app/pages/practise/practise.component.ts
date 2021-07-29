import {Component, OnInit} from '@angular/core'
import {ExerciseService} from '../../../services/exercise.service'
import {Exercise} from '../../../models/exercise'


@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.css']
})

export class PractiseComponent implements OnInit {

  exercises: undefined | Exercise[]

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe(exercises => {
      this.exercises = exercises
    })
  }
}
