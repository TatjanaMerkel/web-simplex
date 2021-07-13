import {Component, Input} from '@angular/core';
import {NewTableauInput} from './new-tableau-input';


@Component({
  selector: 'app-new-tableau',
  templateUrl: './new-tableau.component.html',
  styleUrls: ['./new-tableau.component.css']
})
export class NewTableauComponent {

  @Input() data: NewTableauInput | undefined;


}
