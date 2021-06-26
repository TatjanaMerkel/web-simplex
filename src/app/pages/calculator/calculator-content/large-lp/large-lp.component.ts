import {Component, EventEmitter, Output} from '@angular/core';
import {LargeLpData} from "./large-lp-data";


@Component({
  selector: 'app-large-lp',
  templateUrl: './large-lp.component.html',
  styleUrls: ['./large-lp.component.css']
})
export class LargeLpComponent {

  @Output() dataChange = new EventEmitter<LargeLpData>();

  editable = true;

  currentNumberOfVars = 0;
  currentNumberOfConstraints = 0;

  lastEmittedNumberOfVars = 0;
  lastEmittedNumberOfConstraints = 0;

  emitValues() {
    this.dataChange.emit({
      numberOfVars: this.currentNumberOfVars,
      numberOfConstraints: this.currentNumberOfConstraints
    })

    this.lastEmittedNumberOfVars = this.currentNumberOfVars;
    this.lastEmittedNumberOfConstraints = this.currentNumberOfConstraints;

    this.editable = false;
  }

  enableEditing() {
    this.editable = true;
  }


}
