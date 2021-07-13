import {Component, EventEmitter, Output} from '@angular/core';
import {LinearSystemSizeOutput} from "./linear-system-size-output";


@Component({
  selector: 'app-linear-system-size',
  templateUrl: './linear-system-size.component.html',
  styleUrls: ['./linear-system-size.component.css']
})
export class LinearSystemSize {

  @Output() change = new EventEmitter<LinearSystemSizeOutput>();

  editable = true;

  currentNumberOfVars = 0;
  currentNumberOfConstraints = 0;

  lastEmittedNumberOfVars = 0;
  lastEmittedNumberOfConstraints = 0;

  emitValues() {
    this.change.emit({
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
