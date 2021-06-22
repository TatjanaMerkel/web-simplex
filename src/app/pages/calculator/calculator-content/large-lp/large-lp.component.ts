import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-large-lp',
  templateUrl: './large-lp.component.html',
  styleUrls: ['./large-lp.component.css']
})
export class LargeLpComponent implements OnInit {

  @Input() numberOfVars: number = 0;
  @Input() numberOfConstraints: number = 0;

  @Output() numberOfVarsChange = new EventEmitter<number>();
  @Output() numberOfConstraintsChange = new EventEmitter<number>();
  @Output() showLinearSystem = new EventEmitter<boolean>();

  showInputField: boolean = true;
  showInput: boolean = false;

  disableButton: boolean = true;

  showGenerateButton: boolean = true;
  showUpdateButton: boolean = false;

  ngOnInit(): void {
  }

  validInput() {
    if(this.numberOfVars > 0 && this.numberOfConstraints > 0)  {
      this.disableButton = false;
    }
    return this.disableButton;
  }

  removeInputField() {
    this.showInputField = !this.showInputField;
    this.showInput = !this.showInput;

  }

  removeGenerateButton() {
    this.showGenerateButton = !this.showGenerateButton;
    this.showUpdateButton = !this.showUpdateButton;
  }



}
