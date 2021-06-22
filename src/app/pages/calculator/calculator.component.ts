import {Component, OnInit} from '@angular/core';

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

  onChangeNumberOfVars(numberOfVars: number) {
    this.numberOfVars = numberOfVars;
  }

  onChangeNumberOfConstraints(numberOfConstraints: number) {
    this.numberOfConstraints = numberOfConstraints;
  }

}
