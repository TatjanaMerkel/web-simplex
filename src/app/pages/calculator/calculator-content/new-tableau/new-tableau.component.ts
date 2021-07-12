import {Component, Input, SimpleChanges} from '@angular/core';
import {NewTableauInput} from "./new-tableau-input";
import {Fraction} from "mathjs";
import * as math from "mathjs";

@Component({
  selector: 'app-new-tableau',
  templateUrl: './new-tableau.component.html',
  styleUrls: ['./new-tableau.component.css']
})
export class NewTableauComponent {

  @Input() data: NewTableauInput | undefined

  numberOfVars: number | undefined
  numberOfConstraints: number | undefined

  targetVars: Fraction[] | undefined
  targetVal: Fraction | undefined

  constraintVars: Fraction[][] | undefined
  constraintVals: Fraction[] | undefined

  ngOnChanges(_changes: SimpleChanges): void {


  }
