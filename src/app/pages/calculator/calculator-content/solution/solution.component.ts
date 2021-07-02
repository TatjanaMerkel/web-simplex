import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SolutionInput} from 'src/app/pages/calculator/calculator-content/solution/solution-input';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnChanges {

  @Input() inputData: SolutionInput | null = null;

  loading = true;

  ngOnChanges(_changes: SimpleChanges): void {
    this.loading = false;
  }


}
