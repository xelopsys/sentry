type DebounceFunction = (...args: any[]) => void

let timeoutId: NodeJS.Timeout
export function debounce<F extends DebounceFunction>(
  func: F,
  delay = 300
): (...args: Parameters<F>) => void {
  return function debouncedFunction(...args: Parameters<F>): void {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
