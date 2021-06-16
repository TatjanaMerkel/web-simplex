import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  vars = 3;
  constraints = 2;

  data = {
    constraintVars: [
      [11, 12, 13],
      [21, 22, 23]
    ],
    constraintVals: [10, 20],
    targetVars: [1, 2, 3],
    targetVal: [0]
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
