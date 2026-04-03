import ForgotPasswordForm from '@/features/auth/components/forgot-password-form'
import { getMessages } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages({ locale })
  const metadata = messages.metadata as any

  return {
    title: metadata?.forgotPasswordTitle || 'Forgot Password - Payload Starter',
    description: metadata?.forgotPasswordDescription || 'Reset your password to regain access to your account.',
  }
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
