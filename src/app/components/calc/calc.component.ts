import {Component, OnInit} from '@angular/core'

import {CalcLinearSystemDataCardInput} from './calc-linear-system-data-card/calc-linear-system-data-card-input'
import {CalcLinearSystemDataCardOutput} from './calc-linear-system-data-card/calc-linear-system-data-card-output'
import {CalcLinearSystemSizeCardOutput} from './calc-linear-system-size-card/calc-linear-system-size-card-output'
import {CalcSolutionCardInput} from './calc-solution-card/calc-solution-card-input'
import {Fraction} from 'mathjs'
import {HeaderService} from '../../../services/header.service'
import {getSolution, Simplex, Tableau} from '../../../common/simplex'
import {StandardFormInput} from './calc-standard-form-card/standard-form-input'
import {TableauInput} from './calc-tableau-card/tableau-input'

@Component({
  selector: 'app-calculator',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  linearSystemSizeOutput: CalcLinearSystemSizeCardOutput | null = null

  linearSystemDataInitialized = false
  targetVars!: null | Fraction[]
  constraintVars!: null | Fraction[][]
  constraintVals!: null | Fraction[]

  tableaus: Tableau[] | null = null
  showTableaus = false

  solutionVal: undefined | Fraction
  solutionVars: undefined | Fraction[]

  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Rechnen')
  }

  setLinearSystemSize(linearSystemSize: CalcLinearSystemSizeCardOutput | null): void {
    if (linearSystemSize !== null) {
      this.linearSystemSizeOutput = linearSystemSize
    } else {
      this.linearSystemSizeOutput = null

      this.targetVars = null
      this.constraintVars = null
      this.constraintVals = null

      this.tableaus = null
      this.showTableaus = false
    }
  }

  setLinearSystemData(data: CalcLinearSystemDataCardOutput | null): void {
    this.tableaus = null
    this.showTableaus = false

    this.targetVars = null
    this.constraintVars = null
    this.constraintVals = null

    this.linearSystemDataInitialized = false

    if (data) {
      const {targetVars, constraintVars, constraintVals} = data

      this.targetVars = targetVars
      this.constraintVars = constraintVars
      this.constraintVals = constraintVals

      this.linearSystemDataInitialized = true

      this.tableaus = Simplex.calcTableaus(this.linearSystemSizeOutput!,
        {targetVars, constraintVars, constraintVals})

      const {solutionVal, solutionVars} = getSolution(this.tableaus[this.tableaus.length - 1])

      this.solutionVal = solutionVal
      this.solutionVars = solutionVars

      this.showTableaus = true
    }
  }

  get linearSystemDataCardInput(): CalcLinearSystemDataCardInput {
    const linearSystemSizeOutput = this.linearSystemSizeOutput!

    const {numberOfVars, numberOfConstraints} = linearSystemSizeOutput

    return {numberOfVars, numberOfConstraints}
  }

  /**
   * Must only be called when calc-linear-system-size-card output and
   * linear-system-data output is available.
   */
  getStandardFormInput(): StandardFormInput {
    const linearSystemSizeOutput = this.linearSystemSizeOutput!

    const firstTableau = this.tableaus![0]

    return {
      numberOfVars: linearSystemSizeOutput.numberOfVars,
      numberOfConstraints: linearSystemSizeOutput.numberOfConstraints,

      targetVars: firstTableau.targetVars,

      constraintVars: firstTableau.constraintVars,
      constraintVals: firstTableau.constraintVals,

      slackVars: firstTableau.slackVars
    }
  }

  getTableauInput(tableau: Tableau): TableauInput {
    const linearSystemSizeOutput = this.linearSystemSizeOutput!

    const numberOfVars = linearSystemSizeOutput.numberOfVars
    const numberOfConstraints = linearSystemSizeOutput.numberOfConstraints

    return {
      numberOfVars: numberOfVars + numberOfConstraints,
      numberOfConstraints: numberOfConstraints,

      ...tableau
    }
  }

  getSolutionInput(): CalcSolutionCardInput {
    return {
      solutionVal: this.solutionVal as Fraction,
      solutionVars: this.solutionVars as Fraction[]
    }
  }
}
