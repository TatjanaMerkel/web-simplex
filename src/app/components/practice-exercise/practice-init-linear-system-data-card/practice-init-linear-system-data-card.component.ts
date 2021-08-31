import {Component, Input, OnInit} from '@angular/core'

import {InitLinearSystemData} from './init-linear-system-data'
import {formatFraction} from '../../../../common/fractions'

@Component({
  selector: 'app-practice-init-linear-system-data-card[init]',
  templateUrl: './practice-init-linear-system-data-card.component.html',
  styleUrls: ['./practice-init-linear-system-data-card.component.css']
})
export class PracticeInitLinearSystemDataCardComponent implements OnInit {

  @Input() init!: InitLinearSystemData

  formatFraction = formatFraction

  constructor() {
  }

  ngOnInit(): void {
  }

}
