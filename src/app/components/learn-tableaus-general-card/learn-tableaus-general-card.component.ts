import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-learn-tableaus-general-card',
  templateUrl: './learn-tableaus-general-card.component.html',
  styleUrls: ['./learn-tableaus-general-card.component.css']
})
export class LearnTableausGeneralCardComponent {

  @Input() disabled = false

  @Output() next = new EventEmitter<void>()
}
