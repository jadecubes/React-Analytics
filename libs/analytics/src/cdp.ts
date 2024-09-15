import { Analytics } from './analytics.ts'
import { type BaseAnalyticsEvent } from './events.ts'

export class Cdp extends Analytics<BaseAnalyticsEvent> {
  protected config: Record<string, string>
  private static instance: Cdp | null = null
  constructor (config: Record<string, string>) {
    super()
    this.config = config
    this.initialize()
  }

  // Static getInstance method for singleton pattern
  public static getInstance (config: Record<string, string>): Cdp {
    if (!Cdp.instance) {
      Cdp.instance = new Cdp(config)
    }
    return Cdp.instance
  }

  public initialize (): void {
    this.isReady = false
    const head = document.querySelector('head')
    // https://github.com/omnitag/omnitag/wiki/API#pageview
    const existingScript = document.querySelector('script[src="https://omnitag.omniscientai.com/tag-app.js"]')

    window.i13nData = window.i13nData || { ...this.config }
    // Only init script once
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://omnitag.omniscientai.com/tag-app.js'
      script.async = true
      script.onload = () => { this.isReady = true }
      head?.appendChild(script)
    } else {
      this.isReady = true
    }
  }

  public sendAnalyticsEvent (customEvent: BaseAnalyticsEvent): number {
    const { eventName, eventParams } = customEvent
    const cdpEvent = { I13N: { action: eventName, ...eventParams } }
    if (window.i13n) {
      try {
        window.i13n.dispatch('action', cdpEvent)
        return 0
      } catch (error) {
        console.error('[CDP] sendEvent', error)
        return -1
      }
    } else {
      console.error('[CDP] i13n is not defined')
      return -1
    }
  }
}
