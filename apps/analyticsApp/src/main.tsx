import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './app/app'
import { AnalyticsProvider, AnalyticsPlatforms } from '@analytics'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <StrictMode>
    <AnalyticsProvider config={{
      [AnalyticsPlatforms.GA]: { measurementId: import.meta.env.VITE_GA4_TRACKING_ID as string },
      [AnalyticsPlatforms.META]: { measurementId: import.meta.env.VITE_META_TRACKING_ID as string },
      [AnalyticsPlatforms.TIKTOK]: { measurementId: import.meta.env.VITE_TIKTOK_TRACKING_ID as string }
    }}
    >
      <App />
    </AnalyticsProvider>
  </StrictMode>
)
