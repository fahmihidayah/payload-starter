import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Globe,
  type LucideIcon,
} from 'lucide-react'

interface SocialIconProps {
  platform: string
  url: string
  customIconName?: string
}

export function SocialIcon({ platform, url, customIconName }: SocialIconProps) {
  const iconMap: Record<string, LucideIcon> = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
    github: Github,
    tiktok: Globe, // Lucide doesn't have TikTok, using Globe as fallback
    other: Globe,
  }

  const Icon = iconMap[platform] || Globe

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label={`Visit us on ${customIconName || platform}`}
    >
      <Icon className="w-5 h-5" />
    </a>
  )
}
