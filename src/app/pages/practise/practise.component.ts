import {Component, OnInit} from '@angular/core'
import {ExerciseService} from '../../../services/exercise.service'

@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.css']
})
export class PractiseComponent implements OnInit {

  exercises = this.exerciseService.getExercises()

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
  }
}
