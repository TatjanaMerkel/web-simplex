import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
  selector: 'app-learn-solution-card',
  templateUrl: './learn-solution-card.component.html',
  styleUrls: ['./learn-solution-card.component.css']
})
export class LearnSolutionCardComponent {

  @Input() disabled = false

  @Output() next = new EventEmitter<void>()
}
