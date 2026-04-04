import { Footer as FooterType, Page } from '@/payload-types'
import Link from 'next/link'
import { SubscriptionForm } from './subscription-form'
import { SocialIcon } from './social-icon'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface FooterProps {
  footer: FooterType | null
  locale: string
  className?: string
}

export async function Footer({ footer, locale, className = '' }: FooterProps) {
  if (!footer) {
    return null
  }

  const {
    linkSections,
    showNewsletterForm,
    newsletterTitle,
    newsletterDescription,
    newsletterButtonText,
    socialLinks,
    copyrightText,
    additionalInfo,
  } = footer

  return (
    <footer className={cn('border-t bg-background', className)}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* Main Footer Content - Horizontal Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Newsletter Section - Left Side */}
          {showNewsletterForm && (
            <div className="lg:w-1/3">
              <SubscriptionForm
                title={newsletterTitle || undefined}
                description={newsletterDescription || undefined}
                buttonText={newsletterButtonText || undefined}
              />
            </div>
          )}

          {/* Footer Links Sections - Right Side */}
          {linkSections && linkSections.length > 0 && (
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {linkSections.map((section, sectionIndex) => (
                  <div key={`section-${sectionIndex}`}>
                    {section.sectionTitle && (
                      <h3 className="font-semibold mb-4">{section.sectionTitle}</h3>
                    )}
                    {section.links && section.links.length > 0 && (
                      <ul className="space-y-3">
                        {section.links.map((link, linkIndex) => {
                          const key = `link-${sectionIndex}-${linkIndex}`

                          if (link.type === 'page' && link.page) {
                            const page = link.page as Page
                            return (
                              <li key={key}>
                                <Link
                                  href={`/${locale}/${page.slug}`}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            )
                          }

                          if (link.type === 'url' && link.url) {
                            return (
                              <li key={key}>
                                <a
                                  href={link.url}
                                  target={link.openInNewTab ? '_blank' : '_self'}
                                  rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {link.label}
                                </a>
                              </li>
                            )
                          }

                          return null
                        })}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator className="my-8" />

        {/* Bottom Section - Social Media and Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright and Additional Info */}
          <div className="text-center md:text-left">
            {copyrightText && (
              <p className="text-sm text-muted-foreground">{copyrightText}</p>
            )}
            {additionalInfo && (
              <p className="text-xs text-muted-foreground mt-1">{additionalInfo}</p>
            )}
          </div>

          {/* Social Media Links */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={`social-${index}`}
                  platform={social.platform || 'other'}
                  url={social.url || '#'}
                  customIconName={social.customIconName || undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
