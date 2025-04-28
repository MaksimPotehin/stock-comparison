declare global {
  interface IWindow {
    gtag: (...args: any[]) => void
  }
}

export const useAnalytics = () => {
  const trackEvent = (category: string, action: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && (window as unknown as IWindow).gtag) {
      (window as unknown as IWindow).gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
        non_interaction: false
      })
    }
  }

  const trackCalculatorEvent = (action: string, label?: string) => {
    trackEvent('calculator', action, label)
  }

  const trackNavigation = (page: string) => {
    trackEvent('navigation', 'page_view', page)
  }

  const trackLanguageSwitch = (from: string, to: string) => {
    trackEvent('language', 'switch', `${from}_to_${to}`)
  }

  const trackFormSubmission = (formName: string, success: boolean) => {
    trackEvent('form', 'submit', formName, success ? 1 : 0)
  }

  return {
    trackEvent,
    trackCalculatorEvent,
    trackNavigation,
    trackLanguageSwitch,
    trackFormSubmission
  }
}
