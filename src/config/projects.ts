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
  format?: "socialMedia";
  overview: LocalizedCopy;
  challenge: LocalizedCopy;
  process: {title: LocalizedCopy; description: LocalizedCopy}[];
  solution: LocalizedCopy;
  deliverables: {en: string[]; id: string[]};
  reflection: LocalizedCopy;
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
    challenge: {en: "Give a creative agency a clear digital presence while leaving room for its visual identity. The design challenge is to balance expressive presentation with a website structure that is easy to follow.", id: "Menghadirkan identitas digital agensi kreatif dengan struktur website yang mudah diikuti. Tantangan desainnya adalah menyeimbangkan ekspresi visual dengan kejelasan informasi."},
    process: [
      {
        title: {en: "References", id: "Referensi"},
        description: {en: "Explore creative agency website references to establish the visual direction and ways to present an agency online.", id: "Mengeksplorasi referensi website agensi kreatif untuk menentukan arah visual dan cara memperkenalkan agensi secara online."},
      },
      {
        title: {en: "Problem solving", id: "Pemecahan masalah"},
        description: {en: "Focus the layout on a readable information hierarchy so visual expression supports the content.", id: "Memusatkan layout pada hierarki informasi yang mudah dibaca agar ekspresi visual mendukung isi halaman."},
      },
      {
        title: {en: "Components", id: "Komponen"},
        description: {en: "Define recurring interface elements to keep the website visually consistent.", id: "Menentukan elemen antarmuka yang berulang untuk menjaga konsistensi visual website."},
      },
      {
        title: {en: "High-fidelity design", id: "Desain high-fidelity"},
        description: {en: "Bring the structure and visual direction together in the final website interface in Figma.", id: "Menggabungkan struktur dan arah visual menjadi desain antarmuka website akhir di Figma."},
      },
    ],
    solution: {en: "The solution takes the form of a creative agency website design. Page composition and consistent interface elements provide a framework for presenting the agency’s identity. The previews below show the final visual direction.", id: "Solusinya berupa desain website agensi kreatif. Komposisi halaman dan elemen antarmuka yang konsisten menjadi kerangka untuk memperkenalkan identitas agensi. Preview berikut menampilkan arah visual akhirnya."},
    reflection: {en: "PulseCo is published through Micholabs on UI8. A useful next step would be to evaluate the design with real agency content, checking whether the visual hierarchy still supports longer copy and different project imagery.", id: "PulseCo dipublikasikan melalui Micholabs di UI8. Pengembangan berikutnya dapat mengevaluasi desain dengan konten agensi nyata, terutama untuk melihat apakah hierarki visual tetap mendukung teks yang lebih panjang dan gambar proyek yang beragam."},
    deliverables: {en: ["Creative agency website interface", "Figma design file"], id: ["Antarmuka website agensi kreatif", "File desain Figma"]},
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
    challenge: {en: "Create a website UI kit for smart farming that can adapt to agriculture, farming technology, and eco-friendly businesses. The challenge is to pair a clear visual structure with enough flexibility for different content and screen sizes.", id: "Membuat UI kit website pertanian cerdas yang dapat disesuaikan untuk pertanian, teknologi agrikultur, dan bisnis ramah lingkungan. Tantangannya adalah memadukan struktur visual yang jelas dengan fleksibilitas untuk beragam konten dan ukuran layar."},
    process: [
      {
        title: {en: "References", id: "Referensi"},
        description: {en: "Explore agriculture and smart farming website references to shape a clean, modern visual direction.", id: "Mengeksplorasi referensi website pertanian dan smart farming untuk membentuk arah visual yang bersih dan modern."},
      },
      {
        title: {en: "Problem solving", id: "Pemecahan masalah"},
        description: {en: "Organize the website layout around clear content hierarchy and responsive presentation.", id: "Menyusun layout website dengan fokus pada hierarki konten yang jelas dan tampilan responsif."},
      },
      {
        title: {en: "Components", id: "Komponen"},
        description: {en: "Build Figma components and variants, with organized layers to support customization.", id: "Membuat komponen dan variants di Figma, dengan layer yang terorganisasi untuk mendukung kustomisasi."},
      },
      {
        title: {en: "High-fidelity design", id: "Desain high-fidelity"},
        description: {en: "Apply the visual direction and components across the responsive website layouts.", id: "Menerapkan arah visual dan komponen ke dalam layout website responsif."},
      },
    ],
    solution: {en: "Responsive layouts address different screen sizes, while components and variants provide a consistent foundation for customization. Organized Figma layers make the kit easier to adapt to a business’s content. The previews below show how these elements come together in the final interface.", id: "Layout responsif mengakomodasi berbagai ukuran layar, sementara komponen dan variants menyediakan dasar yang konsisten untuk kustomisasi. Layer Figma yang terorganisasi membantu penyesuaian kit dengan konten bisnis. Preview berikut memperlihatkan penerapannya dalam antarmuka akhir."},
    reflection: {en: "The result is a customizable smart farming website UI kit. A useful next step would be to try the layouts with content from different agriculture businesses and check how the components accommodate varying text lengths and imagery.", id: "Hasil akhirnya adalah UI kit website pertanian cerdas yang dapat dikustomisasi. Pengembangan berikutnya dapat mencoba layout dengan konten dari berbagai bisnis pertanian dan meninjau bagaimana komponen mengakomodasi panjang teks serta gambar yang berbeda."},
    deliverables: {en: ["Responsive website layouts", "Figma components and variants", "Organized layers", "Customizable UI design"], id: ["Layout website responsif", "Komponen dan varian Figma", "Layer terorganisasi", "Desain UI yang bisa disesuaikan"]},
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
    challenge: {en: "Bring onboarding, wallet setup, transactions, and spending analytics into one mobile UI kit. The design challenge is to keep these different payment activities visually connected while making each screen’s information easy to distinguish.", id: "Menyatukan onboarding, pengaturan dompet, transaksi, dan analitik pengeluaran dalam satu UI kit mobile. Tantangan desainnya adalah menjaga keterkaitan visual antaraktivitas pembayaran sekaligus membedakan informasi di setiap layar dengan jelas."},
    process: [
      {
        title: {en: "References", id: "Referensi"},
        description: {en: "Explore mobile wallet interface references to establish a visual direction for the payment experience.", id: "Mengeksplorasi referensi antarmuka dompet digital untuk menentukan arah visual pengalaman pembayaran."},
      },
      {
        title: {en: "Problem solving", id: "Pemecahan masalah"},
        description: {en: "Organize the interface around the kit’s key activities: onboarding, wallet setup, transactions, and spending insights.", id: "Menyusun antarmuka berdasarkan aktivitas utama kit: onboarding, pengaturan dompet, transaksi, dan informasi pengeluaran."},
      },
      {
        title: {en: "Components", id: "Komponen"},
        description: {en: "Build reusable components and variants in Figma, using Auto Layout as part of the design system.", id: "Membuat komponen dan variants yang dapat digunakan kembali di Figma, dengan Auto Layout sebagai bagian dari design system."},
      },
      {
        title: {en: "High-fidelity design", id: "Desain high-fidelity"},
        description: {en: "Apply the design system across more than 55 mobile screens to connect the different parts of the wallet experience.", id: "Menerapkan design system pada lebih dari 55 layar mobile untuk menghubungkan berbagai bagian pengalaman dompet digital."},
      },
    ],
    solution: {en: "Payra groups the wallet experience into onboarding, setup, transactions, and analytics screens. Reusable components and variants keep the interface consistent across more than 55 screens, while Figma Auto Layout supports adapting the layouts. The previews below show the resulting mobile UI.", id: "Payra membagi pengalaman dompet digital ke dalam layar onboarding, pengaturan, transaksi, dan analitik. Komponen dan variants yang dapat digunakan kembali menjaga konsistensi pada lebih dari 55 layar, sementara Figma Auto Layout mendukung penyesuaian layout. Preview berikut menampilkan hasil UI mobile-nya."},
    reflection: {en: "The result is a mobile e-wallet UI kit with a reusable design system. A useful next step would be to test a prototype of the payment flows, paying particular attention to whether people understand transaction details and confirmation states.", id: "Hasil akhirnya adalah UI kit dompet digital mobile dengan design system yang dapat digunakan kembali. Pengembangan berikutnya dapat menguji prototipe alur pembayaran, khususnya pemahaman pengguna terhadap detail transaksi dan status konfirmasi."},
    deliverables: {en: ["55+ mobile UI screens", "Onboarding and wallet setup", "Transactions and spending analytics", "Figma Auto Layout", "Reusable components and variants"], id: ["55+ layar UI mobile", "Onboarding dan pengaturan dompet", "Transaksi dan analitik pengeluaran", "Figma Auto Layout", "Komponen dan varian yang dapat digunakan kembali"]},
    cover: "/images/projects/payra-cover.webp", gallery: ["/images/projects/payra-preview-1.webp", "/images/projects/payra-preview-2.webp", "/images/projects/payra-preview-3.webp", "/images/projects/payra-preview-4.webp", "/images/projects/payra-preview-5.webp", "/images/projects/payra-preview-6.webp", "/images/projects/payra-preview-7.webp"], href: "/work/payra",
    sourceUrl: "https://ui8.net/micholabs/products/payra---e-wallet-mobile-app",
  },
];

export function getLatestProjects(limit = 3): PortfolioProject[] {
  // Keep the editorial order within the same year until exact dates are supplied.
  return [...projects].sort((a, b) => b.year - a.year).slice(0, limit);
}
