import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableauData} from "../tableau/tableau-data";

@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.css']
})
export class StandardFormComponent {

  @Input() inputData: TableauData | null = null;

  @Output() outputDataChange = new EventEmitter<TableauData>();

  outputData: TableauData | null = null;


  emitValues() {
    this.outputDataChange.emit(this.outputData as TableauData)
  }
}
