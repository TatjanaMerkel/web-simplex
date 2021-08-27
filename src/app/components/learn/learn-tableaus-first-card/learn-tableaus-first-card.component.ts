import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-learn-tableaus-first-card',
  templateUrl: './learn-tableaus-first-card.component.html',
  styleUrls: ['./learn-tableaus-first-card.component.css']
})
export class LearnTableausFirstCardComponent {

  @Input() disabled = false

  @Output() next = new EventEmitter<void>()
}
