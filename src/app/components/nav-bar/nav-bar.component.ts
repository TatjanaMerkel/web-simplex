import {Component, OnInit} from '@angular/core'
import {Location} from '@angular/common'
import {Router} from '@angular/router'

import {HeaderService} from '../../../services/header.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  title: undefined | string

  constructor(private headerService: HeaderService,
              private location: Location,
              public router: Router) {
  }

  onBack() {
    this.location.back()
  }

  ngOnInit(): void {
    this.headerService.title.subscribe((title: string) => {
      this.title = title
    })
  }
}
