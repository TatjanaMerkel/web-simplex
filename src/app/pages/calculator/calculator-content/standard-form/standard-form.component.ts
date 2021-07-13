import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {StandardFormData} from "./standard-form-data";

@Component({
  selector: 'app-standard-form',
  templateUrl: './standard-form.component.html',
  styleUrls: ['./standard-form.component.css']
})
export class StandardFormComponent implements OnChanges {

  @Input() numberOfVars: number | null = null;
  @Input() numberOfConstraints: number | null = null;
  @Input() linearSystemData: any | null = null;

  @Output() dataChange = new EventEmitter<StandardFormData>();

  data: StandardFormData | null = null

  /**
   *  BV | x1 x2 | b       BV | x1 x2 x3 x4 x5 | b      BV | x1 x2 x3 x4 x5 |  b
   *  ---+-------+---      ---+----------------+---     ---+----------------+----
   *  x3 |  1  2 | 3       x3 |  1  2  1  0  0 | 3      x3 | cv cv cv cs cs | cc
   *  x4 |  4  5 | 6  -->  x4 |  4  5  0  1  0 | 6  ==  x4 | cv cv cv cs cs | cc
   *  x5 |  7  8 | 9       x5 |  7  8  0  0  1 | 9      x5 | cv cv cv cs cs | cc
   *  ---+-------+---      ---+----------------+---     ---+----------------+----
   *   z | 10 11 | 0        z | 10 11  0  0  0 | 0       z | tv tv ts ts ts |  0
   */
  ngOnChanges(): void {
    if (this.numberOfVars === null || this.numberOfConstraints === null || this.linearSystemData === null) {
      return;
    }

    this.data = {
      numberOfVars: this.numberOfVars,
      numberOfConstraints: this.numberOfConstraints,

      targetVars: this.linearSystemData.targetVars,                                // tv
      targetSlackVars: new Array<number>(this.numberOfConstraints).fill(0),   // ts
      constraintVars: this.linearSystemData.constraintVars,                         // cv
      constraintSlackVars: new Array<Array<number>>(this.numberOfConstraints),      // cs
      constraintConstants: this.linearSystemData.constraintConstants                // cc

    }

    // Fill constraintSlackVars (cs)
    for (let i = 0; i < this.data.constraintSlackVars.length; i++) {
      this.data.constraintSlackVars[i] = new Array<number>(this.numberOfConstraints).fill(0);
      this.data.constraintSlackVars[i][i] = 1;

    }

  }

  emitValues() {
    this.dataChange.emit(this.data as StandardFormData);
  }

}
