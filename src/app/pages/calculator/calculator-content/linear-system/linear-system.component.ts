import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-linear-system',
  templateUrl: './linear-system.component.html',
  styleUrls: ['./linear-system.component.css']
})
export class LinearSystemComponent implements OnInit {

  @Input() numberOfVars = -1;
  @Input() numberOfConstraints = -1;

  @Output() targetVarsEmitter = new EventEmitter<number[]>();
  @Output() constraintVarsEmitter = new EventEmitter<number[][]>();
  @Output() constraintConstantsEmitter = new EventEmitter<number[]>();

  targetVars: number[] = []
  constraintVars: number[][] = []
  constraintConstants: number[] = []

  initialized = false;

  constructor() {
  }

  ngOnInit(): void {
    this.targetVars = new Array<number>(this.numberOfVars);

    this.constraintVars = new Array<Array<number>>(this.numberOfConstraints);
    for (let i = 0; i < this.constraintVars.length; i++) {
      this.constraintVars[i] = new Array<number>(this.numberOfVars);
    }

    this.constraintConstants = new Array<number>(this.numberOfConstraints);

    this.initialized = true;
  }

  onTargetVarChanged(event: Event, v: number) {
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

  trackByIndex(index: number, _item: any) {
    return index;
  }
}

