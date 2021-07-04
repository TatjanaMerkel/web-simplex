export interface TableauOutput {
  targetVars: number[],
  targetSlackVars: number[],
  targetConstant: number,

  constraintVars: number[][],
  constraintSlackVars: number[][],
  constraintConstants: number[]
}
