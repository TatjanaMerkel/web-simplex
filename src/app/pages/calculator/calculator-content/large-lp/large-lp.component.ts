import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-large-lp',
  templateUrl: './large-lp.component.html',
  styleUrls: ['./large-lp.component.css']
})
export class LargeLpComponent implements OnInit {

  @Output() numberOfVarsChange = new EventEmitter<number>();
  @Output() numberOfConstraintsChange = new EventEmitter<number>();


  ngOnInit(): void {
  }

}
