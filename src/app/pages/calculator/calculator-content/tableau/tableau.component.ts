import {Component, Input} from '@angular/core';
import {TableauInput} from './tableau-input';
import {Fraction} from "mathjs";

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent {

  @Input() data: TableauInput | undefined;

  formatFraction(fraction: Fraction): string {
    const sign = fraction.s === 1 ? '' : '-';

    return fraction.d === 1
      ? sign + fraction.n
      : sign + fraction.n + '/' + fraction.d;
  }

  getClasses(c: number | null, v: number | null): Array<string> {
    const pivotRow = this.data!.pivotRow;
    const pivotCol = this.data!.pivotCol;

    if (c === pivotRow && v === pivotCol) {
      return ['pivot-row-col'];
    } else if (c === pivotRow) {
      return ['pivot-col'];
    } else if (v === pivotCol) {
      return ['pivot-row'];
    } else {
      return [];
    }
  }
}
