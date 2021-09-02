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

export function formatFraction(fraction: Fraction): string {
  if (fraction.n === 0) {
    return '0'
  } else if (fraction.n === 1 && fraction.d === 1) {
    return ''
  } else if (fraction.d === 1) {
    return fraction.n + ''
  } else {
    return fraction.n + '/' + fraction.d
  }
}
