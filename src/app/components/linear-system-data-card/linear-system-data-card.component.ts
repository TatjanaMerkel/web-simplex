import {Component, EventEmitter, Input, Output} from '@angular/core'

import {Fraction} from 'mathjs'

import {LinearSystemDataCardInput} from './linear-system-data-card-input'
import {LinearSystemDataCardOutput} from './linear-system-data-card-output'
import {LinearSystemDataInput} from '../linear-system-data/linear-system-data-input'
import {LinearSystemDataOutput} from '../linear-system-data/linear-system-data-output'

@Component({
  selector: 'app-linear-system-data-card',
  templateUrl: './linear-system-data-card.component.html',
  styleUrls: ['./linear-system-data-card.component.css']
})
export class LinearSystemDataCardComponent {

  @Input() data: undefined | LinearSystemDataCardInput

  @Output() dataChange = new EventEmitter<LinearSystemDataCardOutput | null>()

  linearSystemData: undefined | LinearSystemDataOutput

  editable = true

  //
  // Event Handlers
  //

  onLinearSystemDataChange(linearSystemData: LinearSystemDataOutput): void {
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

  getLinearSystemData(): LinearSystemDataInput {
    return this.data!
  }
}
