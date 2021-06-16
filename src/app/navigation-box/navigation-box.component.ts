import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation-box',
  templateUrl: './navigation-box.component.html',
  styleUrls: ['./navigation-box.component.css']
})
export class NavigationBoxComponent implements OnInit {


  buttons = [
    {title: 'Lernen', color: 'red', route: '/learning'},
    {title: 'Üben', color: 'green', route: '/practise'},
    {title: 'Rechnen', color: 'blue', route: '/calculator'},
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

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
