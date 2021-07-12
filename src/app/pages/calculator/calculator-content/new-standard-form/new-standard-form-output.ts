import {Fraction} from "mathjs";

export interface NewStandardFormOutput {
  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: Array<Fraction>,
  targetVal: Fraction,
  constraintVars: Array<Array<Fraction>>,
  constraintVals: Array<Fraction>,

  slackVars: Array<number>
}
