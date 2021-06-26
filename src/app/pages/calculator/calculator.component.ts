import {Component, OnInit} from '@angular/core';
import {LargeLpData} from "./calculator-content/large-lp/large-lp-data";
import {LinearSystemData} from "./calculator-content/linear-system/linear-system-data";
import {TableauData} from "./calculator-content/tableau/tableau-data";


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

  linearSystemData: LinearSystemData | null = null;
  tableauData: TableauData | null = null;


  ngOnInit(): void {
  }


  onLargeLpDataChange(largeLpData: LargeLpData) {
    this.numberOfVars = largeLpData.numberOfVars;
    this.numberOfConstraints = largeLpData.numberOfConstraints;
    this.showLinearSystem = true;
  }


  getTableauData(): TableauData {
    return {
      numberOfVars: this.numberOfVars,
      numberOfConstraints: this.numberOfConstraints,
      linearSystemData: this.linearSystemData as LinearSystemData
    }
  }
}
