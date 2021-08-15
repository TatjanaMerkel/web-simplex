import {Component, OnInit} from '@angular/core'

import {HeaderService} from '../../../services/header.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private headerService: HeaderService) {
  }

  ngOnInit(): void {
    this.headerService.title.next('Web-Simplex')
  }

  buttons = [
    {title: 'Lernen', color: 'red', route: '/learning'},
    {title: 'Üben', color: 'green', route: '/practice'},
    {title: 'Rechnen', color: 'blue', route: '/calculator'},
  ]

  getColor(color: string): any {
    switch (color) {
      case 'red':
        return '#e74c3c';
      case 'green':
        return '#27ae60';
      case 'blue':
        return '#3498db';
    }
  }
}
