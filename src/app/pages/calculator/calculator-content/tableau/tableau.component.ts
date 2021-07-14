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
      : sign + fraction.d + '/' + fraction.n;
  }



}
