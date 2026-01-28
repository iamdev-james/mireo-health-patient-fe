export class LoaderService {
  private static listeners: ((isLoading: boolean) => void)[] = []
  private static isLoading = false

  static subscribe(listener: (isLoading: boolean) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  static show() {
    this.isLoading = true
    this.notify()
  }

  static hide() {
    this.isLoading = false
    this.notify()
  }

  private static notify() {
    this.listeners.forEach((listener) => listener(this.isLoading))
  }
}
