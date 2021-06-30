import {Component, Input} from '@angular/core';
import {StandardFormData} from "../standard-form/standard-form-data";

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent {

  @Input() data: StandardFormData | null = null;

}


