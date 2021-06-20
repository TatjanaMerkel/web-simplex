import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
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

  onConstraintVarChanged(event: Event, row: number, col: number) {
    this.data.constraintVars[row][col] = +(<HTMLInputElement>event.target).value;
  }
}


