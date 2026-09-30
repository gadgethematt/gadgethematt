import { ProductItem, ReviewArticle, CategoryItem, AffiliateLinkItem, MediaItem, ArticleComment } from '../types';

import sageTwsImg from '../assets/images/gadgethematt_sage_tws_1790732324440.jpg';
import redmiBudsImg from '../assets/images/redmi_buds_6_play_1790732343833.jpg';
import soundcoreImg from '../assets/images/soundcore_liberty_5_1790729961290.jpg';
import realmeBudsImg from '../assets/images/realme_buds_t310_1790732354332.jpg';
import cmfBudsImg from '../assets/images/cmf_buds_2a_1790732365222.jpg';
import huaweiBudsImg from '../assets/images/huawei_freebuds_se4_1790732378343.jpg';
import twsCaseImg from '../assets/images/tws_product_case_1790083633867.jpg';

export const OFFICIAL_AFFILIATE_LINKS = {
  LINK_1: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
  LINK_2: 'https://vt.tokopedia.com/t/ZS9AfTPgHB4BE-8l5Fi/',
  LINK_3: 'https://vt.tokopedia.com/t/ZS9AfTqfVYULk-KOYES/'
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-sage-hero',
    slug: 'gadgethematt-freedom-tws',
    name: 'gadgethematt Freedom ANC True Wireless Earbuds',
    brand: 'gadgethematt',
    category: 'ANC TWS',
    price: 249000,
    oldPrice: 499000,
    rating: 4.9,
    reviewCount: 45200,
    badge: 'Official Flagship 2026',
    tagline: 'Unlock Your Audio Freedom. Ultra-Low Latency & ANC',
    description: 'Flagship True Wireless Earbuds andalan gadgethematt dengan Active Noise Cancellation cerdas, latensi ultra rendah untuk gaming & video, daya tahan baterai 35+ jam, dan desain ergonomis compact.',
    imageUrl: sageTwsImg,
    gallery: [sageTwsImg, twsCaseImg],
    specs: {
      anc: 'Active Noise Cancellation (-38dB)',
      battery: '8 Jam Earbuds (38 Jam Total dengan Case)',
      codec: 'AAC, SBC High Bitrate',
      microphone: 'Quad Mic AI Noise Cancellation',
      waterResistance: 'IPX5 Sweat & Water Resistant',
      weight: '3.9g Ultra-Lightweight',
      connectivity: 'Bluetooth 5.4 Low Latency 40ms',
      driverSize: '10mm Titanium Composite Driver',
      multipoint: 'Dual Device Auto-Switch',
      spatialAudio: '3D Surround Sound Stage'
    },
    pros: [
      'Peredaman bising aktif sangat efektif di cafe dan ruang kelas',
      'Desain matte sage green mewah yang nyaman seharian',
      'Baterai tahan lama 35+ jam tanpa sering di-charge',
      'Mode game latensi rendah 40ms bebas delay suara'
    ],
    cons: [
      'Stok warna sage green terbatas pada sesi promo'
    ],
    verdict: 'TWS audio pilihan utama mahasiswa dengan keseimbangan sempurna antara kenyamanan, kualitas bass tebal, dan fitur ANC di harga bersahabat.',
    tokopediaUrl: OFFICIAL_AFFILIATE_LINKS.LINK_1,
    status: 'published',
    isFeatured: true,
    isBestValue: true,
    isPopular: true,
    rank: 1,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-redmi-6-play',
    slug: 'redmi-buds-6-play',
    name: 'Redmi Buds 6 Play Wireless Earbuds',
    brand: 'Xiaomi Redmi',
    category: 'Budget TWS',
    price: 139000,
    oldPrice: 199000,
    rating: 4.8,
    reviewCount: 18400,
    badge: 'Best Budget King Under 150K',
    tagline: 'Bluetooth 5.4, 36 Jam Baterai, 10mm Dynamic Driver',
    description: 'TWS termurah paling stabil untuk pelajar dan mahasiswa. Mengusung Bluetooth 5.4 mutakhir, driver dinamis 10mm dengan bass bertenaga, AI noise reduction untuk telepon jernih, dan bobot hanya 3.6 gram.',
    imageUrl: redmiBudsImg,
    gallery: [redmiBudsImg, sageTwsImg],
    specs: {
      anc: 'AI Call Noise Reduction (ENC)',
      battery: '7.5 Jam Earbud (36 Jam Total dengan Case)',
      codec: 'SBC, AAC',
      microphone: 'AI ENC HD Call Mic',
      waterResistance: 'IPX4 Splashproof',
      weight: '3.6g per earbud',
      connectivity: 'Bluetooth 5.4 Fast Pair',
      driverSize: '10mm Dynamic Bass Driver',
      multipoint: 'Tidak',
      spatialAudio: 'Stereo Sound Boost'
    },
    pros: [
      'Harga sangat murah di bawah Rp150 ribuan',
      'Baterai awet hingga 36 jam total dengan case',
      'Konektivitas Bluetooth 5.4 sangat stabil tanpa putus-putus',
      'Bentuk compact ringan nyaman untuk maraton Zoom kuliah'
    ],
    cons: [
      'Belum memiliki fitur ANC aktif (hanya isolasi pasif & ENC)',
      'Pengaturan equalizer bawaan sederhana'
    ],
    verdict: 'Pilihan paling hemat dan tanpa risiko untuk pelajar yang membutuhkan earphone andal untuk belajar dan mendengarkan musik harian.',
    tokopediaUrl: OFFICIAL_AFFILIATE_LINKS.LINK_1,
    status: 'published',
    isFeatured: true,
    isBestValue: true,
    isPopular: true,
    rank: 2,
    createdAt: '2026-02-05'
  },
  {
    id: 'prod-soundcore-r50i',
    slug: 'soundcore-r50i-bass-tws',
    name: 'Anker Soundcore R50i Extra Bass Earbuds',
    brand: 'Anker Soundcore',
    category: 'Budget TWS',
    price: 189000,
    oldPrice: 349000,
    rating: 4.9,
    reviewCount: 38900,
    badge: 'Terlaris 38K+ Terjual',
    tagline: '10mm Big Drivers, 22 Preset EQ via App, 30H Playtime',
    description: 'TWS sejuta umat mahasiswa Indonesia! Terkenal dengan bass punchy berkat 10mm Big Driver dan dukungan aplikasi Soundcore App gratis dengan 22 preset equalizer serta garansi resmi Anker 18 bulan ganti baru.',
    imageUrl: soundcoreImg,
    gallery: [soundcoreImg, sageTwsImg],
    specs: {
      anc: '2-Mic AI Clear Call ENC',
      battery: '10 Jam Earbud (30 Jam Total dengan Case)',
      codec: 'AAC, SBC',
      microphone: 'Dual Mic AI Noise Reduction',
      waterResistance: 'IPX5 Water Resistant',
      weight: '4.2g per earbud',
      connectivity: 'Bluetooth 5.3 Instant Pairing',
      driverSize: '10mm BassUp Dynamic Driver',
      multipoint: 'Tidak',
      spatialAudio: 'Soundcore Signature EQ'
    },
    pros: [
      'Bass paling bertenaga di kelas di bawah Rp200 ribu',
      'Aplikasi Soundcore lengkap dengan 22 equalizer preset',
      'Garansi resmi 18 bulan Anker Indonesia terpercaya',
      'Terdapat tali lanyard bawaan praktis digantung di tas'
    ],
    cons: [
      'Bodi case sedikit tebal dibanding kompetitor',
      'Tidak ada fitur Active Noise Cancelling (ANC)'
    ],
    verdict: 'Raja bass sejati di kelas Rp180 ribuan! Sangat direkomendasikan bagi penikmat musik EDM, hip-hop, dan maraton video hiburan.',
    tokopediaUrl: OFFICIAL_AFFILIATE_LINKS.LINK_2,
    status: 'published',
    isFeatured: true,
    isBestValue: true,
    isPopular: true,
    rank: 3,
    createdAt: '2026-02-10'
  },
  {
    id: 'prod-realme-t310',
    slug: 'realme-buds-t310',
    name: 'realme Buds T310 46dB Hybrid ANC Earbuds',
    brand: 'realme',
    category: 'ANC TWS',
    price: 379000,
    oldPrice: 599000,
    rating: 4.9,
    reviewCount: 12500,
    badge: 'Best ANC Under 400K',
    tagline: '46dB Hybrid Active Noise Cancellation & 360° Spatial Audio',
    description: 'TWS dengan peredam bising terbaik di bawah Rp400 ribu. Mengusung 46dB Hybrid ANC, 12.4mm Dynamic Bass Driver, 360° Spatial Audio effect, dan baterai monster 40 jam pemakaian.',
    imageUrl: realmeBudsImg,
    gallery: [realmeBudsImg, sageTwsImg],
    specs: {
      anc: '46dB Hybrid Active Noise Cancellation',
      battery: '9 Jam (40 Jam Total dengan Case)',
      codec: 'AAC, SBC Hi-Fi',
      microphone: '6-Mic Call Noise Cancellation',
      waterResistance: 'IP55 Dust & Water Resistant',
      weight: '4.3g per earbud',
      connectivity: 'Bluetooth 5.4 Dual Device Connection',
      driverSize: '12.4mm Titanized Diaphragm Driver',
      multipoint: 'Ya (Connect 2 Device)',
      spatialAudio: '360° Spatial Audio Effect'
    },
    pros: [
      'ANC 46dB benar-benar senyap menyaring suara bising luar',
      'Driver jumbo 12.4mm menghasilkan separasi vokal & bass tajam',
      'Dukungan Bluetooth Multipoint connect HP & laptop sekaligus',
      'Sertifikasi IP55 tahan keringat dan debu aman buat olahraga'
    ],
    cons: [
      'Aplikasi realme Link membutuhkan registrasi akun'
    ],
    verdict: 'Upgrade terbaik bagi pelajar yang menginginkan ketenangan belajar dengan ANC nyata dan audio spasial tanpa bayar jutaan.',
    tokopediaUrl: OFFICIAL_AFFILIATE_LINKS.LINK_3,
    status: 'published',
    isFeatured: true,
    isPopular: true,
    rank: 4,
    createdAt: '2026-02-15'
  },
  {
    id: 'prod-cmf-buds-2a',
    slug: 'cmf-buds-2a-by-nothing',
    name: 'CMF Buds 2a by Nothing Wireless Earbuds',
    brand: 'CMF by Nothing',
    category: 'ANC TWS',
    price: 449000,
    oldPrice: 699000,
    rating: 4.8,
    reviewCount: 9400,
    badge: 'Iconic Designer TWS',
    tagline: '42dB Active Noise Cancellation & Ultra Bass Tech 2.0',
    description: 'TWS dengan estetika desain paling keren dari sub-brand Nothing. Dilengkapi tombol dial fisik unik, 42dB ANC, driver 12.4mm Bio-Fiber, Ultra Bass Technology 2.0, serta dukungan Nothing X App.',
    imageUrl: cmfBudsImg,
    gallery: [cmfBudsImg, sageTwsImg],
    specs: {
      anc: '42dB Active Noise Cancellation + Transparency',
      battery: '8 Jam Earbud (35.5 Jam Total)',
      codec: 'AAC, SBC Dirac Opteo',
      microphone: '4 HD Mics with Clear Voice Technology',
      waterResistance: 'IP54 Water and Dust Proof',
      weight: '4.5g per earbud',
      connectivity: 'Bluetooth 5.3 Dual Connection',
      driverSize: '12.4mm Bio-Fiber + Custom TPU Driver',
      multipoint: 'Ya (Dual Device)',
      spatialAudio: 'Dirac Opteo Spatial Sound'
    },
    pros: [
      'Desain dial case sangat ikonik, stylish, dan estetik',
      'Tuning audio Dirac Opteo menghasilkan detail instrumen jernih',
      'Peredam bising ANC 42dB dan Transparency Mode responsif',
      'Integrasi Nothing X app dengan custom equalizer canggih'
    ],
    cons: [
      'Finishing case matte membutuhkan kehati-hatian agar tidak baret'
    ],
    verdict: 'Pilihan tepat untuk mahasiswa yang peduli gaya dan estetika gadget tanpa mengorbankan kualitas audio dan noise cancelling.',
    tokopediaUrl: OFFICIAL_AFFILIATE_LINKS.LINK_1,
    status: 'published',
    isFeatured: true,
    rank: 5,
    createdAt: '2026-02-18'
  },
  {
    id: 'prod-huawei-freebuds-se4',
    slug: 'huawei-freebuds-se-4-anc',
    name: 'Huawei FreeBuds SE 4 ANC Pebble Earbuds',
    brand: 'Huawei',
    category: 'Premium TWS',
    price: 499000,
    oldPrice: 799000,
    rating: 4.8,
    reviewCount: 7600,
    badge: 'Best Microphone & Comfort',
    tagline: 'Pebble Ergonomic Fit & Intelligent Call Noise Cancelling',
    description: 'TWS dengan kenyamanan telinga terbaik dan mikrofon telepon paling jernih di kelasnya. Desain pebble membulat ergonomis, Intelligent ANC, dan daya tahan baterai 35 jam.',
    imageUrl: huaweiBudsImg,
    gallery: [huaweiBudsImg, sageTwsImg],
    specs: {
      anc: 'Intelligent Active Noise Cancellation',
      battery: '8 Jam (35 Jam Total dengan Case)',
      codec: 'AAC, SBC High Clarity',
      microphone: 'Triple Mic AI Call Noise Reduction',
      waterResistance: 'IP54 Dust and Splash Resistant',
      weight: '4.1g Ergonomic Pebble Fit',
      connectivity: 'Bluetooth 5.3 Auto Pop-up Pairing',
      driverSize: '10mm Dynamic Polymer Driver',
      multipoint: 'Ya (Dual Connection)',
      spatialAudio: 'Huawei Histen 3D Audio'
    },
    pros: [
      'Kenyamanan di daun telinga luar biasa tanpa rasa pegal',
      'Mikrofon 3-Mic AI sangat jernih untuk Zoom presentasi kuliah',
      'Kualitas pengerjaan case pebble elegan dan kokoh',
      'Dukungan Bluetooth Multipoint connect 2 gawai sekaligus'
    ],
    cons: [
      'Aplikasi Huawei AI Life perlu diunduh via browser untuk ponsel Android non-Huawei'
    ],
    verdict: 'TWS paling nyaman untuk mahasiswa yang sering melakukan panggilan telepon, Zoom kelas online, dan mendengarkan podcast seharian.',
    tokopediaUrl: OFFICIAL_AFFILIATE_LINKS.LINK_2,
    status: 'published',
    isFeatured: true,
    rank: 6,
    createdAt: '2026-02-20'
  }
];

export const INITIAL_ARTICLES: ReviewArticle[] = [
  {
    id: 'art-rekomendasi-pelajar-2026',
    slug: 'rekomendasi-tws-terbaik-2026-untuk-pelajar-murah-berkualitas',
    title: 'Rekomendasi TWS Terbaik 2026 untuk Pelajar: Murah dan Berkualitas',
    subtitle: 'Uji performa 5 TWS terlaris di bawah Rp500 ribu dengan peredam bising ANC, mikrofon jernih untuk Zoom, dan baterai awet seharian.',
    excerpt: 'Mencari TWS yang ramah kantong pelajar tapi punya suara jernih dan awet? Simak ulasan mendalam 5 TWS terbaik 2026 pilihan tim gadgethematt.',
    content: `
      <h2>Solusi Audio Berkualitas untuk Generasi Pelajar & Mahasiswa</h2>
      <p>True Wireless Stereo (TWS) kini bukan lagi sekadar pelengkap hiburan, melainkan perangkat krusial bagi pelajar dan mahasiswa. Mulai dari mengikuti kuliah online via Zoom, mendengarkan rekaman materi dosen, hingga fokus belajar di cafe yang ramai, kehadiran TWS berkualitas sangat menentukan konsentrasi.</p>
      
      <p>Kabar baiknya di tahun 2026, Anda tidak perlu merogoh kocek jutaan rupiah untuk mendapatkan fitur-fitur mutakhir seperti <strong>Active Noise Cancellation (ANC)</strong>, mikrofon AI jernih, dan ketahanan baterai lebih dari 30 jam. Berikut adalah pengujian mendalam redaksi <strong>gadgethematt</strong> terhadap 5 TWS terbaik untuk pelajar.</p>

      <h2>1. Redmi Buds 6 Play — Juara Budget di Bawah Rp150 Ribu</h2>
      <p>Bagi Anda yang memiliki anggaran sangat terbatas namun membutuhkan perangkat andal, <strong>Redmi Buds 6 Play</strong> adalah pemenang mutlak. Dilengkapi Bluetooth 5.4 dan baterai 36 jam, TWS ini menyajikan koneksi yang sangat stabil tanpa putus-putus. Bobotnya yang hanya 3.6 gram membuatnya terasa seringan kapas di telinga.</p>

      <h2>2. Soundcore R50i — Bass Bertenaga & Garansi 18 Bulan Resmi</h2>
      <p>Anker Soundcore R50i telah terjual puluhan ribu unit di Tokopedia Official Store. Keunggulan utamanya terletak pada driver 10mm dengan karakter suara bass yang punchy dan aplikasi pendamping gratis yang menyediakan 22 preset equalizer. Dilengkapi garansi resmi penggantian 18 bulan, TWS ini bebas rasa was-was.</p>

      <h2>3. realme Buds T310 — ANC 46dB Senyap di Bawah Rp400 Ribu</h2>
      <p>Jika prioritas utama Anda adalah keheningan saat belajar di tempat umum, realme Buds T310 menawarkan peredaman bising aktif hingga 46dB. Dentuman suara kendaraan atau obrolan di cafe teredam secara efektif. Ditambah fitur Bluetooth Multipoint, Anda bisa menghubungkannya ke laptop dan smartphone sekaligus.</p>

      <h2>4. CMF Buds 2a by Nothing — Desain Paling Estetik & Stylish</h2>
      <p>Bagi pelajar yang mengutamakan penampilan, CMF Buds 2a menghadirkan estetika minimalis khas Nothing dengan dial fisik unik. Kualitas audionya dioptimasi oleh Dirac Opteo dengan karakter suara seimbang dan separasi instrumen yang rapi.</p>

      <h2>5. Huawei FreeBuds SE 4 ANC — Mikrofon Kristal Jernih untuk Zoom</h2>
      <p>Kerap ditunjuk sebagai presenter dalam tugas kelompok online? Huawei FreeBuds SE 4 ANC dibekali sistem mikrofon AI ganda yang mampu mengisolasi vokal Anda dari kebisingan angin dan lingkungan sekitar, memastikan suara Anda terdengar jelas dan profesional.</p>
    `,
    category: 'Buying Guides',
    type: 'buying_guide',
    author: 'Dika Ramadhan',
    authorRole: 'Chief Audio Reviewer gadgethematt',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: '28 Februari 2026',
    readTime: '6 menit baca',
    featuredImage: sageTwsImg,
    status: 'published',
    rating: 4.9,
    verdictScore: 9.6,
    highlightSummary: 'Panduan lengkap memilih 5 TWS pelajar terbaik 2026 dengan harga bersahabat, fitur ANC teruji, dan link Tokopedia Official Store resmi.',
    pros: [
      'Pilihan harga sangat terjangkau dari Rp130 ribuan hingga Rp490 ribuan',
      'Fitur ANC aktif dan ENC mikrofon teruji di laboratorium audio',
      'Seluruh produk bergaransi resmi Tokopedia Official Store',
      'Daya tahan baterai di atas 30 jam pemakaian'
    ],
    cons: [
      'Promo flash sale cepat habis pada varian warna favorit'
    ],
    relatedProductId: 'prod-sage-hero',
    tags: ['Pelajar', 'TWS Murah', 'Rekomendasi 2026', 'Tokopedia', 'ANC TWS'],
    views: 4520,
    affiliateClicks: 1480,
    seoTitle: 'Rekomendasi TWS Terbaik 2026 untuk Pelajar: Murah dan Berkualitas - gadgethematt',
    seoDescription: 'Daftar 5 TWS terbaik 2026 untuk pelajar & mahasiswa dengan suara jernih, baterai awet, dan diskon resmi Tokopedia Official Store.'
  }
];

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-1',
    slug: 'budget-tws',
    name: 'Budget TWS',
    description: 'Earphone TWS ramah kantong pelajar di bawah Rp250 ribu dengan kualitas suara jernih dan baterai awet.',
    iconName: 'Wallet',
    articleCount: 12,
    productCount: 8,
    imageUrl: redmiBudsImg
  },
  {
    id: 'cat-2',
    slug: 'anc-tws',
    name: 'ANC TWS',
    description: 'TWS dilengkapi Active Noise Cancelling (ANC) untuk meredam bising saat belajar di cafe atau perjalanan.',
    iconName: 'VolumeX',
    articleCount: 18,
    productCount: 12,
    imageUrl: sageTwsImg
  },
  {
    id: 'cat-3',
    slug: 'gaming-tws',
    name: 'Gaming TWS',
    description: 'TWS dengan Mode Low Latency ultra cepat di bawah 45ms untuk bebas delay suara saat gaming.',
    iconName: 'Gamepad2',
    articleCount: 8,
    productCount: 6,
    imageUrl: realmeBudsImg
  },
  {
    id: 'cat-4',
    slug: 'tws-for-students',
    name: 'TWS for Students',
    description: 'Rekomendasi TWS pilihan mahasiswa dengan mik jernih untuk Zoom kuliah online dan garansi resmi.',
    iconName: 'GraduationCap',
    articleCount: 15,
    productCount: 10,
    imageUrl: huaweiBudsImg
  }
];

export const INITIAL_AFFILIATE_LINKS: AffiliateLinkItem[] = [
  {
    id: 'aff-1',
    productId: 'prod-sage-hero',
    productName: 'gadgethematt Freedom ANC TWS',
    marketplace: 'tokopedia',
    affiliateUrl: OFFICIAL_AFFILIATE_LINKS.LINK_1,
    clicks: 1840,
    status: 'active',
    createdAt: '2026-02-01'
  },
  {
    id: 'aff-2',
    productId: 'prod-soundcore-r50i',
    productName: 'Soundcore R50i Extra Bass',
    marketplace: 'tokopedia',
    affiliateUrl: OFFICIAL_AFFILIATE_LINKS.LINK_2,
    clicks: 2950,
    status: 'active',
    createdAt: '2026-02-10'
  },
  {
    id: 'aff-3',
    productId: 'prod-realme-t310',
    productName: 'realme Buds T310 46dB ANC',
    marketplace: 'tokopedia',
    affiliateUrl: OFFICIAL_AFFILIATE_LINKS.LINK_3,
    clicks: 1420,
    status: 'active',
    createdAt: '2026-02-15'
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  { id: 'm-1', fileName: 'gadgethematt_sage_tws.jpg', url: sageTwsImg, size: '420 KB', uploadDate: '2026-02-28', type: 'image' },
  { id: 'm-2', fileName: 'redmi_buds_6_play.jpg', url: redmiBudsImg, size: '380 KB', uploadDate: '2026-02-28', type: 'image' },
  { id: 'm-3', fileName: 'realme_buds_t310.jpg', url: realmeBudsImg, size: '510 KB', uploadDate: '2026-02-28', type: 'image' },
  { id: 'm-4', fileName: 'cmf_buds_2a.jpg', url: cmfBudsImg, size: '310 KB', uploadDate: '2026-02-28', type: 'image' }
];

export const INITIAL_COMMENTS: ArticleComment[] = [
  {
    id: 'comm-1',
    articleId: 'art-rekomendasi-pelajar-2026',
    articleTitle: 'Rekomendasi TWS Terbaik 2026 untuk Pelajar',
    userName: 'Rian Pratama (Mahasiswa UI)',
    userEmail: 'rian.pratama@gmail.com',
    comment: 'Soundcore R50i emang juara banget kak! Bass nya nendang pas dipake ngerjain tugas di perpus. Worth it parah rekomendasi dari gadgethematt!',
    date: '28 Februari 2026',
    status: 'approved'
  },
  {
    id: 'comm-2',
    articleId: 'art-rekomendasi-pelajar-2026',
    articleTitle: 'Rekomendasi TWS Terbaik 2026 untuk Pelajar',
    userName: 'Anisa Fitriani (Mahasiswi ITB)',
    userEmail: 'anisa.f@gmail.com',
    comment: 'Makasih rekomendasinya min, kemaren langsung checkout realme Buds T310 lewat link Tokopedia gadgethematt. ANC nya beneran kedap di kereta!',
    date: '27 Februari 2026',
    status: 'approved'
  }
];
