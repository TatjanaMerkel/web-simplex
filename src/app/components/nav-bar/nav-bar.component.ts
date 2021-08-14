import {Component} from '@angular/core'
import {Location} from '@angular/common'
import {Router} from '@angular/router'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private location: Location,
              public router: Router) {
  }

  onBack() {
    this.location.back()
  }
}
