import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {Fraction} from 'mathjs'

import {Difficulty} from '../../../models/difficulty'
import {ExerciseService} from '../../../services/exercise.service'
import {Exercise} from '../../../models/exercise'
import {HeaderService} from '../../../services/header.service'
import {LinearSystemDataInput} from '../../components/linear-system-data/linear-system-data-input'
import {LinearSystemDataOutput} from '../../components/linear-system-data/linear-system-data-output'

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

  constructor(private router: Router,
              private exerciseService: ExerciseService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Neue Aufgabe erstellen')
  }

  getLinearSystemDataInput(): LinearSystemDataInput {
    return {
      numberOfVars: this.numberOfVars,
      numberOfConstraints: this.numberOfConstraints,

      targetVars: null,
      constraintVars: null,
      constraintVals: null
    }
  }

  onSubmit() {
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
      alert('Unvollständige oder fehlerhafte Werte. Bitte überprüfen Sie Ihre Eingabe.')
    }
  }

  isInputValid(): boolean {
    if (this.title === '') {
      return false
    }

    if (this.targetVars.indexOf(null) !== -1) {
      return false
    }

    for (let constraintVarsRow of this.constraintVars) {
      if (constraintVarsRow.indexOf(null) !== -1) {
        return false
      }
    }

    if (this.constraintVals.indexOf(null) !== -1) {
      return false
    }

    return true;
  }

  onLinearSystemDataChange(linearSystemDataOutput: LinearSystemDataOutput) {
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
