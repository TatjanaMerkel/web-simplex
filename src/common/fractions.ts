import * as math from 'mathjs'
import {Fraction} from 'mathjs'

export function fractionFromInputEvent(event: Event): Fraction | null {
  const inputElement = event.target as HTMLInputElement
  const inputValue = inputElement.value

  try {
    return math.fraction(inputValue) as Fraction
  } catch (e) {
    return null
  }
}

export function fractionsEqual(first: Fraction | null, second: Fraction | null): boolean {
  if (first === null && second === null) {
    return true
  }

  if (first === null || second === null) {
    return false
  }

  return math.equal(first, second) as boolean
}
