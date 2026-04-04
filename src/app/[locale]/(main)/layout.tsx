import React from 'react'
import { getHeader, getFooter, Header, Footer } from '@/features/layout'

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [header, footer] = await Promise.all([getHeader(), getFooter()])

  return (
    <>
      <Header header={header} locale={locale} />
      <main>{children}</main>
      <Footer footer={footer} locale={locale} />
    </>
  )
}
