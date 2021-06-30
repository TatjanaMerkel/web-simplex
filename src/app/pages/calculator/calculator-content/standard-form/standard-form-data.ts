export interface StandardFormData {
  numberOfVars: number,
  numberOfConstraints: number,

  targetVars: number[],
  targetSlackVars: number[],
  constraintVars: number[][],
  constraintSlackVars: number[][],
  constraintConstants: number[]
}
