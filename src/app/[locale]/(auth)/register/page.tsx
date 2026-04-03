import { RegisterForm } from '@/features/auth/components/register-form'
import { getMessages } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const messages = await getMessages({ locale })
  const auth = messages.auth as any

  return {
    title: auth?.registerTitle || 'Register - Payload Starter',
    description: auth?.registerDescription || 'Create a new account to get started.',
  }
}

export default function RegisterPage() {
  return <RegisterForm />
}
