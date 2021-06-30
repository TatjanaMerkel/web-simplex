import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {LinearSystemData} from "../linear-system/linear-system-data";
import {StandardFormData} from "./standard-form-data";

@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.css']
})
export class StandardFormComponent implements OnChanges {

  @Input() numberOfVars: number | null = null;
  @Input() numberOfConstraints: number | null = null;
  @Input() linearSystemData: LinearSystemData | null = null;

  @Output() outputDataChange = new EventEmitter<StandardFormData>();

  data: StandardFormData | null = null


  emitValues() {
    this.outputDataChange.emit(this.data as StandardFormData);
    console.log(this.data);
  }

  ngOnChanges(): void {
    if (this.numberOfVars === null || this.numberOfConstraints === null || this.linearSystemData === null) {
      return;
    }

    const oldTargetVars = this.linearSystemData.targetVars;
    const newTargetVars = new Array<number>(this.numberOfConstraints).fill(0);

    this.data = {
      numberOfVars: this.numberOfVars + this.numberOfConstraints,
      numberOfConstraints: this.numberOfConstraints,

      targetVars: oldTargetVars.concat(newTargetVars),
      targetSlackVars: new Array<number>(this.numberOfConstraints).fill(0),
      constraintVars: this.linearSystemData.constraintVars,
      constraintSlackVars: new Array<Array<number>>(this.numberOfConstraints),
      constraintConstants: this.linearSystemData.constraintConstants

    }

    for (let i = 0; i < this.data.constraintSlackVars.length; i++) {
      this.data.constraintSlackVars[i] = new Array<number>(this.numberOfConstraints).fill(0);
      this.data.constraintSlackVars[i][i] = 1;

    }
  }

}
