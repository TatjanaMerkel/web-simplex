import {Component, OnInit} from '@angular/core';
import {LargeLpData} from "./calculator-content/large-lp/large-lp-data";
import {LinearSystemData} from "./calculator-content/linear-system/linear-system-data";
import {TableauData} from "./calculator-content/tableau/tableau-data";
import {StandardFormData} from "./calculator-content/standard-form/standard-form-data";



@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  numberOfVars: number = 0;
  numberOfConstraints: number = 0;

  showLinearSystem: boolean = false;

  linearSystemData: LinearSystemData | null = null;
  standardFormData: StandardFormData | null = null;

  targetVars: number[] | undefined;
  targetSlackVars: number[] | undefined;
  targetConstant: number | undefined;

  constraintVars: number[][] | undefined;
  constraintSlackVars: number[][] | undefined;
  constraintConstants: number[] | undefined;

  showSolution = false;


  ngOnInit(): void {
  }


  onLargeLpDataChange(largeLpData: LargeLpData) {
    this.numberOfVars = largeLpData.numberOfVars;
    this.numberOfConstraints = largeLpData.numberOfConstraints;
    this.showLinearSystem = true;
  }

  negateTargetVars(data: LinearSystemData): LinearSystemData {
    return {
      targetVars: data.targetVars.map(x => -x),
      constraintVars: data.constraintVars,
      constraintConstants: data.constraintConstants
    }
  }


  onStandardFormDataChange(standardFormData: StandardFormData) {
    this.standardFormData = standardFormData;

    this.targetVars = standardFormData.targetVars;
    this.targetSlackVars = standardFormData.targetSlackVars;
    this.targetConstant = 0;

    this.constraintVars = standardFormData.constraintVars;
    this.constraintSlackVars = standardFormData.constraintSlackVars;
    this.constraintConstants = standardFormData.constraintConstants;

    const allTargetVarsPositive = this.targetVars.reduce((old, next) => old && next >= 0, true);
    console.log(this.targetVars);
    console.log(allTargetVarsPositive);

    if (allTargetVarsPositive) {
      this.showSolution = true;
    }
  }



}
