export interface TableauInput {
  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: number[],
  targetSlackVars: number[],
  targetConstant: number,

  constraintVars: number[][],
  constraintSlackVars: number[][],
  constraintConstants: number[],

  calculate: boolean
}
