import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-learn-standard-form-card',
  templateUrl: './learn-standard-form-card.component.html',
  styleUrls: ['./learn-standard-form-card.component.css']
})
export class LearnStandardFormCardComponent {

  @Input() disabled = false

  @Output() next = new EventEmitter<void>()
}
