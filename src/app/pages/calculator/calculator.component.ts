import {Component, OnInit} from '@angular/core';
import {LargeLpData} from "./calculator-content/large-lp/large-lp-data";


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  numberOfVars: number = 0;
  numberOfConstraints: number = 0;

  showLinearSystem: boolean = false;
  showTableau: boolean = false;


  ngOnInit(): void {
  }

  showChangeTableau(value: boolean) {
    this.showTableau = value;
  }

  onLargeLpDataChange(largeLpData: LargeLpData) {
    this.numberOfVars = largeLpData.numberOfVars;
    this.numberOfConstraints = largeLpData.numberOfConstraints;
    this.showLinearSystem = true;
  }


}
