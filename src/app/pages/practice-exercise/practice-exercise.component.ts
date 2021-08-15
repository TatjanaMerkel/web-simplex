import {Component, OnInit} from '@angular/core';
import {Exercise} from "../../../models/exercise";
import * as math from "mathjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ExerciseService} from "../../../services/exercise.service";
import {HeaderService} from "../../../services/header.service";


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

}
