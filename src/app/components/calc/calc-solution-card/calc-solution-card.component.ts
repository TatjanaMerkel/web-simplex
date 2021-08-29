import {Component, Input} from '@angular/core'

import {CalcSolutionCardInput} from './calc-solution-card-input'
import {formatFraction} from '../../../../common/fractions'

@Component({
  selector: 'app-calc-solution-card[input]',
  templateUrl: './calc-solution-card.component.html',
  styleUrls: ['./calc-solution-card.component.css']
})
export class CalcSolutionCardComponent {

  @Input() input!: CalcSolutionCardInput

  formatFraction = formatFraction

  trackByIndex(index: number): number {
    return index
  }
}
