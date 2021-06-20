import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-size',
  templateUrl: './table-size.component.html',
  styleUrls: ['./table-size.component.css']
})
export class TableSizeComponent implements OnInit {

  data = {
    large_lp: " Größe des Linearen Programms",
    Input_lp: " Eingabe des Linearen Programms"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
