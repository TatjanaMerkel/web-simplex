import {Component, EventEmitter, Input, Output} from '@angular/core'

import {PracticeStandardFormCardExpected} from './practice-standard-form-card-expected'

@Component({
  selector: 'app-practice-standard-form-card',
  templateUrl: './practice-standard-form-card.component.html',
  styleUrls: ['./practice-standard-form-card.component.css']
})

export class PracticeStandardFormCardComponent {

  @Input() expected: undefined | PracticeStandardFormCardExpected
  @Input() disabled = false

  @Output() correct = new EventEmitter<void>()
}
