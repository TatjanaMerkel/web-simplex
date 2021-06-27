import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {TableauData} from "../tableau/tableau-data";

@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.css']
})
export class StandardFormComponent implements OnChanges {

  @Input() inputData: TableauData | null = null;

  @Output() outputDataChange = new EventEmitter<TableauData>();

  outputData: TableauData | null = null;


  emitValues() {
    this.outputDataChange.emit(this.outputData as TableauData)
  }

  ngOnChanges(): void {
    const inputData = this.inputData!;

    const oldTargetVars = inputData.linearSystemData.targetVars;
    const newTargetVars = new Array<number>(inputData.numberOfConstraints).fill(0);

    this.outputData = {
      numberOfVars: inputData.numberOfVars + inputData.numberOfConstraints,
      numberOfConstraints: inputData.numberOfConstraints,

      linearSystemData: {
        targetVars: oldTargetVars.concat(newTargetVars),
        constraintVars: new Array<Array<number>>(inputData.numberOfConstraints),
        constraintConstants: inputData.linearSystemData.constraintConstants
      }
    }

    for (let i = 0; i < inputData.linearSystemData.constraintVars.length; i++) {
      const oldConstraintVarsLine = inputData.linearSystemData.constraintVars[i];
      const newConstraintVarsLine = new Array<number>(inputData.numberOfConstraints).fill(0);

      newConstraintVarsLine[i] = 1;

      this.outputData.linearSystemData.constraintVars[i] =
        oldConstraintVarsLine.concat(newConstraintVarsLine);
    }
  }

}
