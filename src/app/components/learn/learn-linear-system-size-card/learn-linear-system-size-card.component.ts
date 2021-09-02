import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-learn-linear-system-size-card',
  templateUrl: './learn-linear-system-size-card.component.html',
  styleUrls: ['./learn-linear-system-size-card.component.css']
})
export class LearnLinearSystemSizeCardComponent {

  @Input() disabled = false

  @Output() next = new EventEmitter<void>()
}
