import type { RouteKeys } from './routes'
import type { KeyTranslation } from '@cool-core/locale/types'

export type FeatureRoute = {
  name: RouteKeys
  component: () => Promise<{ default: React.ComponentType }>
  options?: {
    tsKeyTitle?: KeyTranslation
    title?: string
    headerShown?: boolean
    headerBackTitleVisible?: boolean
  }
}

export type AppRoutes = {
  [key: string]: FeatureRoute
}
