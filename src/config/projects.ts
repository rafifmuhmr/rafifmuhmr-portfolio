type LocalizedCopy = {en: string; id: string};
export type PortfolioProject = {
  slug: string;
  title: string;
  description: LocalizedCopy;
  subtitle: LocalizedCopy;
  tags: {en: string[]; id: string[]};
  role: LocalizedCopy;
  scope: LocalizedCopy;
  platform: "Web" | "Mobile";
  overview: LocalizedCopy;
  highlights: {en: string[]; id: string[]};
  category: "UI/UX Design" | "Frontend Development" | "Graphic Design";
  /** Work year confirmed by the owner; no inferred publication day. */
  year: number;
  timeline: LocalizedCopy;
  cover: string;
  gallery: string[];
  href: string;
  sourceUrl: string;
  tool?: string;
};

// Product facts: UI8 Micholabs listing and store.micholabs.com.
// Project ownership and work year were confirmed by Rafif.
export const projects: PortfolioProject[] = [
  {
    slug: "pulseco", title: "PulseCo", category: "UI/UX Design", year: 2026, tool: "Figma",
    timeline: {en: "June 2026", id: "Juni 2026"},
    role: {en: "UI/UX Designer", id: "Desainer UI/UX"},
    scope: {en: "Website UI design", id: "Desain UI website"}, platform: "Web",
    tags: {en: ["UI/UX Design", "Website", "Creative Agency"], id: ["Desain UI/UX", "Website", "Agensi Kreatif"]},
    subtitle: {en: "Creative agency website", id: "Website agensi kreatif"},
    description: {en: "A website design for a creative agency, published through Micholabs.", id: "Desain website untuk agensi kreatif yang dipublikasikan melalui Micholabs."},
    overview: {en: "PulseCo is a creative agency website listed in Micholabs’ UI8 collection. This project focuses on website interface design for the creative agency space.", id: "PulseCo adalah website agensi kreatif dalam koleksi UI8 Micholabs. Proyek ini berfokus pada desain antarmuka website untuk bidang agensi kreatif."},
    highlights: {en: ["Creative agency website", "Published by Micholabs on UI8"], id: ["Website agensi kreatif", "Dipublikasikan oleh Micholabs di UI8"]},
    cover: "/images/projects/pulseco-cover.webp", gallery: ["/images/projects/pulseco-preview-1.webp", "/images/projects/pulseco-preview-2.webp", "/images/projects/pulseco-preview-3.webp", "/images/projects/pulseco-preview-4.webp", "/images/projects/pulseco-preview-5.webp"], href: "/work/pulseco",
    sourceUrl: "https://ui8.net/micholabs/products/pulseco---creative-agency-website",
  },
  {
    slug: "taniqu", title: "TaniQu", category: "UI/UX Design", year: 2026, tool: "Figma",
    timeline: {en: "July 2026", id: "Juli 2026"},
    role: {en: "UI/UX Designer", id: "Desainer UI/UX"},
    scope: {en: "Responsive website UI kit", id: "UI kit website responsif"}, platform: "Web",
    tags: {en: ["UI/UX Design", "Website", "Agriculture"], id: ["Desain UI/UX", "Website", "Pertanian"]},
    subtitle: {en: "Smart farming website", id: "Website pertanian cerdas"},
    description: {en: "A smart farming website UI kit for agriculture, farming technology, and eco-friendly businesses.", id: "UI kit website pertanian cerdas untuk pertanian, teknologi agrikultur, dan bisnis ramah lingkungan."},
    overview: {en: "TaniQu brings a clean, modern interface to smart farming websites. Designed in Figma, the kit includes responsive layouts, organized layers, components, and variants to support customization.", id: "TaniQu menghadirkan antarmuka yang bersih dan modern untuk website pertanian cerdas. Dirancang di Figma, kit ini menyediakan layout responsif, layer yang terorganisasi, komponen, dan varian untuk mendukung kustomisasi."},
    highlights: {en: ["Responsive website layouts", "Figma components and variants", "Organized layers", "Customizable UI design"], id: ["Layout website responsif", "Komponen dan varian Figma", "Layer terorganisasi", "Desain UI yang bisa disesuaikan"]},
    cover: "/images/projects/taniqu-cover.webp", gallery: ["/images/projects/taniqu-preview-1.webp", "/images/projects/taniqu-preview-2.webp", "/images/projects/taniqu-preview-3.webp", "/images/projects/taniqu-preview-4.webp", "/images/projects/taniqu-preview-5.webp", "/images/projects/taniqu-preview-6.webp", "/images/projects/taniqu-preview-7.webp"], href: "/work/taniqu",
    sourceUrl: "https://ui8.net/micholabs/products/taniqu---smart-farming-website",
  },
  {
    slug: "payra", title: "Payra", category: "UI/UX Design", year: 2026, tool: "Figma",
    timeline: {en: "September 2026", id: "September 2026"},
    role: {en: "UI/UX Designer", id: "Desainer UI/UX"},
    scope: {en: "Mobile e-wallet UI kit", id: "UI kit dompet digital mobile"}, platform: "Mobile",
    tags: {en: ["UI/UX Design", "Mobile App", "Fintech"], id: ["Desain UI/UX", "Aplikasi Mobile", "Fintech"]},
    subtitle: {en: "E-wallet mobile app", id: "Aplikasi mobile dompet digital"},
    description: {en: "A mobile e-wallet UI kit for everyday payments, money transfers, and spending insights.", id: "UI kit dompet digital mobile untuk pembayaran harian, transfer uang, dan informasi pengeluaran."},
    overview: {en: "Payra is a digital payment UI kit covering onboarding, wallet setup, transactions, and spending analytics. It includes more than 55 screens, Figma Auto Layout, and a design system with reusable components and variants.", id: "Payra adalah UI kit pembayaran digital yang mencakup onboarding, pengaturan dompet, transaksi, dan analitik pengeluaran. Kit ini menyediakan lebih dari 55 layar, Figma Auto Layout, serta design system dengan komponen dan varian yang dapat digunakan kembali."},
    highlights: {en: ["55+ mobile UI screens", "Onboarding and wallet setup", "Transactions and spending analytics", "Figma Auto Layout", "Reusable components and variants"], id: ["55+ layar UI mobile", "Onboarding dan pengaturan dompet", "Transaksi dan analitik pengeluaran", "Figma Auto Layout", "Komponen dan varian yang dapat digunakan kembali"]},
    cover: "/images/projects/payra-cover.webp", gallery: ["/images/projects/payra-preview-1.webp", "/images/projects/payra-preview-2.webp", "/images/projects/payra-preview-3.webp", "/images/projects/payra-preview-4.webp", "/images/projects/payra-preview-5.webp", "/images/projects/payra-preview-6.webp", "/images/projects/payra-preview-7.webp"], href: "/work/payra",
    sourceUrl: "https://ui8.net/micholabs/products/payra---e-wallet-mobile-app",
  },
];

export function getLatestProjects(limit = 3): PortfolioProject[] {
  // Keep the editorial order within the same year until exact dates are supplied.
  return [...projects].sort((a, b) => b.year - a.year).slice(0, limit);
}
