import {Component, OnInit} from '@angular/core'
import {Location} from '@angular/common'
import {Router} from '@angular/router'

import {HeaderService} from '../../../services/header.service'

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
