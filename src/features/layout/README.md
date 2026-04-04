# Layout Feature

This feature provides global Header and Footer configuration for your Payload CMS application with reusable React components.

## Structure

```
src/features/layout/
├── actions/           # Server actions for fetching layout data
│   └── index.ts
├── components/        # Reusable React components
│   ├── footer.tsx
│   ├── header.tsx
│   ├── search-input.tsx
│   ├── social-icon.tsx
│   ├── subscription-form.tsx
│   └── index.ts
├── globals/          # Payload global collection configs
│   ├── Footer.ts
│   ├── Header.ts
│   └── index.ts
├── services/         # Data querying services
│   ├── footer-service.ts
│   ├── header-service.ts
│   └── index.ts
├── types/           # TypeScript type definitions
│   └── index.ts
├── index.ts         # Main feature export
└── README.md        # This file
```

## Features

### Header Global Collection

Configure your site's header with:

**Company Info:**
- Company Logo (media upload)
- Company Title
- Company Brief Description

**Navigation:**
- Navigation Links (internal pages or external URLs)
- Show/Hide Login & Register links
- Show/Hide Search input

**Settings:**
- Sticky header option
- Transparent when at top option

### Footer Global Collection

Configure your site's footer with:

**Footer Links:**
- Multiple link sections with titles
- Links to internal pages or external URLs

**Newsletter:**
- Show/Hide newsletter subscription form
- Customizable title, description, and button text

**Social Media:**
- Social media links (Facebook, Twitter, Instagram, LinkedIn, YouTube, TikTok, GitHub, and custom)
- Automatic icon rendering

**Copyright:**
- Copyright text
- Additional information

## Usage

### 1. Access Global Settings in Payload Admin

After registering the globals, you can configure Header and Footer settings in your Payload admin panel:

1. Navigate to **Globals** → **Header** or **Footer**
2. Configure your settings
3. Save changes

### 2. Using Components in Your App

#### Basic Usage

```tsx
import { getHeader, getFooter } from '@/features/layout'
import { Header, Footer } from '@/features/layout'

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const header = await getHeader()
  const footer = await getFooter()

  return (
    <html lang={locale}>
      <body>
        <Header header={header} locale={locale} />
        <main>{children}</main>
        <Footer footer={footer} locale={locale} />
      </body>
    </html>
  )
}
```

#### Using Individual Components

```tsx
// Search Input
import { SearchInput } from '@/features/layout'

<SearchInput locale="en" placeholder="Search articles..." className="w-full" />

// Subscription Form
import { SubscriptionForm } from '@/features/layout'

<SubscriptionForm
  title="Subscribe to Newsletter"
  description="Get updates delivered to your inbox"
  buttonText="Subscribe Now"
  className="my-section"
/>

// Social Icon
import { SocialIcon } from '@/features/layout'

<SocialIcon platform="facebook" url="https://facebook.com/yourpage" />
```

### 3. Using Services Directly

If you need to fetch data with custom logic:

```tsx
import { HeaderService, FooterService } from '@/features/layout'
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const headerResult = await HeaderService.getHeader({
  serviceContext: { payload },
})

const footerResult = await FooterService.getFooter({
  serviceContext: { payload },
})

if (headerResult.data) {
  // Use header data
}

if (footerResult.data) {
  // Use footer data
}
```

### 4. Using Server Actions

Server actions provide a simple way to fetch layout data in Server Components:

```tsx
'use server'

import { getHeader, getFooter } from '@/features/layout'

export async function MyServerComponent() {
  const header = await getHeader()
  const footer = await getFooter()

  // header and footer will be null if fetch fails
  if (!header) {
    return <div>Header configuration not found</div>
  }

  return <div>{/* Your component */}</div>
}
```

## Customization

### Styling

All components use Tailwind CSS classes. You can:

1. **Override styles with className prop:**
   ```tsx
   <Header header={header} locale={locale} className="bg-slate-900 text-white" />
   ```

2. **Modify component files directly** to match your design system

3. **Use CSS modules or styled-components** by wrapping the components

### Adding New Fields

To add new fields to Header or Footer:

1. Edit [globals/Header.ts](./globals/Header.ts) or [globals/Footer.ts](./globals/Footer.ts)
2. Add your new fields to the configuration
3. Run `pnpm run generate:types` to update TypeScript types
4. Update the corresponding component to render the new fields

Example:

```typescript
// In globals/Header.ts
{
  name: 'announcement',
  type: 'text',
  label: 'Announcement Banner Text',
}

// In components/header.tsx
{header.announcement && (
  <div className="bg-blue-600 text-white text-center py-2">
    {header.announcement}
  </div>
)}
```

### Newsletter Subscription

The `SubscriptionForm` component expects an API endpoint at `/api/subscribe`. You need to create this endpoint to handle subscriptions:

```typescript
// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Add your subscription logic here
    // e.g., save to database, send to email service, etc.

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Subscription failed' },
      { status: 500 }
    )
  }
}
```

## TypeScript Types

All types are automatically generated by Payload. Import them from the types directory:

```typescript
import type {
  HeaderType,
  FooterType,
  HeaderNavigationLink,
  FooterLinkSection,
  FooterLink,
  SocialLink,
} from '@/features/layout'
```

## Best Practices

1. **Server Components:** Header and Footer are async Server Components for optimal performance
2. **Client Components:** SearchInput and SubscriptionForm are Client Components for interactivity
3. **Error Handling:** Server actions return `null` on errors - always check before rendering
4. **Caching:** Consider implementing caching for layout data to reduce database queries
5. **Reusability:** Import from feature index (`@/features/layout`) for clean imports

## Example: Cached Layout Data

```typescript
import { unstable_cache } from 'next/cache'
import { getHeader, getFooter } from '@/features/layout'

const getCachedHeader = unstable_cache(
  async () => getHeader(),
  ['header'],
  { revalidate: 3600 } // Cache for 1 hour
)

const getCachedFooter = unstable_cache(
  async () => getFooter(),
  ['footer'],
  { revalidate: 3600 }
)

export default async function Layout({ children, params }) {
  const [header, footer] = await Promise.all([
    getCachedHeader(),
    getCachedFooter(),
  ])

  return (
    <>
      <Header header={header} locale={params.locale} />
      {children}
      <Footer footer={footer} locale={params.locale} />
    </>
  )
}
```

## Troubleshooting

### Types not updating after changes
Run: `pnpm run generate:types`

### Components not rendering
- Check if Header/Footer globals are configured in Payload admin
- Verify globals are registered in `payload.config.ts`
- Check browser console and server logs for errors

### Navigation links not working
- Ensure pages collection exists and has the correct slug
- For external URLs, make sure the URL includes the protocol (https://)
- Check locale parameter is being passed correctly

## Contributing

When adding new features to this layout system:

1. Follow the existing directory structure
2. Add exports to index files
3. Update TypeScript types if needed
4. Document new features in this README
5. Keep components reusable and well-typed
