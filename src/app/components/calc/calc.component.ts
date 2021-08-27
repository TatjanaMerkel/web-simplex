import {Component, OnInit} from '@angular/core'

import {HeaderService} from '../../../services/header.service'
import {LinearSystemDataCardInput} from './calc-linear-system-data-card/linear-system-data-card-input'
import {LinearSystemData} from './calc-linear-system-data-card/linear-system-data'
import {LinearSystemSize} from './calc-linear-system-size-card/linear-system-size'
import {Simplex, Tableau} from '../../../common/simplex'
import {SolutionInput} from './calc-solution-card/solution-input'
import {StandardFormInput} from './calc-standard-form-card/standard-form-input'
import {TableauInput} from './calc-tableau-card/tableau-input'

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

  setLinearSystemSize(linearSystemSize: LinearSystemSize | null): void {
    if (linearSystemSize !== null) {
      this.linearSystemSizeOutput = linearSystemSize
    } else {
      this.linearSystemSizeOutput = null
      this.linearSystemDataCardOutput = null
      this.tableaus = null
      this.showTableaus = false
    }
  }

  setLinearSystemData(linearSystemDataCardOutput: LinearSystemData | null): void {
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

  /**
   * Must only be called when calc-linear-system-size-card output is available.
   */
  getLinearSystemDataCardInput(): LinearSystemDataCardInput {
    const linearSystemSizeOutput = this.linearSystemSizeOutput!

    return {
      numberOfVars: linearSystemSizeOutput.numberOfVars,
      numberOfConstraints: linearSystemSizeOutput.numberOfConstraints
    }
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
}
