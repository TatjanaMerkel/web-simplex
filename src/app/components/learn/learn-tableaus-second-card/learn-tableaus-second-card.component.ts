import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-learn-tableaus-second-card',
  templateUrl: './learn-tableaus-second-card.component.html',
  styleUrls: ['./learn-tableaus-second-card.component.css']
})
export class LearnTableausSecondCardComponent {

  @Input() disabled = false

  @Output() next = new EventEmitter<void>()
}
