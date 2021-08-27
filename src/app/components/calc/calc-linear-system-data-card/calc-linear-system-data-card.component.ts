import {Component, EventEmitter, Input, Output} from '@angular/core'

import {Fraction} from 'mathjs'

import {LinearSystemDataCardInput} from './linear-system-data-card-input'
import {LinearSystemDataInit} from '../../common/linear-system-data/linear-system-data-init'
import {LinearSystemDataValues} from '../../common/linear-system-data/linear-system-data-values'
import {LinearSystemData} from './linear-system-data'

@Component({
  selector: 'app-calc-linear-system-data-card[data]',
  templateUrl: './calc-linear-system-data-card.component.html',
  styleUrls: ['./calc-linear-system-data-card.component.css']
})
export class CalcLinearSystemDataCardComponent {

  @Input() data!: LinearSystemDataCardInput

  @Output() dataChange = new EventEmitter<LinearSystemData | null>()

  linearSystemData: undefined | LinearSystemDataValues

  editable = true

  /**
   * Must only be invoked if sure that all input values !== null
   */
  emitInput(): void {
    const linearSystemData = this.linearSystemData!

    const targetVars = linearSystemData.targetVars as Array<Fraction>
    const constraintVars = linearSystemData.constraintVars as Array<Array<Fraction>>
    const constraintVals = linearSystemData.constraintVals as Array<Fraction>

    this.dataChange.emit({targetVars, constraintVars, constraintVals})

    this.editable = false
  }

  startEditing(): void {
    this.dataChange.emit(null)

    this.editable = true
  }

  getLinearSystemData(): LinearSystemDataInit {
    return {
      ...this.data!,

      targetVars: null,
      constraintVars: null,
      constraintVals: null
    }
  }
}
