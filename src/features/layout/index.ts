// Components
export {
  Header,
  Footer,
  SearchInput,
  SubscriptionForm,
  SocialIcon,
} from './components'

// Actions
export { getHeader, getFooter } from './actions'

// Services
export { HeaderService, FooterService } from './services'

// Types
export type {
  Header as HeaderType,
  Footer as FooterType,
  HeaderNavigationLink,
  FooterLinkSection,
  FooterLink,
  SocialLink,
} from './types'

// Globals
export { Header as HeaderConfig, Footer as FooterConfig } from './globals'
