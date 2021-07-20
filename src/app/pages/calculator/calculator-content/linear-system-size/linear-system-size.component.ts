import {Component, EventEmitter, Output} from '@angular/core';
import {LinearSystemSizeOutput} from "./linear-system-size-output";


@Component({
  selector: 'app-linear-system-size',
  templateUrl: './linear-system-size.component.html',
  styleUrls: ['./linear-system-size.component.css']
})
export class LinearSystemSize {

  @Output() dataChange = new EventEmitter<LinearSystemSizeOutput | null>()


  editable = true

  numberOfVars = 0
  numberOfConstraints = 0


  emitValues() {
    this.dataChange.emit({
      numberOfVars: this.numberOfVars,
      numberOfConstraints: this.numberOfConstraints

    })
    this.editable = false

  }

  enableEditing() {
    this.dataChange.emit(null)

    this.editable = true
  }


}
