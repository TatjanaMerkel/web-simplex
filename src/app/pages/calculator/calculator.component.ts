import {Component, OnInit} from '@angular/core';
import {LargeLpData} from "./calculator-content/large-lp/large-lp-data";
import {LinearSystemData} from "./calculator-content/linear-system/linear-system-data";


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

  onLinearSystemDataChange(linearSystemData: LinearSystemData) {
    this.showLinearSystem = true;

  }

  onLargeLpDataChange(largeLpData: LargeLpData) {
    this.numberOfVars = largeLpData.numberOfVars;
    this.numberOfConstraints = largeLpData.numberOfConstraints;
    this.showLinearSystem = true;
  }


}
