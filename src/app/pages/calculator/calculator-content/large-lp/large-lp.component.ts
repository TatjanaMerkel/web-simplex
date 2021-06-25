import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-large-lp',
  templateUrl: './large-lp.component.html',
  styleUrls: ['./large-lp.component.css']
})
export class LargeLpComponent {

  @Output() numberOfVarsChange = new EventEmitter<number>();
  @Output() numberOfConstraintsChange = new EventEmitter<number>();
  @Output() showLinearSystem = new EventEmitter<boolean>();

  editable = true;

  currentNumberOfVars = 0;
  currentNumberOfConstraints = 0;

  lastEmittedNumberOfVars = 0;
  lastEmittedNumberOfConstraints = 0;

  emitValues() {
    this.numberOfVarsChange.emit(this.currentNumberOfVars);
    this.numberOfConstraintsChange.emit(this.currentNumberOfConstraints);
    this.showLinearSystem.emit(true);

    this.lastEmittedNumberOfVars = this.currentNumberOfVars;
    this.lastEmittedNumberOfConstraints = this.currentNumberOfConstraints;

    this.editable = false;
  }

  enableEditing() {
    this.editable = true;
  }


}
