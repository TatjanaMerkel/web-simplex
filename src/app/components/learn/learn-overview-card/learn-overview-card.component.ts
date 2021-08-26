import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-learn-overview-card',
  templateUrl: './learn-overview-card.component.html',
  styleUrls: ['./learn-overview-card.component.css']
})
export class LearnOverviewCardComponent {

  @Input() disabled = false

  @Output() next = new EventEmitter<void>()
}
