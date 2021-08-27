import {Component, EventEmitter, Input, Output} from '@angular/core'

import {Fraction} from 'mathjs'

import {LinearSystemDataCardInput} from './linear-system-data-card-input'
import {LinearSystemDataInit} from '../../common/linear-system-data/linear-system-data-init'
import {LinearSystemDataValues} from '../../common/linear-system-data/linear-system-data-values'
import {LinearSystemData} from './linear-system-data'

@Component({
  selector: 'app-calc-linear-system-data-card',
  templateUrl: './calc-linear-system-data-card.component.html',
  styleUrls: ['./calc-linear-system-data-card.component.css']
})
export class CalcLinearSystemDataCardComponent {

  @Input() data: undefined | LinearSystemDataCardInput

  @Output() dataChange = new EventEmitter<LinearSystemData | null>()

  linearSystemData: undefined | LinearSystemDataValues

  editable = true

  //
  // Event Handlers
  //

  onLinearSystemDataChange(linearSystemData: LinearSystemDataValues): void {
    this.linearSystemData = linearSystemData
  }

  /**
   * Must only be invoked if sure that all input values !== null
   */
  onCalculate(): void {
    const linearSystemData = this.linearSystemData!

    const targetVars = linearSystemData.targetVars as Array<Fraction>
    const constraintVars = linearSystemData.constraintVars as Array<Array<Fraction>>
    const constraintVals = linearSystemData.constraintVals as Array<Fraction>

    this.dataChange.emit({
      targetVars,
      constraintVars,
      constraintVals
    })

    this.editable = false
  }

  onEdit(): void {
    this.dataChange.emit(null)

    this.editable = true
  }

  //
  // Helper
  //

  getLinearSystemData(): LinearSystemDataInit {
    return {
      ...this.data!,

      targetVars: null,
      constraintVars: null,
      constraintVals: null
    }
  }
}
