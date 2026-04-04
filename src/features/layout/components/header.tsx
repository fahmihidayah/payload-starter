import { Header as HeaderType, Media, Page } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'

interface HeaderProps {
  header: HeaderType | null
  locale: string
  className?: string
}

export async function Header({ header, locale, className = '' }: HeaderProps) {
  if (!header) {
    return null
  }

  const {
    companyLogo,
    companyTitle,
    companyBriefDescription,
    showAuthLinks,
    showSearch,
    showThemeToggle,
    navigationLinks,
    stickyHeader,
    transparentOnTop,
  } = header

  const logo = companyLogo as Media | undefined
  const logoUrl = logo?.url || null

  return (
    <header
      className={cn(
        'border-b',
        stickyHeader && 'sticky top-0 z-50',
        transparentOnTop ? 'bg-transparent' : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className,
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo and Company Info */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            {logoUrl && (
              <div className="relative size-10 rounded-md bg-primary overflow-hidden">
                <Image
                  src={logoUrl}
                  alt={companyTitle || 'Company Logo'}
                  fill
                  className="object-contain p-1"
                />
              </div>
            )}
            <div className="hidden sm:block">
              {companyTitle && (
                <h1 className="text-lg font-bold">{companyTitle}</h1>
              )}
              {companyBriefDescription && (
                <p className="text-xs text-muted-foreground">{companyBriefDescription}</p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navigationLinks?.map((link, index) => {
              const key = `nav-${index}`

              if (link.type === 'page' && link.page) {
                const page = link.page as Page
                return (
                  <Link
                    key={key}
                    href={`/${locale}/${page.slug}`}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              }

              if (link.type === 'url' && link.url) {
                return (
                  <a
                    key={key}
                    href={link.url}
                    target={link.openInNewTab ? '_blank' : '_self'}
                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                )
              }

              return null
            })}
          </nav>

          {/* Right Side - Search, Theme Toggle and Auth */}
          <div className="flex items-center gap-2">
            {showSearch && (
              <div className="hidden lg:block w-64">
                <SearchInput locale={locale} />
              </div>
            )}

            {showThemeToggle && (
              <div className="hidden md:block">
                <ModeToggle />
              </div>
            )}

            {showAuthLinks && (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href={`/${locale}/login`}>Login</Link>
                </Button>
                <Button asChild>
                  <Link href={`/${locale}/register`}>Register</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 mt-6">
                  {/* Mobile Search */}
                  {showSearch && (
                    <div className="w-full">
                      <SearchInput locale={locale} />
                    </div>
                  )}

                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col gap-4">
                    {navigationLinks?.map((link, index) => {
                      const key = `mobile-nav-${index}`

                      if (link.type === 'page' && link.page) {
                        const page = link.page as Page
                        return (
                          <Link
                            key={key}
                            href={`/${locale}/${page.slug}`}
                            className="text-sm font-medium hover:text-primary transition-colors"
                          >
                            {link.label}
                          </Link>
                        )
                      }

                      if (link.type === 'url' && link.url) {
                        return (
                          <a
                            key={key}
                            href={link.url}
                            target={link.openInNewTab ? '_blank' : '_self'}
                            rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                            className="text-sm font-medium hover:text-primary transition-colors"
                          >
                            {link.label}
                          </a>
                        )
                      }

                      return null
                    })}
                  </nav>

                  {/* Mobile Theme Toggle */}
                  {showThemeToggle && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium">Theme</span>
                      <ModeToggle />
                    </div>
                  )}

                  {/* Mobile Auth Links */}
                  {showAuthLinks && (
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Button variant="outline" asChild className="w-full">
                        <Link href={`/${locale}/login`}>Login</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href={`/${locale}/register`}>Register</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
