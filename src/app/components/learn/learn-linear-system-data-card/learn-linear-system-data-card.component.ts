import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-learn-linear-system-data-card',
  templateUrl: './learn-linear-system-data-card.component.html',
  styleUrls: ['./learn-linear-system-data-card.component.css']
})
export class LearnLinearSystemDataCardComponent {

  @Input() disabled = false

  @Output() next = new EventEmitter<void>()
}
