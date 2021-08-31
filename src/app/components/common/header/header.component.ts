import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

import {HeaderService} from '../../../../services/header.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: undefined | string

  constructor(private headerService: HeaderService, public router: Router) {}

  ngOnInit(): void {
    this.headerService.title.subscribe((title: string) => {this.title = title})
  }
}
