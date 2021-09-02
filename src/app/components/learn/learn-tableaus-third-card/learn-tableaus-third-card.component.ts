import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-learn-tableaus-third-card',
  templateUrl: './learn-tableaus-third-card.component.html',
  styleUrls: ['./learn-tableaus-third-card.component.css']
})
export class LearnTableausThirdCardComponent {

  @Input() disabled = false

  @Output() next = new EventEmitter<void>()
}
