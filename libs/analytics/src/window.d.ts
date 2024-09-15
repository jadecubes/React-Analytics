type DataLayerEvent = string | Date | Record<string, unknown> | unknown[]
interface Window {
  dataLayer: unknown[],
  gtag: (...args: unknown[]) => void,
  fbq: (...args: unknwon[]) => void,
  ttq: {
    track: (event: string, payload?: Record<string, unknown>) => void,
  },
  // CDP
  i13nData: {
    tagId: string,
    uid: string | undefined,
    i13nPage: Record<string, unknown>,
    nextCallback: () => void,
  },
  i13n: {
    dispatch: (
      action: 'action',
      data: {
        I13N: Record<string, unknown>,
      },
    ) => void,
  },
}
