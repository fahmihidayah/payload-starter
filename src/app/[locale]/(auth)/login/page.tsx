import LoginForm from '@/features/auth/components/login-form'
import { getMessages } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages({ locale })
  const auth = messages.auth as any

  return {
    title: auth?.loginTitle || 'Login - Payload Starter',
    description: auth?.loginDescription || 'Login to access your account.',
  }
}

export default function LoginPage() {
  return <LoginForm />
}
