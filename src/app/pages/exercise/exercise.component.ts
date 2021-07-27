import {Component, OnInit} from '@angular/core';
import {ExerciseService} from '../../../services/exercise.service'


@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {


  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
  }

}
