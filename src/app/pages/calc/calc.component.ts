import {Component, OnInit} from '@angular/core'

import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {HeaderService} from '../../../services/header.service'
import {LinearSystemDataCardInput} from '../../components/linear-system-data-card/linear-system-data-card-input'
import {LinearSystemData} from '../../components/linear-system-data-card/linear-system-data'
import {LinearSystemSize} from '../../components/linear-system-size/linear-system-size'
import {SolutionInput} from '../../components/solution/solution-input'
import {StandardFormInput} from '../../components/standard-form/standard-form-input'
import {StandardFormOutput} from '../../components/standard-form/standard-form-output'
import {Simplex, Tableau} from '../../../common/simplex'
import {TableauInput} from '../../components/tableau/tableau-input'

@Component({
  selector: 'app-calculator',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  linearSystemSizeOutput: LinearSystemSize | null = null
  linearSystemDataCardOutput: LinearSystemData | null = null


  tableaus: Tableau[] | null = null
  showTableaus = false

  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Rechnen')
  }

  //
  // Data Change Listeners
  //

  onLinearSystemSizeChange(linearSystemSize: LinearSystemSize | null): void {
    if (linearSystemSize !== null) {
      this.linearSystemSizeOutput = linearSystemSize
    } else {
      this.linearSystemSizeOutput = null
      this.linearSystemDataCardOutput = null
      this.tableaus = null
      this.showTableaus = false
    }
  }

  onLinearSystemDataChange(linearSystemDataCardOutput: LinearSystemData | null): void {
    if (linearSystemDataCardOutput !== null) {
      this.linearSystemDataCardOutput = linearSystemDataCardOutput
    } else {
      this.linearSystemDataCardOutput = null
      this.tableaus = null
      this.showTableaus = false
    }

    if (linearSystemDataCardOutput) {
      this.tableaus = Simplex.calcTableaus(this.linearSystemSizeOutput!, this.linearSystemDataCardOutput!)
    }
  }

  //
  // Input Data Getters
  //

  /**
   * Must only be called when linear-system-size output is available.
   */
  getLinearSystemDataCardInput(): LinearSystemDataCardInput {
    const linearSystemSizeOutput = this.linearSystemSizeOutput!

    return {
      numberOfVars: linearSystemSizeOutput.numberOfVars,
      numberOfConstraints: linearSystemSizeOutput.numberOfConstraints
    }
  }

  /**
   * Must only be called when linear-system-size output and
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

  /**
   * Must only be called when tableau data has been calculated.
   */
  getSolutionInput(): SolutionInput {
    const tableauData = this.tableaus!

    const lastTableau = tableauData[tableauData.length - 1]

    return {
      targetVal: lastTableau.targetVal
    }
  }

  //
  // Mock Data
  //

  getLinearSystemDataCardInputMock(): LinearSystemDataCardInput {
    return {
      numberOfVars: 2,
      numberOfConstraints: 3
    }
  }

  getStandardFormInputMock() {
    return {
      numberOfVars: 2,
      numberOfConstraints: 3,

      targetVars: [
        math.fraction('1.1'),
        math.fraction('2/3')
      ] as Fraction[],

      constraintVars: [
        [math.fraction('-4/5'), math.fraction('1')],
        [math.fraction('7'), math.fraction('-8')],
        [math.fraction('9.9'), math.fraction('-1.3')],
      ] as Fraction[][],

      constraintVals: [
        math.fraction('1/8'),
        math.fraction('2/9'),
        math.fraction('30/31')
      ] as Fraction[]
    }
  }

  standardFormOutputMock: StandardFormOutput = {
    numberOfVars: 5,
    numberOfConstraints: 3,

    targetVars: [
      math.fraction('-5'),
      math.fraction('-2'),
      math.fraction(0),
      math.fraction(0),
      math.fraction(0)
    ] as Fraction[],

    targetVal: math.fraction(0) as Fraction,

    constraintVars: [
      [
        math.fraction('-3'),
        math.fraction('4'),
        math.fraction(1),
        math.fraction(0),
        math.fraction(0)
      ],
      [
        math.fraction('6'),
        math.fraction('-7'),
        math.fraction(0),
        math.fraction(1),
        math.fraction(0)
      ],
      [
        math.fraction('9'),
        math.fraction('10'),
        math.fraction(0),
        math.fraction(0),
        math.fraction(1)
      ],
    ] as Fraction[][],

    constraintVals: [
      math.fraction('5'),
      math.fraction('8'),
      math.fraction('11')
    ] as Fraction[],

    slackVars: [1, 2, 3]
  }

  getSolutionInputMock(): SolutionInput {
    return {
      targetVal: math.fraction(42) as Fraction
    }
  }

  onStandardFormClick() {
    this.showTableaus = true
  }
}
