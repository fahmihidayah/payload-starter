import React from 'react'
import { Navbar } from '@/components/layouts/navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}
