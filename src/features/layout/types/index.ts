import { Header, Footer } from '@/payload-types'

export type HeaderNavigationLink = NonNullable<Header['navigationLinks']>[number]
export type FooterLinkSection = NonNullable<Footer['linkSections']>[number]
export type FooterLink = NonNullable<FooterLinkSection['links']>[number]
export type SocialLink = NonNullable<Footer['socialLinks']>[number]

export type { Header, Footer }
