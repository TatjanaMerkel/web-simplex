import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SolutionInput} from "./solution-input";

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent {

  @Input() data: SolutionInput | undefined;
}
