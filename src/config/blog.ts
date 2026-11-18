type Localized<T> = {en: T; id: T};
export type BlogLocale = "en" | "id";
export type BlogPost = {
  slug: string;
  date: string;
  preview: boolean;
  cover: string | null;
  coverAlt: Localized<string>;
  coverCredit: {name: string; url: string; license: string};
  references: {title: string; url: string}[];
  title: Localized<string>;
  description: Localized<string>;
  category: Localized<string>;
  sections: {id: string; title: Localized<string>; paragraphs: Localized<string[]>}[];
};

// Original bilingual articles. Dates use the publication date, not the source photo date.
export const blogPosts: BlogPost[] = [
  {
    "slug": "designing-interfaces-that-feel-simple-to-use",
    "date": "2026-11-18",
    "preview": false,
    "cover": "/images/blog/simple-interfaces.webp",
    "title": {
      "en": "Designing interfaces that feel simple to use",
      "id": "Merancang antarmuka yang terasa mudah digunakan"
    },
    "description": {
      "en": "Making complex interfaces clearer through hierarchy and spacing.",
      "id": "Memperjelas antarmuka kompleks melalui hierarki dan jarak."
    },
    "category": {
      "en": "Design",
      "id": "Desain"
    },
    "sections": [
      {
        "id": "section-1",
        "title": {
          "en": "A simple interface starts with a clear task",
          "id": "Antarmuka sederhana dimulai dari tugas yang jelas"
        },
        "paragraphs": {
          "en": [
            "A screen can look minimal and still be difficult to use. Removing borders, reducing colors, or leaving more empty space does not explain what someone should do next. Simplicity starts with deciding which task deserves the clearest path.",
            "Consider a mobile wallet home screen. The balance, recent activity, promotions, and payment actions all compete for space. If the immediate task is sending money, the transfer action needs a recognizable label and a predictable position. An attractive promotional banner should not make that action harder to find.",
            "Before arranging components, write one sentence: “This screen helps someone do ___.” Keep it specific enough to guide trade-offs. A page that helps someone compare three plans needs a different hierarchy from a page that helps an existing customer manage their subscription."
          ],
          "id": [
            "Layar bisa terlihat minimal tetapi tetap sulit digunakan. Menghapus border, mengurangi warna, atau memperbanyak ruang kosong belum menjelaskan apa yang perlu dilakukan pengguna berikutnya. Kesederhanaan dimulai dengan menentukan tugas yang membutuhkan jalur paling jelas.",
            "Bayangkan halaman utama dompet digital. Saldo, aktivitas terakhir, promosi, dan aksi pembayaran berebut ruang. Jika tugas terdekatnya adalah mengirim uang, aksi transfer membutuhkan label yang mudah dikenali dan posisi yang konsisten. Banner promosi yang menarik seharusnya tidak mempersulit pencarian aksi tersebut.",
            "Sebelum menyusun komponen, tulis satu kalimat: “Layar ini membantu seseorang untuk ___.” Buat cukup spesifik agar bisa memandu keputusan. Halaman untuk membandingkan tiga paket memerlukan hierarki berbeda dari halaman untuk mengelola langganan yang sudah aktif."
          ]
        }
      },
      {
        "id": "section-2",
        "title": {
          "en": "Build hierarchy before adding decoration",
          "id": "Bangun hierarki sebelum menambah dekorasi"
        },
        "paragraphs": {
          "en": [
            "Give the page a reading order: identify the subject, explain the essential information, then make the next action available. A large heading cannot do all of that alone. Labels, supporting copy, and button placement need to reinforce the same order.",
            "For an article card, the title introduces the topic, the category gives context, and the date is supporting information. Their visual weight should reflect those jobs. A medium-weight title and quieter metadata can establish a useful difference without turning every card into a collection of competing colors.",
            "Visual hierarchy and HTML structure are separate decisions that should support each other. A heading can be visually small and still need an h2 element. Logical heading levels help assistive technology navigate the page; choosing an element only because its default size looks right loses that structure."
          ],
          "id": [
            "Beri halaman urutan baca: kenalkan topiknya, jelaskan informasi penting, lalu sediakan langkah berikutnya. Judul besar tidak bisa mengerjakan semuanya sendirian. Label, teks pendukung, dan posisi tombol perlu menguatkan urutan yang sama.",
            "Pada card artikel, judul mengenalkan topik, kategori memberi konteks, dan tanggal menjadi informasi pendukung. Bobot visualnya perlu mencerminkan peran tersebut. Judul medium dan metadata yang lebih tenang bisa menciptakan perbedaan tanpa membuat setiap card berebut perhatian dengan warna.",
            "Hierarki visual dan struktur HTML merupakan keputusan berbeda yang perlu saling mendukung. Heading bisa terlihat kecil tetapi tetap membutuhkan elemen h2. Level heading yang logis membantu teknologi asistif menavigasi halaman; memilih elemen hanya berdasarkan ukuran bawaannya menghilangkan struktur itu."
          ]
        }
      },
      {
        "id": "section-3",
        "title": {
          "en": "Use spacing to describe relationships",
          "id": "Gunakan jarak untuk menjelaskan hubungan"
        },
        "paragraphs": {
          "en": [
            "Spacing works like punctuation. A short distance suggests that two elements belong together; a larger distance separates groups. If every gap is identical, a caption can feel as closely related to the next section as it does to its own image.",
            "A practical starting point is a small spacing scale such as 4, 8, 12, 16, 24, and 32 pixels. These are starting values, not a universal rule. Use a smaller gap between a title and its description, and a larger one between the complete card header and a new content group.",
            "Check the combined result rather than a single CSS value. Line height, the height of a badge, and an image’s internal empty space all affect perceived distance. Two elements with the same margin can still look different when one title occupies two lines."
          ],
          "id": [
            "Jarak bekerja seperti tanda baca. Jarak dekat menunjukkan bahwa dua elemen berkaitan; jarak lebih besar memisahkan kelompok. Jika semua gap sama, caption bisa terasa sama dekatnya dengan section berikutnya seperti dengan gambar miliknya sendiri.",
            "Titik awal yang praktis adalah skala jarak kecil seperti 4, 8, 12, 16, 24, dan 32 piksel. Angka ini merupakan titik awal, bukan aturan universal. Gunakan gap kecil antara judul dan deskripsi, lalu lebih besar antara kelompok informasi lengkap dan kelompok konten baru.",
            "Periksa hasil gabungannya, bukan satu nilai CSS saja. Line height, tinggi badge, dan ruang kosong di dalam gambar ikut memengaruhi jarak yang terasa. Dua elemen dengan margin sama tetap bisa terlihat berbeda ketika salah satu judul memakai dua baris."
          ]
        }
      },
      {
        "id": "section-4",
        "title": {
          "en": "Test the content that can break the layout",
          "id": "Uji konten yang bisa merusak layout"
        },
        "paragraphs": {
          "en": [
            "A tidy frame with short placeholder copy is an incomplete test. Replace the title with a longer one, change the language, and view the same component at a narrow width. These variations reveal where the layout depends on an assumption that will not always hold.",
            "For metadata such as a date and reading time, decide which parts must remain together. A date should not split unpredictably across lines. For a short card description, a single-line excerpt with an ellipsis can be reasonable when the full text is available on the article page.",
            "Avoid reserving large fixed heights just to make a screenshot look aligned. First decide whether equal card heights actually help people compare the content. If they do, use a consistent text budget or a flexible layout with a bottom-aligned metadata row, then inspect the result in both languages."
          ],
          "id": [
            "Frame rapi dengan teks contoh pendek belum menjadi pengujian lengkap. Ganti judul dengan yang lebih panjang, ubah bahasanya, lalu lihat komponen pada lebar sempit. Variasi ini memperlihatkan asumsi layout yang tidak selalu berlaku.",
            "Untuk metadata seperti tanggal dan waktu baca, tentukan bagian yang perlu tetap bersama. Tanggal sebaiknya tidak terpecah secara acak. Pada deskripsi singkat card, ringkasan satu baris dengan elipsis bisa masuk akal jika teks lengkap tersedia di halaman artikel.",
            "Hindari menyediakan tinggi tetap yang besar hanya agar screenshot terlihat sejajar. Tentukan dulu apakah tinggi card yang sama membantu orang membandingkan isinya. Jika iya, gunakan batas panjang teks yang konsisten atau layout fleksibel dengan metadata di bawah, lalu periksa hasilnya dalam kedua bahasa."
          ]
        }
      },
      {
        "id": "section-5",
        "title": {
          "en": "Finish with a task-based review",
          "id": "Akhiri dengan peninjauan berdasarkan tugas"
        },
        "paragraphs": {
          "en": [
            "Open the interface at its smallest supported width and follow the main task without relying on the design file. Check whether the first action is visible, whether labels explain the result, and whether keyboard focus follows a sensible order.",
            "Then revisit the sentence that defined the screen. Every element does not need to disappear, but each one should have a reason to be there. A useful interface can contain plenty of information while still giving people a clear place to start."
          ],
          "id": [
            "Buka antarmuka pada lebar terkecil yang didukung dan ikuti tugas utamanya tanpa bergantung pada file desain. Periksa apakah aksi pertama terlihat, label menjelaskan hasil, dan fokus keyboard mengikuti urutan yang masuk akal.",
            "Lalu kembali ke kalimat yang mendefinisikan layar tadi. Tidak semua elemen perlu dihilangkan, tetapi setiap elemen sebaiknya memiliki alasan untuk ada. Antarmuka tetap bisa memuat banyak informasi sambil memberi titik mulai yang jelas."
          ]
        }
      }
    ],
    "coverAlt": {
      "en": "A hand sketching interface wireframes in a notebook beside a keyboard.",
      "id": "Tangan menggambar wireframe antarmuka di buku catatan di samping keyboard."
    },
    "coverCredit": {
      "name": "Kelly Sikkema",
      "url": "https://unsplash.com/photos/a-person-writing-on-a-piece-of-paper-next-to-a-keyboard-Cg60_WXjvC4",
      "license": "https://unsplash.com/license"
    },
    "references": [
      {
        "title": "W3C WAI: Headings",
        "url": "https://www.w3.org/WAI/tutorials/page-structure/headings/"
      },
      {
        "title": "W3C WAI: Writing for Web Accessibility",
        "url": "https://www.w3.org/WAI/tips/writing/"
      }
    ]
  },
  {
    "slug": "bringing-interface-designs-into-the-browser",
    "date": "2026-11-18",
    "preview": false,
    "cover": "/images/blog/figma-to-browser.webp",
    "title": {
      "en": "Bringing interface designs into the browser",
      "id": "Mewujudkan desain antarmuka di browser"
    },
    "description": {
      "en": "Turning Figma details into responsive interfaces.",
      "id": "Mewujudkan detail Figma menjadi antarmuka responsif."
    },
    "category": {
      "en": "Development",
      "id": "Pengembangan"
    },
    "sections": [
      {
        "id": "section-1",
        "title": {
          "en": "Translate rules, not just coordinates",
          "id": "Terjemahkan aturan, bukan sekadar koordinat"
        },
        "paragraphs": {
          "en": [
            "A Figma frame captures one arrangement of content. The browser has to keep that arrangement understandable when the viewport changes, a title grows, or a control receives keyboard focus. Rebuilding the frame therefore starts with identifying the rules behind it.",
            "Look at a row containing a category and a date. The important rule might be “category on the left, date on the right, with enough room between them.” Copying their x coordinates would describe one screenshot. A two-column layout with a flexible first column describes the relationship.",
            "Before writing components, note which dimensions are fixed and which should adapt. An icon may stay 16 pixels wide while a text column takes the remaining space. Treating both as fixed widths makes the layout fragile before any responsive styling is added."
          ],
          "id": [
            "Frame Figma menangkap satu susunan konten. Browser perlu menjaga susunan tersebut tetap bisa dipahami ketika viewport berubah, judul memanjang, atau kontrol mendapat fokus keyboard. Karena itu, membangun ulang frame dimulai dengan mengenali aturan di baliknya.",
            "Lihat baris yang berisi kategori dan tanggal. Aturan pentingnya mungkin “kategori di kiri, tanggal di kanan, dengan ruang yang cukup di antaranya.” Menyalin koordinat x hanya menggambarkan satu screenshot. Layout dua kolom dengan kolom pertama fleksibel menjelaskan hubungannya.",
            "Sebelum menulis komponen, catat dimensi mana yang tetap dan mana yang perlu menyesuaikan. Ikon bisa tetap selebar 16 piksel sementara kolom teks memakai ruang tersisa. Menetapkan lebar tetap untuk keduanya membuat layout rapuh bahkan sebelum styling responsif ditambahkan."
          ]
        }
      },
      {
        "id": "section-2",
        "title": {
          "en": "Define a small shared vocabulary",
          "id": "Tentukan kosakata visual bersama"
        },
        "paragraphs": {
          "en": [
            "Repeated decisions are good candidates for shared tokens: background, foreground, border color, radius, typography, and spacing. In a Tailwind and shadcn/ui project, semantic names such as background, muted, and foreground let components describe a role rather than a specific light-mode color.",
            "Use those roles consistently before adding exceptions. A secondary description should not switch between unrelated gray values across the page. Keeping its meaning in one place makes theme changes and contrast review easier to reason about.",
            "The same principle applies to radius and size. If tags and small icon containers belong to the same visual family, give them a shared radius. They can still have different heights where their content requires it; the relationship should be deliberate."
          ],
          "id": [
            "Keputusan yang berulang cocok dijadikan token bersama: background, foreground, warna border, radius, tipografi, dan jarak. Pada proyek Tailwind dan shadcn/ui, nama semantik seperti background, muted, dan foreground memungkinkan komponen menyatakan peran alih-alih warna khusus mode terang.",
            "Gunakan peran tersebut secara konsisten sebelum menambahkan pengecualian. Deskripsi sekunder tidak perlu berpindah-pindah di antara nilai abu-abu yang tidak berkaitan. Menyatukan maknanya mempermudah penyesuaian tema dan peninjauan kontras.",
            "Prinsip yang sama berlaku untuk radius dan ukuran. Jika tag dan pembungkus ikon kecil berada dalam keluarga visual yang sama, berikan radius bersama. Tingginya tetap boleh berbeda sesuai kebutuhan isi; hubungan tersebut sebaiknya merupakan keputusan yang disengaja."
          ]
        }
      },
      {
        "id": "section-3",
        "title": {
          "en": "Choose elements by their behavior",
          "id": "Pilih elemen berdasarkan perilakunya"
        },
        "paragraphs": {
          "en": [
            "A link changes location; a button performs an action. A navigation item should remain a link even if it looks like a button. A theme toggle should remain a button even if it contains only an icon.",
            "This distinction gives the browser useful behavior without extra code. Links support opening in a new tab and copying their destination. Buttons support activation through the keyboard. Recreating either with a clickable div means rebuilding behavior that already exists.",
            "Add the other states while implementing the component: focus, disabled, loading, selected, and error. A polished default state is only one part of the design. The surrounding layout should still work when the control explains a failure or a longer confirmation message."
          ],
          "id": [
            "Tautan berpindah lokasi; tombol menjalankan aksi. Item navigasi tetap sebaiknya berupa tautan meskipun tampil seperti tombol. Pengganti tema tetap berupa tombol meskipun hanya berisi ikon.",
            "Perbedaan ini memberi perilaku browser yang berguna tanpa kode tambahan. Tautan mendukung buka tab baru dan salin tujuan. Tombol mendukung aktivasi melalui keyboard. Menggantikannya dengan div yang dapat diklik berarti membangun ulang perilaku yang sebenarnya sudah tersedia.",
            "Tambahkan kondisi lain saat mengimplementasikan komponen: fokus, disabled, loading, terpilih, dan error. Tampilan default yang rapi hanya satu bagian dari desain. Layout di sekitarnya tetap perlu bekerja ketika kontrol menjelaskan kegagalan atau konfirmasi yang lebih panjang."
          ]
        }
      },
      {
        "id": "section-4",
        "title": {
          "en": "Let content decide when the layout changes",
          "id": "Biarkan konten menentukan perubahan layout"
        },
        "paragraphs": {
          "en": [
            "Begin with a narrow layout that preserves the reading order. Expand it gradually and introduce more columns when the content has enough room. A breakpoint is useful when it solves a layout problem, not simply because a device category has a familiar name.",
            "For a project grid, one column may work on mobile, two on a medium screen, and three on desktop. Test the widths between those states as well. A card can fit its container while its title, date, or badge still overflows.",
            "Long text needs an explicit policy. In CSS Grid, minmax(0, 1fr) allows a flexible track to shrink; a child may also need min-width: 0. Decide separately whether text should wrap, truncate, or move to another row. Hiding overflow should follow that decision rather than conceal an unexplained width problem."
          ],
          "id": [
            "Mulai dari layout sempit yang menjaga urutan baca. Lebarkan secara bertahap dan tambahkan kolom ketika konten memiliki ruang yang cukup. Breakpoint berguna ketika menyelesaikan masalah layout, bukan sekadar mengikuti nama kategori perangkat.",
            "Untuk grid proyek, satu kolom bisa bekerja di mobile, dua di layar menengah, dan tiga di desktop. Uji juga lebar di antara kondisi tersebut. Sebuah card bisa muat di container sementara judul, tanggal, atau badge di dalamnya tetap meluber.",
            "Teks panjang membutuhkan kebijakan yang jelas. Pada CSS Grid, minmax(0, 1fr) memungkinkan track fleksibel menyusut; elemen di dalamnya bisa memerlukan min-width: 0. Tentukan secara terpisah apakah teks perlu membungkus, dipotong, atau pindah baris. Menyembunyikan overflow perlu mengikuti keputusan itu, bukan menutupi masalah lebar yang belum dipahami."
          ]
        }
      },
      {
        "id": "section-5",
        "title": {
          "en": "Review the browser as its own environment",
          "id": "Tinjau browser sebagai lingkungan tersendiri"
        },
        "paragraphs": {
          "en": [
            "Use the design file to check visual intent, then test the browser result with keyboard navigation, zoom, both themes, and both languages. Check image loading and empty states as well as the completed screen.",
            "Finish with a small verification loop: compare, identify one mismatch, adjust the shared rule, and inspect the affected components again. The aim is an interface that preserves the design’s intent while responding to conditions a static frame cannot show."
          ],
          "id": [
            "Gunakan file desain untuk memeriksa maksud visual, lalu uji hasil browser menggunakan keyboard, zoom, kedua tema, dan kedua bahasa. Periksa pemuatan gambar serta kondisi kosong, bukan hanya layar yang sudah terisi lengkap.",
            "Akhiri dengan siklus verifikasi kecil: bandingkan, temukan satu ketidaksesuaian, sesuaikan aturan bersama, lalu tinjau kembali komponen yang terpengaruh. Tujuannya adalah antarmuka yang mempertahankan maksud desain sekaligus menanggapi kondisi yang tidak terlihat pada frame statis."
          ]
        }
      }
    ],
    "coverAlt": {
      "en": "A developer working on code at a laptop beside a plant and mug.",
      "id": "Pengembang menulis kode pada laptop di samping tanaman dan cangkir."
    },
    "coverCredit": {
      "name": "Nubelson Fernandes",
      "url": "https://unsplash.com/photos/person-coding-on-laptop-workspace-UcYBL5V0xWQ",
      "license": "https://unsplash.com/license"
    },
    "references": [
      {
        "title": "MDN: Responsive web design",
        "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design"
      },
      {
        "title": "web.dev: Responsive web design basics",
        "url": "https://web.dev/articles/responsive-web-design-basics"
      }
    ]
  },
  {
    "slug": "small-details-that-make-digital-experiences-feel-better",
    "date": "2026-11-18",
    "preview": false,
    "cover": "/images/blog/interaction-details.webp",
    "title": {
      "en": "Small details that make digital experiences feel better",
      "id": "Detail kecil yang membuat pengalaman digital lebih nyaman"
    },
    "description": {
      "en": "A closer look at the details behind everyday interactions.",
      "id": "Melihat lebih dekat detail di balik interaksi sehari-hari."
    },
    "category": {
      "en": "Thoughts",
      "id": "Catatan"
    },
    "sections": [
      {
        "id": "section-1",
        "title": {
          "en": "Answer the question after every action",
          "id": "Jawab pertanyaan setelah setiap aksi"
        },
        "paragraphs": {
          "en": [
            "After pressing a control, a visitor needs to understand what happened. Did the link copy? Did the theme change? Is the request still loading? These questions are small, but leaving them unanswered can make an otherwise tidy interface feel uncertain.",
            "For a copy action, change the label to “Copied” or show a short confirmation beside the control. If copying fails, say so and offer a workable next step. A check icon should represent a successful result rather than appear immediately before the operation has completed.",
            "Keep the feedback near its trigger, and expose important status messages to assistive technology. The visual placement and the announcement solve different problems; neither replaces the other."
          ],
          "id": [
            "Setelah menekan kontrol, pengunjung perlu memahami apa yang terjadi. Apakah tautannya tersalin? Apakah temanya berubah? Apakah permintaan masih dimuat? Pertanyaan ini kecil, tetapi membiarkannya tanpa jawaban bisa membuat antarmuka yang rapi terasa meragukan.",
            "Untuk aksi salin, ubah label menjadi “Tersalin” atau tampilkan konfirmasi singkat di dekat kontrol. Jika gagal, jelaskan kegagalannya dan tawarkan langkah berikutnya yang bisa dilakukan. Ikon centang perlu mewakili keberhasilan, bukan muncul sebelum proses selesai.",
            "Letakkan respons dekat dengan pemicunya dan sediakan pesan status penting bagi teknologi asistif. Penempatan visual dan pengumuman menyelesaikan masalah berbeda; keduanya tidak saling menggantikan."
          ]
        }
      },
      {
        "id": "section-2",
        "title": {
          "en": "Make the current location recognizable",
          "id": "Buat posisi halaman mudah dikenali"
        },
        "paragraphs": {
          "en": [
            "A portfolio often has only a few navigation items, but visitors still need to know where they are. An active text color and a modest weight change can be enough. A permanent filled background is a stylistic choice, not a requirement.",
            "On an individual project page, the Work section should stay active. The matching rule needs to recognize child routes without accidentally marking a similarly named section as selected. The Home item should be active only on the homepage.",
            "Breadcrumbs help at a different level. A “Blog → article title” trail gives someone a route back to the article list while showing the current page. Keep a long final label from pushing toolbar actions beyond the screen."
          ],
          "id": [
            "Portofolio biasanya hanya memiliki beberapa menu, tetapi pengunjung tetap perlu mengetahui posisinya. Warna teks aktif dan perubahan ketebalan yang ringan bisa cukup. Background terisi secara permanen merupakan pilihan gaya, bukan keharusan.",
            "Pada halaman detail proyek, bagian Karya perlu tetap aktif. Aturan pencocokannya harus mengenali rute anak tanpa memilih bagian lain yang namanya mirip. Menu Beranda hanya aktif pada halaman utama.",
            "Breadcrumb membantu pada tingkat berbeda. Jejak “Blog → judul artikel” memberi jalan kembali ke daftar artikel sambil menunjukkan halaman saat ini. Pastikan label terakhir yang panjang tidak mendorong tombol toolbar keluar layar."
          ]
        }
      },
      {
        "id": "section-3",
        "title": {
          "en": "Make numbers explain what they measure",
          "id": "Buat angka menjelaskan apa yang diukur"
        },
        "paragraphs": {
          "en": [
            "An activity heatmap can look convincing while describing the wrong period. A calendar year and the last twelve months overlap, but they are different ranges. The selected year, visible dates, and total all need to describe the same data.",
            "For a yearly view, use January 1 through December 31 of the selected year and keep each day attached to its original contribution count. If the upstream source is unavailable, an unavailable state is more honest than displaying a fallback total as if it were current.",
            "Monospaced numerals can make changing times and counts feel steadier, but the typeface cannot establish correctness. Formatting, labels, validation, and the data source are all part of the experience."
          ],
          "id": [
            "Heatmap aktivitas bisa terlihat meyakinkan sambil menjelaskan periode yang salah. Tahun kalender dan dua belas bulan terakhir memang beririsan, tetapi rentangnya berbeda. Tahun terpilih, tanggal yang terlihat, dan total perlu menggambarkan data yang sama.",
            "Untuk tampilan tahunan, gunakan 1 Januari sampai 31 Desember pada tahun terpilih dan pertahankan jumlah kontribusi asli setiap tanggal. Ketika sumber tidak tersedia, status tidak tersedia lebih jujur daripada angka pengganti yang tampak seperti data terbaru.",
            "Angka monospaced bisa membuat jam dan hitungan yang berubah terasa lebih stabil, tetapi jenis huruf tidak menjamin kebenaran. Format, label, validasi, dan sumber data sama-sama menjadi bagian dari pengalaman."
          ]
        }
      },
      {
        "id": "section-4",
        "title": {
          "en": "Use motion to connect a cause and its result",
          "id": "Gunakan gerak untuk menghubungkan aksi dan hasil"
        },
        "paragraphs": {
          "en": [
            "A short transition can explain that a panel opened or a theme control changed state. It should support the action without delaying access to the content. If someone has already decided to open a menu, they should not have to wait through a long entrance sequence.",
            "Keep essential information visible even when animation is disabled. Respect reduced-motion preferences by removing unnecessary movement and smooth scrolling where appropriate. The interface should remain understandable with an immediate state change.",
            "A useful check is to remove the transition temporarily. If the interaction no longer makes sense, improve the label, position, or state indicator before adding motion back."
          ],
          "id": [
            "Transisi singkat bisa menjelaskan bahwa panel terbuka atau kontrol tema berubah kondisi. Gerak perlu mendukung aksi tanpa menunda akses ke konten. Ketika seseorang sudah memilih membuka menu, ia sebaiknya tidak perlu menunggu animasi masuk yang panjang.",
            "Pastikan informasi penting tetap terlihat ketika animasi dinonaktifkan. Hormati preferensi reduced motion dengan menghilangkan gerakan yang tidak diperlukan dan smooth scrolling bila sesuai. Antarmuka tetap perlu dipahami saat perubahan terjadi langsung.",
            "Pemeriksaan yang berguna adalah menghapus transisi sementara. Jika interaksinya tidak lagi jelas, perbaiki label, posisi, atau penanda kondisi sebelum mengembalikan geraknya."
          ]
        }
      },
      {
        "id": "section-5",
        "title": {
          "en": "Review the details as one system",
          "id": "Tinjau detail sebagai satu sistem"
        },
        "paragraphs": {
          "en": [
            "Look at links, badges, icon containers, dates, and focus states together. Similar roles should use related sizing and spacing. Different roles can look different, but those differences should be explainable.",
            "Finish by walking through one complete visit: open a project, return to the list, change language, copy a link, and read an article on a small screen. This is a practical review, not a substitute for research with users. It helps uncover gaps between individually polished components."
          ],
          "id": [
            "Lihat tautan, badge, pembungkus ikon, tanggal, dan fokus sebagai satu kesatuan. Peran yang mirip perlu memakai ukuran serta jarak yang berkaitan. Peran berbeda boleh terlihat berbeda, tetapi perbedaannya sebaiknya bisa dijelaskan.",
            "Akhiri dengan mengikuti satu kunjungan lengkap: buka proyek, kembali ke daftar, ganti bahasa, salin tautan, lalu baca artikel pada layar kecil. Ini peninjauan praktis, bukan pengganti riset bersama pengguna. Langkah ini membantu menemukan celah di antara komponen yang sudah rapi secara terpisah."
          ]
        }
      }
    ],
    "coverAlt": {
      "en": "A hand holding a smartphone against a neutral background.",
      "id": "Tangan memegang smartphone dengan latar netral."
    },
    "coverCredit": {
      "name": "Lorin Both",
      "url": "https://unsplash.com/photos/a-hand-holds-up-a-smartphone-_Q5HFTpOvDI",
      "license": "https://unsplash.com/license"
    },
    "references": [
      {
        "title": "W3C WAI: Status Messages",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html"
      },
      {
        "title": "W3C WAI: Animation from Interactions",
        "url": "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html"
      }
    ]
  }
];

export function getReadingMinutes(post: BlogPost, locale: BlogLocale): number {
  const text = [post.title[locale], post.description[locale], ...post.sections.flatMap((section) => [section.title[locale], ...section.paragraphs[locale]])].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/u).length / 200));
}
