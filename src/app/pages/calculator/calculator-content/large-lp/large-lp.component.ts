import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-large-lp',
  templateUrl: './large-lp.component.html',
  styleUrls: ['./large-lp.component.css']
})
export class LargeLpComponent implements OnInit {

  @Output() numberOfVarsChange = new EventEmitter<number>();
  @Output() numberOfConstraintsChange = new EventEmitter<number>();


  @Input() numberOfVars: number = 0;
  @Input() numberOfConstraints: number = 0;

  @Output() showLinearSystem = new EventEmitter<boolean>();

  showInputField: boolean = true;
  showInput: boolean = false;

  ngOnInit(): void {
  }

  validInput() {
    return !(this.numberOfVars > 0 && this.numberOfConstraints > 0);
  }

  removeInputField() {
    this.showInputField = false;
    this.showInput = true;

  }



}
