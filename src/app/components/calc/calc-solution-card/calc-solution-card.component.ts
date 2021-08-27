import {Component, Input} from '@angular/core'

import {Fraction} from 'mathjs'

import {SolutionInput} from './solution-input'

@Component({
  selector: 'app-calc-solution-card',
  templateUrl: './calc-solution-card.component.html',
  styleUrls: ['./calc-solution-card.component.css']
})
export class CalcSolutionCardComponent {

  @Input() data: SolutionInput | undefined

  formatFraction(fraction: Fraction): string {
    if (fraction.n === 0) {
      return ''
    } else if (fraction.n === 1 && fraction.d === 1) {
      return ''
    } else if (fraction.d === 1) {
      return fraction.n + ''
    } else {
      return fraction.n + '/' + fraction.d
    }
  }
}
