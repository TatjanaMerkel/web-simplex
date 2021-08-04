import {Component, Input} from '@angular/core';
import {SolutionInput} from './solution-input';
import {Fraction} from 'mathjs';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent {

  @Input() data: SolutionInput | undefined;

  formatFraction(fraction: Fraction): string {
    if (fraction.n === 0) {
      return '';
    } else if (fraction.n === 1 && fraction.d === 1) {
      return '';
    } else if (fraction.d === 1) {
      return fraction.n + '';
    } else {
      return fraction.n + '/' + fraction.d;
    }
  }
}
