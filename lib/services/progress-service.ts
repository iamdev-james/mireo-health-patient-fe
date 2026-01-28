export class ProgressService {
  private static listeners: ((isInProgress: boolean) => void)[] = []
  private static isInProgress = false
  private static activeRequestCount = 0

  static subscribe(listener: (isInProgress: boolean) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  static start() {
    this.activeRequestCount++
    if (!this.isInProgress) {
      this.isInProgress = true
      this.notify()
    }
  }

  static done() {
    if (this.activeRequestCount > 0) {
      this.activeRequestCount--
    }

    if (this.activeRequestCount === 0 && this.isInProgress) {
      this.isInProgress = false
      this.notify()
    }
  }

  private static notify() {
    this.listeners.forEach((listener) => listener(this.isInProgress))
  }
}
