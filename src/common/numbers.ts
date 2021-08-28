export function numberFromInputEvent(event: Event): number | null {
  const inputElement = event.target as HTMLInputElement
  const inputValue = inputElement.value

  if (inputValue === '') {
    return null
  } else {
    return Number(inputValue)
  }
}
