import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  @Input() numberOfVars: number = 0;
  @Input() numberOfConstraints: number = 0;


  ngOnInit(): void {
  }

  validInput() {
    return !(this.numberOfVars > 0 && this.numberOfConstraints > 0);
  }


}
