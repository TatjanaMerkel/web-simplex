import {Component, OnInit} from '@angular/core'

import {HeaderService} from '../../../services/header.service'

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Lernen')
  }
}
