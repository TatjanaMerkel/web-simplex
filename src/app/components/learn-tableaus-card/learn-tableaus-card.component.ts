import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-learn-tableaus-card',
  templateUrl: './learn-tableaus-card.component.html',
  styleUrls: ['./learn-tableaus-card.component.css']
})
export class LearnTableausCardComponent {

  @Input() disabled = false

  @Output() next = new EventEmitter<void>()
}
