import {ActivatedRoute, Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {Difficulty} from '../../../models/difficulty'
import {ExerciseService} from '../../../services/exercise.service'
import {Exercise} from '../../../models/exercise'
import {HeaderService} from '../../../services/header.service'
import {LinearSystemDataInit} from '../common/linear-system-data/linear-system-data-init'
import {LinearSystemDataValues} from '../common/linear-system-data/linear-system-data-values'

@Component({
  selector: 'app-admin-edit-exercise',
  templateUrl: './admin-edit-exercise.component.html',
  styleUrls: ['./admin-edit-exercise.component.css']
})
export class AdminEditExerciseComponent implements OnInit {

  initialized = false

  id!: number
  title!: string
  difficulty!: Difficulty
  task!: string
  numberOfVars!: number
  numberOfConstraints!: number
  targetVars!: Array<null | Fraction>
  constraintVars!: Array<Array<null | Fraction>>
  constraintVals!: Array<null | Fraction>

  constructor(private activatedRoute: ActivatedRoute,
              private exerciseService: ExerciseService,
              private headerService: HeaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Aufgabe bearbeiten')

    this.activatedRoute.params.subscribe(params => {
      const exercise_id = Number(params['exercise_id'])

      this.exerciseService.getExercise(exercise_id).subscribe((exercise: Exercise) => {
        const reviver = (math as any).reviver

        this.id = exercise.id
        this.title = exercise.title
        this.difficulty = exercise.difficulty
        this.task = exercise.task
        this.numberOfVars = exercise.numberOfVars
        this.numberOfConstraints = exercise.numberOfConstraints
        this.targetVars = JSON.parse(JSON.stringify(exercise.targetVars), reviver)
        this.constraintVars = JSON.parse(JSON.stringify(exercise.constraintVars), reviver)
        this.constraintVals = JSON.parse(JSON.stringify(exercise.constraintVals), reviver)

        this.initialized = true
      })
    })
  }

  getLinearSystemDataInput(): LinearSystemDataInit {
    return {
      numberOfVars: this.numberOfVars as number,
      numberOfConstraints: this.numberOfConstraints as number,

      targetVars: this.targetVars,
      constraintVars: this.constraintVars,
      constraintVals: this.constraintVals
    }
  }

  submitDelete() {
    this.exerciseService.deleteExercise(this.id!).subscribe(() => {
      this.router.navigate(['/admin/exercises'])
    })
  }

  submitUpdate() {
    if (this.isInputValid()) {
      const exercise: Exercise = {
        id: this.id!,
        title: this.title!,
        difficulty: this.difficulty!,
        task: this.task,
        numberOfVars: this.numberOfVars!,
        numberOfConstraints: this.numberOfConstraints!,
        targetVars: this.targetVars as Array<Fraction>,
        constraintVars: this.constraintVars as Array<Array<Fraction>>,
        constraintVals: this.constraintVals as Array<Fraction>
      }

      this.exerciseService.putExercise(exercise).subscribe(() => {
        this.router.navigate(['/admin/exercises'])
      })
    } else {
      alert('Unvollständige oder fehlerhafte Werte. Bitte überprüfen Sie Ihre Eingabe.')
    }
  }

  storeLinearSystemData(linearSystemDataOutput: LinearSystemDataValues) {
    const {targetVars, constraintVars, constraintVals} = linearSystemDataOutput

    this.targetVars = targetVars as Array<Fraction>
    this.constraintVars = constraintVars as Array<Array<Fraction>>
    this.constraintVals = constraintVals as Array<Fraction>
  }

  isInputValid(): boolean {
    return this.targetVars.every(targetVar => targetVar)
      && this.constraintVars.every(constraintVarsRow => constraintVarsRow.every(constraintVar => constraintVar))
      && this.constraintVals.every(constraintVal => constraintVal && math.largerEq(constraintVal, 0))
  }
}
