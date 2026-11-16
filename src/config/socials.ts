import type {SocialPlatform} from "@/components/layout/social-icon";

// Profile URLs confirmed by the owner.
export const socialLinks: {platform: SocialPlatform; label: string; href: string}[] = [
  {platform: "instagram", label: "Instagram", href: "https://www.instagram.com/rafifmuhmr"},
  {platform: "threads", label: "Threads", href: "https://www.threads.com/@rafifmuhmr"},
  {platform: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/rafifmuhmr"},
  {platform: "github", label: "GitHub", href: "https://github.com/rafifmuhmr"},
  {platform: "substack", label: "Substack", href: "https://substack.com/@rafifmuhmr"},
];
export const instagramUrl = socialLinks.find((social) => social.platform === "instagram")?.href || null;
