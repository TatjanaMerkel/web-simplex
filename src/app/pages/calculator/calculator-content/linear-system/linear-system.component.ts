import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-linear-system',
  templateUrl: './linear-system.component.html',
  styleUrls: ['./linear-system.component.css']
})
export class LinearSystemComponent implements OnInit, OnChanges {


  @Input() numberOfVars = -1; // Number of variables
  @Input() numberOfConstraints = -1; // Number of constraints

  @Output() targetVarsEmitter = new EventEmitter<number[]>();
  @Output() constraintVarsEmitter = new EventEmitter<number[][]>();
  @Output() constraintConstantsEmitter = new EventEmitter<number[]>();

  @Output() buttonClick = new EventEmitter<void>();

  @Output() showTableau = new EventEmitter<boolean>();

  targetVars: number[] = []
  constraintVars: number[][] = []
  constraintConstants: number[] = []

  initialized = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.targetVars = new Array<number>(this.numberOfVars);

    this.constraintVars = new Array<Array<number>>(this.numberOfConstraints);
    for (let i = 0; i < this.constraintVars.length; i++) {
      this.constraintVars[i] = new Array<number>(this.numberOfVars);
    }

    this.constraintConstants = new Array<number>(this.numberOfConstraints);

    this.initialized = true;

  }

  onTargetVarChanged(event: Event, v: number) {
    // Convert: string -> number
    this.targetVars[v] = +(<HTMLInputElement>event.target).value;
    this.targetVarsEmitter.emit(this.targetVars);
  }

  onConstraintVarChanged(event: Event, c: number, v: number) {
    this.constraintVars[c][v] = +(<HTMLInputElement>event.target).value;
    this.constraintVarsEmitter.emit(this.constraintVars);
  }

  onConstraintConstantChanged(event: Event, c: number) {
    this.constraintConstants[c] = +(<HTMLInputElement>event.target).value;
    this.constraintConstantsEmitter.emit(this.constraintConstants);
  }

  // Take array-index instead of the array-value
  trackByIndex(index: number, _item: any) {
    return index;
  }
}

