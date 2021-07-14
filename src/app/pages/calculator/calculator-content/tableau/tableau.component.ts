import {Component, Input} from '@angular/core';
import {TableauInput} from './tableau-input';


@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent {

  @Input() data: TableauInput | undefined;


}
