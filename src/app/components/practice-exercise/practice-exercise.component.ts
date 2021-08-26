import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

import * as math from 'mathjs'

import {ExerciseService} from '../../../services/exercise.service'
import {Exercise} from '../../../models/exercise'
import {HeaderService} from '../../../services/header.service'
import {PracticeLinearSystemDataCardExpected} from '../practice-linear-system-data-card/practice-linear-system-data-card-expected'
import {PracticeLinearSystemSizeCardExpected} from '../practice-linear-system-size-card/practice-linear-system-size-card-expected'
import {PracticeStandardFormCardExpected} from '../practice-standard-form-card/practice-standard-form-card-expected'
import {StandardFormInput} from '../standard-form/standard-form-input'
import {Simplex, Tableau} from '../../../common/simplex'
import ExpectedTableau from "../practice-tableaus-card/expected-tableau";
import {ExpectedSolution} from "../practice-solution-card/expected-solution";
import {Fraction} from "mathjs";

@Component({
  selector: 'app-practice-exercise',
  templateUrl: './practice-exercise.component.html',
  styleUrls: ['./practice-exercise.component.css']
})
export class PracticeExerciseComponent implements OnInit {

  exercise: undefined | Exercise

  linearSystemSizeCorrect = false
  linearSystemDataCorrect = false
  standardFormCorrect = false
  tableausCorrect = false
  solutionCorrect = false

  tableaus!: Tableau[]

  get expectedLinearSystemSize(): PracticeLinearSystemSizeCardExpected {
    const exercise = this.exercise!

    return {
      numberOfVars: exercise.numberOfVars,
      numberOfConstraints: exercise.numberOfConstraints
    }
  }

  get expectedLinearSystemData(): PracticeLinearSystemDataCardExpected {
    const exercise = this.exercise!

    return {
      numberOfVars: exercise.numberOfVars,
      numberOfConstraints: exercise.numberOfConstraints,
      targetVars: exercise.targetVars,
      constraintVars: exercise.constraintVars,
      constraintVals: exercise.constraintVals
    }
  }

  get expectedStandardForm(): PracticeStandardFormCardExpected {
    const exercise = this.exercise!

    return {
      numberOfVars: exercise.numberOfVars,
      numberOfConstraints: exercise.numberOfConstraints,
      targetVars: exercise.targetVars,
      constraintVars: exercise.constraintVars,
      constraintVals: exercise.constraintVals
    }
  }

  get expectedTableaus(): ExpectedTableau[] {
    const exercise = this.exercise!

    if (!this.tableaus) {
      return []
    }

    return this.tableaus.map((tableau: Tableau) => {
      return {
        numberOfVars: exercise.numberOfVars,
        numberOfConstraints: exercise.numberOfConstraints,
        targetVars: tableau.targetVars,
        targetVal: tableau.targetVal,
        constraintVars: tableau.constraintVars,
        constraintVals: tableau.constraintVals,
        thetas: tableau.thetas
      }
    })
  }

  get expectedSolution(): ExpectedSolution {
    console.log('test')
    console.log(this.tableaus)
    const lastTableau = this.tableaus[this.tableaus.length - 1]

    const solutionVars = new Array<Fraction>(lastTableau.targetVars.length).fill(math.fraction(0) as Fraction)

    return {
      solutionVal: lastTableau.targetVal,
      solutionVars: solutionVars
    }
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService,
              private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Üben')

    this.route.params.subscribe(params => {
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
