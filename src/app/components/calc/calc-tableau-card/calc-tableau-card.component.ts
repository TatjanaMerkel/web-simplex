import {Component, Input} from '@angular/core'

import {Fraction} from 'mathjs'

import {TableauInput} from './tableau-input'

@Component({
  selector: 'app-calc-tableau-card',
  templateUrl: './calc-tableau-card.component.html',
  styleUrls: ['./calc-tableau-card.component.css']
})
export class CalcTableauCardComponent {

  @Input() data: TableauInput | undefined

  formatFraction(fraction: Fraction): string {
    const sign = fraction.s === 1 ? '' : '-'

    return fraction.d === 1
      ? sign + fraction.n
      : sign + fraction.n + '/' + fraction.d
  }

  getClasses(c: number | null, v: number | null): Array<string> {
    const pivotRow = this.data!.pivotRow
    const pivotCol = this.data!.pivotCol

    if (pivotRow === null && pivotCol === null) {
      return []
    }

    if (c === pivotRow && v === pivotCol) {
      return ['pivot-row-col']
    } else if (c === pivotRow) {
      return ['pivot-col']
    } else if (v === pivotCol) {
      return ['pivot-row']
    } else {
      return []
    }
  }
}
