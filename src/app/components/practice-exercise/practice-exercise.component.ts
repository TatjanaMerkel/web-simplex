import {ActivatedRoute} from '@angular/router'
import {Component, OnInit} from '@angular/core'

import * as math from 'mathjs'

import ExpectedTableau from './practice-tableaus-card/expected-tableau'
import {ExerciseService} from '../../../services/exercise.service'
import {Exercise} from '../../../models/exercise'
import {ExpectedSolution} from './practice-solution-card/expected-solution'
import {Fraction} from 'mathjs'
import {HeaderService} from '../../../services/header.service'
import {ExpectedLinearSystemData} from './practice-linear-system-data-card/expected-linear-system-data'
import {ExpectedLinearSystemSize} from './practice-linear-system-size-card/expected-linear-system-size'
import {ExpectedStandardForm} from './practice-standard-form-card/expected-standard-form'
import {getSolution, Simplex, Tableau} from '../../../common/simplex'
import {StandardFormInput} from '../calc/calc-standard-form-card/standard-form-input'

@Component({
  selector: 'app-practice-exercise',
  templateUrl: './practice-exercise.component.html',
  styleUrls: ['./practice-exercise.component.css']
})
export class PracticeExerciseComponent implements OnInit {

  initialized = false

  exercise: undefined | Exercise

  linearSystemSizeCorrect = false
  linearSystemDataCorrect = false
  standardFormCorrect = false
  tableausCorrect = false
  solutionCorrect = false

  tableaus!: Tableau[]

  solutionVal!: Fraction
  solutionVars!: Fraction[]

  get expectedLinearSystemSize(): ExpectedLinearSystemSize {
    const exercise = this.exercise!

    const {numberOfVars, numberOfConstraints} = exercise

    return {numberOfVars, numberOfConstraints}
  }

  get expectedLinearSystemData(): ExpectedLinearSystemData {
    const exercise = this.exercise!

    const {numberOfVars, numberOfConstraints, targetVars, constraintVars, constraintVals} = exercise

    return {numberOfVars, numberOfConstraints, targetVars, constraintVars, constraintVals}
  }

  get expectedStandardForm(): ExpectedStandardForm {
    const exercise = this.exercise!

    const {numberOfVars, numberOfConstraints, targetVars, constraintVars, constraintVals} = exercise

    return {
      numberOfVars,
      numberOfConstraints,
      targetVars: targetVars.map(targetVar => math.multiply(targetVar, -1)) as Fraction[],
      constraintVars,
      constraintVals
    }
  }

  get expectedTableaus(): ExpectedTableau[] {
    const exercise = this.exercise!

    if (!this.tableaus) {
      return []
    }

    return this.tableaus.map((tableau: Tableau) => {
      const {numberOfVars, numberOfConstraints} = exercise
      const {targetVars, targetVal, constraintVars, constraintVals, thetas, slackVars} = tableau

      return {
        numberOfVars, numberOfConstraints, targetVars, targetVal, constraintVars, constraintVals, thetas, slackVars
      }
    })
  }

  get expectedSolution(): ExpectedSolution {
    return {
      solutionVal: this.solutionVal,
      solutionVars: this.solutionVars
    }
  }

  constructor(private activatedRoute: ActivatedRoute,
              private exerciseService: ExerciseService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Üben')

    this.activatedRoute.params.subscribe(params => {
      const exercise_id = Number(params['exercise_id'])

      this.exerciseService.getExercise(exercise_id).subscribe((exercise: Exercise) => {
        const reviver = (math as any).reviver

        this.exercise = {
          ...exercise,
          targetVars: JSON.parse(JSON.stringify(exercise.targetVars), reviver),
          constraintVars: JSON.parse(JSON.stringify(exercise.constraintVars), reviver),
          constraintVals: JSON.parse(JSON.stringify(exercise.constraintVals), reviver)
        }

        const {numberOfVars, numberOfConstraints, targetVars, constraintVars, constraintVals} = this.exercise

        this.tableaus = Simplex.calcTableaus(
          {numberOfVars, numberOfConstraints},
          {targetVars, constraintVars, constraintVals})

        const {solutionVal, solutionVars} = getSolution(this.tableaus[this.tableaus.length - 1])

        this.solutionVal = solutionVal
        this.solutionVars = solutionVars

        this.initialized = true
      })
    })
  }

  getStandardFormInput(): StandardFormInput {
    return {
      numberOfVars: this.exercise!.numberOfVars,
      numberOfConstraints: this.exercise!.numberOfConstraints,

      targetVars: this.exercise!.targetVars,

      constraintVars: this.exercise!.constraintVars,
      constraintVals: this.exercise!.constraintVals,

      slackVars: []
    }
  }
}
