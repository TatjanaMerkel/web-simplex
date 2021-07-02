import {Component, Input} from '@angular/core';
import {SolutionInput} from 'src/app/pages/calculator/calculator-content/solution/solution-input';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})

export class SolutionComponent {

  @Input() inputData: SolutionInput | undefined;

}
