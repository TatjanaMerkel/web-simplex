import {Component, OnInit} from '@angular/core'

import {HeaderService} from '../../../services/header.service'

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit {

  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Üben')
  }
}
