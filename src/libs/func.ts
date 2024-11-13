export const escapeHTML = (str: string): string => {
  if (typeof str !== "string") return str

  const htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "`": "&#96;",
    "[": "&#91;",
    "]": "&#93;",
    "{": "&#123;",
    "}": "&#125;",
  }

  const htmlEscapeRegex = /[&<>"'`\[\]{}]/g

  return str.replace(
    htmlEscapeRegex,
    char => htmlEscapes[char as keyof typeof htmlEscapes]
  )
}

interface ObserverOptions extends IntersectionObserverInit {}
type ObserverCallback = (entry: IntersectionObserverEntryInit) => void

export class IntersectionObserverHelper {
  private observer: IntersectionObserver
  private callback: ObserverCallback
  private options: ObserverOptions

  constructor(callback: ObserverCallback, options: ObserverOptions = {}) {
    this.options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
      ...options,
    }
    this.callback = callback

    //   create the observer

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        this.callback(entry)
      })
    }, this.options)
  }

  observerElements(selector: string): void {
    const elements = document.querySelectorAll(selector)
    elements.forEach(element => this.observer.observe(element))
  }

  unobserveElement(selector: string): void {
    const elements = document.querySelectorAll(selector)
    elements.forEach(element => this.observer.unobserve(element))
  }
}
