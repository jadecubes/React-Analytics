import { type BaseAnalyticsEvent } from './events'

export enum AnalyticsPlatforms {
  GA = 'GA',
  META = 'META',
  TIKTOK = 'TIKTOK',
  CDP = 'CDP',
}

export abstract class Analytics<T extends BaseAnalyticsEvent> {
  isReady: boolean
  eventQueue: T[]

  constructor () {
    this.eventQueue = []
    this.isReady = false
  }

  abstract initialize (): void

  protected writeEventsToPlatform (): void {
    if (!this.isReady) {
      window.setTimeout(() => this.writeEventsToPlatform(), 500)
      return
    }
    this.eventQueue.forEach(event => {
      this.sendAnalyticsEvent(event)
    })
    this.eventQueue = []
  }

  abstract sendAnalyticsEvent (customEvent: T): void

  public processAnalyticsEvent (customEvent: T): void {
    this.addToEventQueue(customEvent)
    this.writeEventsToPlatform()
  }

  protected addToEventQueue (customEvent: T): void {
    this.eventQueue.push(customEvent)
  }
}
