import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {Difficulty} from '../../../models/difficulty'
import {ExerciseService} from '../../../services/exercise.service'
import {Exercise} from '../../../models/exercise'
import {HeaderService} from '../../../services/header.service'
import {LinearSystemDataInit} from '../common/linear-system-data/linear-system-data-init'
import {LinearSystemDataValues} from '../common/linear-system-data/linear-system-data-values'

@Component({
  selector: 'app-admin-new-exercise',
  templateUrl: './admin-new-exercise.component.html',
  styleUrls: ['./admin-new-exercise.component.css']
})
export class AdminNewExerciseComponent implements OnInit {

  taskPlaceholder =
    'Leer lassen um Rechenaufgabe (erstes Tableau vorgegeben) statt Textaufgabe' +
    ' (erstes Tableau muss anhand von Text bestimmt werden) zu erstellen.'

  title = ''
  difficulty = Difficulty.EASY
  task = ''
  numberOfVars = 2
  numberOfConstraints = 2
  targetVars: Array<null | Fraction> = [null, null]
  constraintVars: Array<Array<null | Fraction>> = [[null, null], [null, null]]
  constraintVals: Array<null | Fraction> = [null, null]

  constructor(private exerciseService: ExerciseService,
              private headerService: HeaderService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Neue Aufgabe erstellen')
  }

  getLinearSystemDataInput(): LinearSystemDataInit {
    return {
      numberOfVars: this.numberOfVars,
      numberOfConstraints: this.numberOfConstraints,

      targetVars: null,
      constraintVars: null,
      constraintVals: null
    }
  }

  submit() {
    if (this.isInputValid()) {
      const exercise: Exercise = {
        id: -1,
        title: this.title,
        difficulty: this.difficulty,
        task: this.task,
        numberOfVars: this.numberOfVars,
        numberOfConstraints: this.numberOfConstraints,
        targetVars: this.targetVars as Array<Fraction>,
        constraintVars: this.constraintVars as Array<Array<Fraction>>,
        constraintVals: this.constraintVals as Array<Fraction>
      }

      this.exerciseService.postExercise(exercise).subscribe(() => {
        this.router.navigate(['/admin/exercises'])
      })
    } else {
      alert('Unvollst??ndige oder fehlerhafte Werte. Bitte ??berpr??fen Sie Ihre Eingabe.')
    }
  }

  isInputValid(): boolean {
    return this.targetVars.every(targetVar => targetVar)
      && this.constraintVars.every(constraintVarsRow => constraintVarsRow.every(constraintVar => constraintVar))
      && this.constraintVals.every(constraintVal => constraintVal && math.largerEq(constraintVal, 0))
  }

  storeLinearSystemData(linearSystemDataOutput: LinearSystemDataValues) {
    const {targetVars, constraintVars, constraintVals, isValid} = linearSystemDataOutput

    if (isValid) {
      this.targetVars = targetVars as Array<Fraction>
      this.constraintVars = constraintVars as Array<Array<Fraction>>
      this.constraintVals = constraintVals as Array<Fraction>
    } else {
      // TODO
    }
  }
}
