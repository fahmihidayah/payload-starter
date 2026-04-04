'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SubscriptionFormProps {
  title?: string
  description?: string
  buttonText?: string
  className?: string
}

export function SubscriptionForm({
  title = 'Subscribe to our Newsletter',
  description,
  buttonText = 'Subscribe',
  className = '',
}: SubscriptionFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Thank you for subscribing!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }

    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  return (
    <div className={className}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === 'loading'}
          className="flex-1"
          aria-label="Email address"
        />
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : buttonText}
        </Button>
      </form>

      {message && (
        <p
          className={`mt-2 text-sm ${
            status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-destructive'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
