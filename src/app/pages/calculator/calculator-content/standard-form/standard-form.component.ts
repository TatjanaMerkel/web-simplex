import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StandardFormInput} from './standard-form-input';
import {StandardFormOutput} from './standard-form-output';
import {Fraction} from 'mathjs';

@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.css']
})

export class StandardFormComponent {

  @Input() data!: StandardFormInput

  @Output() click = new EventEmitter<void>()


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

  formatVariable(fraction: Fraction, variable: number): string {
    return fraction.n === 0 ? '' : 'x' + '<sub>' + variable + '</sub>';
  }

  formatSign(fraction: Fraction): string {
    return fraction.s === 1 ? '' : '-';
  }

  formatOperator(fraction: Fraction): string {
    if (fraction.n === 0) {
      return '';
    } else if (fraction.s === 1) {
      return '+';
    } else {
      return '-';
    }
  }
}
