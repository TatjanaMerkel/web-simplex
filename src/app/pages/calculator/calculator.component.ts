import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  rows = [1, 2];
  cols = [1, 2, 3];

  constructor() {
  }

  ngOnInit(): void {
  }
}
