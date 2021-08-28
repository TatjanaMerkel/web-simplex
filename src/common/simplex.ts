import * as math from 'mathjs'
import {Fraction} from 'mathjs'

import {LinearSystemSize} from '../app/components/calc/calc-linear-system-size-card/linear-system-size'
import {CalcLinearSystemDataCardOutput} from "../app/components/calc/calc-linear-system-data-card/calc-linear-system-data-card-output";

export interface Tableau {
  targetVars: Fraction[]
  targetVal: Fraction

  constraintVars: Fraction[][]
  constraintVals: Fraction[]

  pivotCol: number | null
  pivotRow: number | null

  thetas: Fraction[] | null

  slackVars: number[]
}

export class Simplex {

  static calcTableaus(linearSystemSize: LinearSystemSize,
                      linearSystemData: CalcLinearSystemDataCardOutput
  ): Tableau[] {

    const numberOfVars = linearSystemSize.numberOfVars
    const numberOfConstraints = linearSystemSize.numberOfConstraints

    //
    // Calc initial target row
    //

    const negativeTargetVars = linearSystemData.targetVars
      .map(value => math.multiply(value, -1)) as Fraction[]

    const targetSlackVars = Array.from(
      {length: numberOfConstraints},
      () => math.fraction(0) as Fraction)

    const targetVars = negativeTargetVars.concat(targetSlackVars)

    //
    // Calc initial constraint rows
    //

    const constraintVars = new Array<Array<Fraction>>(numberOfConstraints)
    for (let c = 0; c < constraintVars.length; c++) {
      const constraintSlackVars = Array.from(
        {length: numberOfConstraints},
        () => math.fraction(0) as Fraction)

      constraintSlackVars[c] = math.fraction(1) as Fraction
      constraintVars[c] = linearSystemData.constraintVars[c].concat(constraintSlackVars)
    }

    //
    // Calc initial slack var positions
    //

    const slackVars = []
    for (let i = 0; i < numberOfConstraints; i++) {
      slackVars.push(numberOfVars + i)
    }

    //
    // First tableau contains initial data
    //

    const tableaus: Tableau[] = []

    tableaus[0] = {
      targetVars: targetVars,
      targetVal: math.fraction(0) as Fraction,

      constraintVars: constraintVars,
      constraintVals: linearSystemData.constraintVals,

      pivotRow: null,
      pivotCol: null,

      thetas: null,

      slackVars
    }

    let prevTableau = tableaus[0]
    let minTargetVar = math.min(...prevTableau.targetVars)

    while (math.smaller(minTargetVar, 0)) {

      //
      // Find pivot col (var with most negative value)
      //

      const pivotCol = prevTableau.targetVars.indexOf(minTargetVar)

      prevTableau.pivotCol = pivotCol

      //
      // Calculate theta values
      //

      const thetas = new Array<Fraction>(numberOfConstraints)

      for (let c = 0; c < thetas.length; c++) {
        if (math.larger(prevTableau.constraintVars[c][pivotCol], 0)) {
          thetas[c] = math.divide(prevTableau.constraintVals[c], prevTableau.constraintVars[c][pivotCol]) as Fraction
        } else {
          thetas[c] = math.fraction(0) as Fraction
        }
      }

      prevTableau.thetas = thetas

      //
      // Find pivot row (row with smallest positive theta) and pivot element
      //

      let minPosTheta = math.fraction('9999') as Fraction
      let minPosThetaIndex = -1

      for (let i = 0; i < thetas.length; i++) {
        const theta = thetas[i]
        if (math.larger(theta, 0) && math.smaller(theta, minPosTheta)) {
          minPosTheta = theta
          minPosThetaIndex = i
        }
      }

      const pivotRow = minPosThetaIndex
      prevTableau.pivotRow = pivotRow

      const pivot = prevTableau.constraintVars[pivotRow][pivotCol]

      //
      // Calculate new pivot row by dividing though pivot element
      //

      const newConstraintVars = new Array<Array<Fraction>>(prevTableau.constraintVars.length)
      newConstraintVars[pivotRow] = prevTableau.constraintVars[pivotRow]
        .map(value => math.divide(value, pivot) as Fraction)

      const newConstraintVals = new Array<Fraction>(prevTableau.constraintVals.length)
      newConstraintVals[pivotRow] = math.divide(prevTableau.constraintVals[pivotRow], pivot) as Fraction

      //
      // Calculate other rows by subtracting multiple of new pivot row
      //

      for (let c = 0; c < prevTableau.constraintVars.length; c++) {
        if (c !== pivotRow) {
          const factor = prevTableau.constraintVars[c][pivotCol]

          newConstraintVars[c] = prevTableau.constraintVars[c].map((value, index) =>
            math.subtract(value, math.multiply(factor, newConstraintVars[pivotRow][index]))
          ) as Fraction[]

          newConstraintVals[c] = math.subtract(prevTableau.constraintVals[c],
            math.multiply(factor, newConstraintVals[pivotRow])) as Fraction
        }
      }

      //
      // Calculate target row by subtracting multiple of new pivot row
      //

      const factor = prevTableau.targetVars[pivotCol]

      const newTargetVars = prevTableau.targetVars.map((value, index) =>
        math.subtract(value, math.multiply(factor, newConstraintVars[pivotRow][index]))
      ) as Fraction[]

      const newTargetVal = math.subtract(prevTableau.targetVal,
        math.multiply(factor, newConstraintVals[pivotRow])) as Fraction

      //
      // Calc new slack var positions
      //

      const newSlackVars = [...prevTableau.slackVars]
      newSlackVars[pivotRow] = pivotCol

      //
      // Add new tableau
      //

      const newTableau = {
        targetVars: newTargetVars,
        targetVal: newTargetVal,

        constraintVars: newConstraintVars,
        constraintVals: newConstraintVals,

        pivotCol: null,
        pivotRow: null,

        thetas: null,

        slackVars: newSlackVars
      }

      tableaus.push(newTableau)

      prevTableau = newTableau
      minTargetVar = math.min(...prevTableau.targetVars)
    }

    return tableaus
  }
}
