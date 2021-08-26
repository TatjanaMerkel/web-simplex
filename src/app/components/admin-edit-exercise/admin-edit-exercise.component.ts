import {ActivatedRoute, Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {Difficulty} from '../../../models/difficulty'
import {Exercise} from '../../../models/exercise'
import {ExerciseService} from '../../../services/exercise.service'
import {LinearSystemDataInit} from '../linear-system-data/linear-system-data-init'
import {LinearSystemDataValues} from '../linear-system-data/linear-system-data-values'
import {HeaderService} from '../../../services/header.service'

@Component({
  selector: 'app-admin-edit-exercise',
  templateUrl: './admin-edit-exercise.component.html',
  styleUrls: ['./admin-edit-exercise.component.css']
})
export class AdminEditExerciseComponent implements OnInit {

  taskPlaceholder =
    'Leer lassen um Rechenaufgabe (erstes Tableau vorgegeben) statt Textaufgabe' +
    ' (erstes Tableau muss anhand von Text bestimmt werden) zu erstellen.'

  id: null | number = null
  title: null | string = null
  difficulty: null | Difficulty = null
  task: null | string = null
  numberOfVars: null | number = null
  numberOfConstraints: null | number = null
  targetVars: null | Array<null | Fraction> = null
  constraintVars: null | Array<Array<null | Fraction>> = null
  constraintVals: null | Array<null | Fraction> = null

  constructor(private route: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Aufgabe bearbeiten')

    this.route.params.subscribe(params => {
      const exercise_id = Number(params['exercise_id'])

      this.exerciseService.getExercise(exercise_id).subscribe((exerciseData: Exercise) => {
        const reviver = (math as any).reviver

        this.id = exerciseData.id
        this.title = exerciseData.title
        this.difficulty = exerciseData.difficulty
        this.task = exerciseData.task
        this.numberOfVars = exerciseData.numberOfVars
        this.numberOfConstraints = exerciseData.numberOfConstraints
        this.targetVars = JSON.parse(JSON.stringify(exerciseData.targetVars), reviver)
        this.constraintVars = JSON.parse(JSON.stringify(exerciseData.constraintVars), reviver)
        this.constraintVals = JSON.parse(JSON.stringify(exerciseData.constraintVals), reviver)
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

  onSubmit() {
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

  onLinearSystemDataChange(linearSystemDataOutput: LinearSystemDataValues) {
    const {targetVars, constraintVars, constraintVals} = linearSystemDataOutput

    this.targetVars = targetVars as Array<Fraction>
    this.constraintVars = constraintVars as Array<Array<Fraction>>
    this.constraintVals = constraintVals as Array<Fraction>
  }

  isInputValid(): boolean {
    if (!this.title || this.title === '') {
      return false
    }

    if (!this.targetVars || this.targetVars.indexOf(null) !== -1) {
      return false
    }

    if (!this.constraintVars) {
      return false
    }

    for (let constraintVarsRow of this.constraintVars) {
      if (constraintVarsRow.indexOf(null) !== -1) {
        return false
      }
    }

    return !(!this.constraintVals || this.constraintVals.indexOf(null) !== -1)
  }
}
