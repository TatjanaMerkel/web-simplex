import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
