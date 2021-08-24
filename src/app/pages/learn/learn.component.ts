import {Component, OnInit} from '@angular/core'

import {HeaderService} from '../../../services/header.service'

@Component({
  selector: 'app-learning',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  overviewRead = false
  linearSystemSizeRead = false

  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Lernen')
  }
}
