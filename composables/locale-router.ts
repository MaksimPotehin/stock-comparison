import { useI18n } from 'vue-i18n'
import type { TRouteNames, TRouteNamedMapKeys } from '~/types'

export function useLocaleRouteName () {
  try {
    const { locale } = useI18n()

    return (routeNameRaw: TRouteNames): string =>
      `${routeNameRaw}___${locale.value}` as TRouteNamedMapKeys
  } catch (e) {
    // Fallback for SSR/prerendering
    return (routeNameRaw: TRouteNames): string =>
      `${routeNameRaw}___en` as TRouteNamedMapKeys
  }
}
