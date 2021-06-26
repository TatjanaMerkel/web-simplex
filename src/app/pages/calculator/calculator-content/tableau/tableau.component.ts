import {Component, Input} from '@angular/core';
import {TableauData} from "./tableau-data";

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent {

  @Input() data : undefined | TableauData;

}


