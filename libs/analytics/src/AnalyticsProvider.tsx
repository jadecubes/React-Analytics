import { createContext, useMemo, useRef, type ReactNode } from 'react'
import { type BaseAnalyticsEvent } from './events'
import { useEffectOnce } from './useEffectOnce'
import { AnalyticsPlatforms, type Analytics } from './analytics'
import { Ga } from './ga'
import { Meta } from './meta'
import { TikTok } from './tiktok'
import { useCallbackEvent } from './useCallbackEvent'

export const providerInstanceMapping: Record<
AnalyticsPlatforms,
(config: Record<string, string>) => Analytics<BaseAnalyticsEvent>
> = {
  [AnalyticsPlatforms.GA]: (config) => Ga.getInstance(config),
  [AnalyticsPlatforms.META]: (config) => Meta.getInstance(config),
  [AnalyticsPlatforms.TIKTOK]: (config) => TikTok.getInstance(config)
}

export interface AnalyticsContextProps {
  processAnalyticsEvent: (customEvent: BaseAnalyticsEvent, platforms?: AnalyticsPlatforms[]) => void,
}
export const AnalyticsContext = createContext<AnalyticsContextProps | undefined>(undefined)

export type AnalyticsConfig = Partial<Record<AnalyticsPlatforms, Record<string, string>>>

interface AnalyticsProviderProps {
  children: ReactNode,
  config: AnalyticsConfig,
}

export const AnalyticsProvider = ({ children, config }: AnalyticsProviderProps) => {
  const configuredPlatforms = useRef<AnalyticsPlatforms[]>([])
  const analyticsProviders = useRef<Partial<Record<AnalyticsPlatforms, Analytics<BaseAnalyticsEvent>>>>({})

  const initializeAnalytics = useCallbackEvent((config: AnalyticsConfig) => {
    configuredPlatforms.current.length = 0
    Object.entries(config).forEach(([platform, config]) => {
      if (config && providerInstanceMapping[platform as AnalyticsPlatforms]) {
        const initializer = providerInstanceMapping[platform as AnalyticsPlatforms]
        analyticsProviders.current[platform as AnalyticsPlatforms] = initializer(config)
      }
    })
  })

  useEffectOnce(() => {
    initializeAnalytics(config)
  })

  const processAnalyticsEvent = useCallbackEvent((event: BaseAnalyticsEvent, platforms?: AnalyticsPlatforms[]) => {
    if (platforms) {
      platforms.forEach((platform) => {
        const provider = analyticsProviders.current[platform]
        provider?.processAnalyticsEvent(event)
      })
    } else {
      for (const platform in analyticsProviders.current) {
        const provider = analyticsProviders.current[platform as AnalyticsPlatforms]
        provider?.processAnalyticsEvent(event)
      }
    }
  })

  const value = useMemo(
    () => ({
      processAnalyticsEvent
    }),
    [processAnalyticsEvent]
  )

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}
