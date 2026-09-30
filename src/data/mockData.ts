import { ProductItem, ReviewArticle, CategoryItem, AffiliateLinkItem, MediaItem, ArticleComment } from '../types';

import soundcoreLibertyImg from '../assets/images/soundcore_liberty_5_1790729961290.jpg';
import airpodsProImg from '../assets/images/airpods_pro_2_1790729975110.jpg';
import sonyWfImg from '../assets/images/sony_wf1000xm5_1790729988235.jpg';
import spaceS1Img from '../assets/images/space_s1_headphones_1790728497925.jpg';
import goojodoqImg from '../assets/images/goojodoq_j206_tws_1790087127627.jpg';
import twsCaseImg from '../assets/images/tws_product_case_1790083633867.jpg';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    slug: 'soundcore-liberty-5',
    name: 'Anker Soundcore Liberty 5 ANC Wireless Earbuds',
    brand: 'Anker Soundcore',
    category: 'ANC TWS',
    price: 1399000,
    oldPrice: 1999000,
    rating: 4.9,
    reviewCount: 4280,
    badge: 'Best Recommendation 2026',
    tagline: 'Dual Driver Coaxial Architecture & Adaptive ANC 3.0',
    description: 'TWS flagship kelas menengah paling worth-it di Indonesia. Dilengkapi ACAA 3.0 dual coaxial drivers, LDAC Hi-Res Audio certification, serta Adaptive Active Noise Cancelling hingga -48dB.',
    imageUrl: soundcoreLibertyImg,
    gallery: [soundcoreLibertyImg, twsCaseImg],
    specs: {
      anc: 'Adaptive ANC 3.0 (-48dB)',
      battery: '10 Jam (48 Jam Total dengan Case)',
      codec: 'LDAC, AAC, SBC',
      microphone: '6 Mic AI Noise Reduction',
      waterResistance: 'IPX4 Splashproof',
      weight: '4.8g per earbud',
      connectivity: 'Bluetooth 5.3 Multipoint',
      driverSize: '9.2mm + 6.2mm Coaxial Dual Driver',
      multipoint: 'Ya (Connect 2 Device)',
      spatialAudio: '360° Spatial Audio Tracking'
    },
    pros: [
      'Suara bass punchy dan vokal super jernih berkat dual driver',
      'ANC adaptif bekerja maksimal meredam kebisingan kelas & transportasi',
      'Daya tahan baterai monster hingga 48 jam',
      'Mendukung Bluetooth Multipoint koneksi simultan laptop & HP'
    ],
    cons: [
      'Bodi case agak licin jika tangan basah',
      'Fitur Spatial Audio menguras baterai lebih cepat'
    ],
    verdict: 'Rekomendasi #1 untuk mahasiswa & profesional yang mencari kualitas audio audiophile + ANC tangguh dengan harga under Rp1.5 Juta.',
    shopeeUrl: 'https://shopee.co.id/search?keyword=Soundcore%20Liberty%205',
    tokopediaUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    lazadaUrl: 'https://www.lazada.co.id/catalog/?q=Soundcore+Liberty+5',
    isFeatured: true,
    isBestValue: true,
    isPopular: true,
    rank: 1,
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-2',
    slug: 'apple-airpods-pro-2',
    name: 'Apple AirPods Pro 2 (USB-C MagSafe)',
    brand: 'Apple',
    category: 'Premium TWS',
    price: 3699000,
    oldPrice: 4299000,
    rating: 4.9,
    reviewCount: 12400,
    badge: 'Apple Ecosystem Benchmark',
    tagline: 'H2 Chipset with Adaptive Audio & Precision Finding',
    description: 'Standar emas TWS noise cancelling untuk pengguna ekosistem iPhone & Mac. Ditenagai chip Apple H2 dengan pembatalan kebisingan 2x lebih efektif, Adaptive Transparency, dan Personalised Spatial Audio.',
    imageUrl: airpodsProImg,
    gallery: [airpodsProImg, spaceS1Img],
    specs: {
      anc: 'Active Noise Cancellation H2 (Up to 2x stronger)',
      battery: '6 Jam (30 Jam dengan MagSafe Case)',
      codec: 'AAC, Apple Lossless',
      microphone: 'Dual Beamforming Mics + Inward Mic',
      waterResistance: 'IP54 Sweat and Dust Resistant',
      weight: '5.3g per earbud',
      connectivity: 'Bluetooth 5.3 Auto Switching',
      driverSize: 'Custom High-Excursion Apple Driver',
      multipoint: 'Seamless Apple Device Auto-Switch',
      spatialAudio: 'Personalized Spatial Audio with Head Tracking'
    },
    pros: [
      'Peredam bising ANC & Transparency mode terbaik di kelasnya',
      'Integrasi seamless tanpa jeda di seluruh perangkat Apple',
      'Kontrol sentuh volume gesture sangat intuitif',
      'Case dilengkapi speaker internal untuk pencarian Precision Finding Find My'
    ],
    cons: [
      'Harga relatif tinggi',
      'Fitur maksimal hanya jika dipakai di ekosistem iOS/macOS'
    ],
    verdict: 'Investasi terbaik tanpa tanding untuk pengguna Apple yang membutuhkan mikrofon jernih, kenyamanan harian, dan noise cancelling papan atas.',
    shopeeUrl: 'https://shopee.co.id/search?keyword=AirPods%20Pro%202',
    tokopediaUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    lazadaUrl: 'https://www.lazada.co.id/catalog/?q=AirPods+Pro+2',
    isFeatured: true,
    isPopular: true,
    rank: 2,
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-3',
    slug: 'sony-wf-1000xm5',
    name: 'Sony WF-1000XM5 Wireless Noise Cancelling',
    brand: 'Sony',
    category: 'Premium TWS',
    price: 4199000,
    oldPrice: 4599000,
    rating: 4.8,
    reviewCount: 3820,
    badge: 'Audiophile King',
    tagline: 'Integrated Processor V2 & Dynamic Driver X',
    description: 'TWS flagship audio murni kelas dunia dari Sony. Mengusung Dynamic Driver X 8.4mm khusus, pemroses terintegrasi V2 + QN2e, eartip busa noise isolation polyurethane khusus, dan sertifikasi Hi-Res Wireless LDAC.',
    imageUrl: sonyWfImg,
    gallery: [sonyWfImg, twsCaseImg],
    specs: {
      anc: 'Dual Processor HD Noise Cancelling QN2e + V2',
      battery: '8 Jam (24 Jam Total dengan Charging Case)',
      codec: 'LDAC, LC3, AAC, SBC',
      microphone: '6 Mic Deep Neural Network AI Mic',
      waterResistance: 'IPX4 Water Resistant',
      weight: '5.9g per earbud',
      connectivity: 'Bluetooth 5.3 LE Audio Multipoint',
      driverSize: '8.4mm Dynamic Driver X',
      multipoint: 'Ya (Dual Connection)',
      spatialAudio: '360 Reality Audio'
    },
    pros: [
      'Detail frekuensi suara paling kaya dan musikal di kategori TWS',
      'Peredam kebisingan pasif & aktif mutakhir meredam frekuensi tinggi',
      'Ukuran 25% lebih kecil & 20% lebih ringan dari pendahulunya XM4',
      'Mendukung Head Tracking dan 360 Reality Audio'
    ],
    cons: [
      'Eartips foam membutuhkan penyesuaian penggunaan',
      'Harga masuk kategori ultra premium'
    ],
    verdict: 'Pilihan utama penikmat musik audiophile sejati yang menginginkan resolusi audio LDAC maksimal dan peredaman suara instan.',
    shopeeUrl: 'https://shopee.co.id/search?keyword=Sony%20WF-1000XM5',
    tokopediaUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    lazadaUrl: 'https://www.lazada.co.id/catalog/?q=Sony+WF-1000XM5',
    isFeatured: true,
    rank: 3,
    createdAt: '2026-01-12'
  },
  {
    id: 'prod-4',
    slug: 'goojodoq-j206-tws-pro',
    name: 'GOOJOD0Q J206 Earphone Bluetooth 5.3 TWS Pro',
    brand: 'GOOJOD0Q',
    category: 'Budget TWS',
    price: 124999,
    oldPrice: 250000,
    rating: 4.8,
    reviewCount: 33300,
    badge: 'Terlaris 33.3K+ Terjual',
    tagline: 'AI Noise Reduction & Extra Bass Boosted',
    description: 'TWS paling terjangkau & paling populer untuk mahasiswa di toko online Indonesia. Memiliki konektivitas Bluetooth 5.3 stabil, driver bass dinamis, latensi rendah untuk game ringan, dan baterai awet seharian.',
    imageUrl: goojodoqImg,
    gallery: [goojodoqImg, twsCaseImg],
    specs: {
      anc: 'AI Enc Environmental Noise Cancellation',
      battery: '6 Jam Earbuds + 24 Jam Case',
      codec: 'AAC, SBC High Bitrate',
      microphone: 'AI HD Call Microphone',
      waterResistance: 'IPX5 Sweatproof',
      weight: '3.8g Ultra Lightweight',
      connectivity: 'Bluetooth 5.3 Fast Pairing',
      driverSize: '13mm Large Composite Dynamic Driver',
      multipoint: 'Tidak',
      spatialAudio: 'Standard Stereo'
    },
    pros: [
      'Harga sangat terjangkau di bawah Rp150 ribuan',
      'Bentuk ergonomis super ringan nyaman untuk maraton Zoom kuliah',
      'Suara bass bertenaga tidak sember di volume tinggi',
      'Garansi beli lokal Tokopedia & Shopee Mall'
    ],
    cons: [
      'Belum ada ANC aktif (hanya isolasi pasif)',
      'Finishing bodi plastik standar'
    ],
    verdict: 'Juara budget ramah kantong mahasiswa! Solusi TWS harian fleksibel untuk mendengarkan lagu, kuliah online, dan menelepon tanpa menguras dompet.',
    shopeeUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    tokopediaUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    lazadaUrl: 'https://www.lazada.co.id/catalog/?q=GOOJOD0Q+J206',
    isFeatured: true,
    isBestValue: true,
    rank: 4,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-5',
    slug: 'soundcore-space-s1-wireless',
    name: 'GADGET HEMATT Space S1 Hybrid ANC Headphones',
    brand: 'GADGET HEMATT',
    category: 'ANC TWS',
    price: 649000,
    oldPrice: 1299000,
    rating: 4.9,
    reviewCount: 8910,
    badge: 'Hero Showcase Feature',
    tagline: 'Mute the Noise. Own the Show. Adaptive Hybrid ANC',
    description: 'Headphone / Earbuds nirkabel flagship rekomendasi tim GADGET HEMATT. Menghadirkan teknologi Hybrid ANC tingkat lanjut, isolasi akustik kedap suara, kenyamanan Busa Memory Foam kelas penerbangan, serta frekuensi Pure Bass 40Hz.',
    imageUrl: spaceS1Img,
    gallery: [spaceS1Img, twsCaseImg],
    specs: {
      anc: 'Hybrid Active Noise Cancelling (-45dB)',
      battery: '12 Jam Single Charge (60 Jam Total Case)',
      codec: 'LDAC, AAC, SBC Hi-Res',
      microphone: 'Quad Mic AI Clarity Beam',
      waterResistance: 'IPX5 Water Splash Resistant',
      weight: '4.5g per earbud / Ultra Soft Fit',
      connectivity: 'Bluetooth 5.3 Low Latency',
      driverSize: '10mm Dynamic Titanium Driver',
      multipoint: 'Ya (Dual Device)',
      spatialAudio: '3D Spatial Surround Audio'
    },
    pros: [
      'Fitur Mute the Noise. Own the Show. peredaman suara luar biasa',
      'Baterai tahan lama hingga 60 jam pemakaian total',
      'Kualitas pengerjaan finishing matte pearl silver & onyx premium',
      'Uji audio Pure Bass 40Hz menghasilkan getaran frekuensi rendah yang bulat'
    ],
    cons: [
      'Stok cepat habis saat sesi Flash Sale'
    ],
    verdict: 'Headphone / TWS flagship terfavorit anak muda yang mendambakan penampilan minimalis modern, ANC sunyi, dan bass mantap.',
    shopeeUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    tokopediaUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    lazadaUrl: 'https://www.lazada.co.id/catalog/?q=Space+S1+Wireless',
    isFeatured: true,
    isPopular: true,
    rank: 5,
    createdAt: '2026-02-10'
  },
  {
    id: 'prod-6',
    slug: 'galaxy-buds-3-pro',
    name: 'Samsung Galaxy Buds3 Pro Hi-Fi Audio',
    brand: 'Samsung',
    category: 'Premium TWS',
    price: 3299000,
    oldPrice: 3899000,
    rating: 4.8,
    reviewCount: 5120,
    badge: 'Best for Samsung Users',
    tagline: 'Blade Lights Design & 24bit/96kHz SSC Audio',
    description: 'TWS desain Futuristik Blade Light dari Samsung dengan dual amp dan planar tweeter terpisah. Menawarkan transkrip suara AI real-time, ANC adaptif cerdas, dan audio resolusi tinggi 24bit/96kHz.',
    imageUrl: twsCaseImg,
    gallery: [twsCaseImg, soundcoreLibertyImg],
    specs: {
      anc: 'Smart Adaptive ANC with Siren & Voice Detect',
      battery: '7 Jam (30 Jam dengan Case)',
      codec: 'SSC Seamless, AAC, SBC',
      microphone: '3 Mic + VPU (Voice Pickup Unit)',
      waterResistance: 'IP57 Waterproof',
      weight: '5.4g per earbud',
      connectivity: 'Bluetooth 5.4 Auto Switch',
      driverSize: '2-Way 10.5mm Dynamic + Planar Tweeter',
      multipoint: 'Samsung Auto Switch',
      spatialAudio: '360 Audio with Direct Multi-Channel'
    },
    pros: [
      'Desain lampu Blade LED sangat unik dan futuristik',
      'Dual driver + dual amp menghasilkan kejernihan treble dan bass presisi',
      'Sangat nyaman dengan eartips silikon ergonomis baru',
      'Fitur AI Live Translate suara penterjemah instan'
    ],
    cons: [
      'Codec SSC 24-bit maksimal aktif di smartphone Samsung Galaxy'
    ],
    verdict: 'TWS tercanggih untuk pengguna HP Samsung Galaxy yang menginginkan kejernihan studio dan desain lampu LED ikonik.',
    shopeeUrl: 'https://shopee.co.id/search?keyword=Galaxy%20Buds3%20Pro',
    tokopediaUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    lazadaUrl: 'https://www.lazada.co.id/catalog/?q=Galaxy+Buds3+Pro',
    isFeatured: false,
    rank: 6,
    createdAt: '2026-01-20'
  }
];

export const INITIAL_ARTICLES: ReviewArticle[] = [
  {
    id: 'art-1',
    slug: 'soundcore-liberty-5-review-worth-it',
    title: 'Soundcore Liberty 5 Review: TWS ANC Rp1 Jutaan Paling Worth It di 2026?',
    subtitle: 'Uji lengkap kualitas audio LDAC, ketahanan baterai 48 jam, dan performa peredam bising di kelas perkuliahan & cafe.',
    excerpt: 'Apakah Soundcore Liberty 5 mampu menandingi TWS flagship seharga Rp3-4 jutaan? Simak pengujian mendalam dari lab review GADGET HEMATT.',
    content: `
      <h2>Pendahuluan</h2>
      <p>Dalam mencari True Wireless Stereo (TWS) di rentang harga Rp1 jutaan, mahasiswa dan pengguna aktif sering kali dihadapkan pada dilema: memilih kualitas suara audiophile atau keandalan fitur Active Noise Cancelling (ANC). Anker Soundcore menghadirkan **Soundcore Liberty 5** untuk menjawab kedua tantangan tersebut tanpa kompromi.</p>
      
      <h2>Desain & Kenyamanan Pemakaian</h2>
      <p>Liberty 5 hadir dengan case bertekstur matte yang halus dan mekanisme slide unik yang terasa sangat kokoh. Setiap earbud hanya berbobot 4.8 gram, menjadikannya terasa begitu ringan bahkan saat dipakai maraton sesi perkuliahan Zoom selama 4 jam penuh tanpa menimbulkan rasa pegal pada telinga.</p>

      <h2>Kualitas Audio & Driver ACAA 3.0</h2>
      <p>Mengusung arsitektur Dual Coaxial Driver (9.2mm + 6.2mm), resolusi audio yang dihasilkan terasa sangat terpisah. Nada vokal berada tepat di tengah dengan kejernihan maksimal, sementara artikulasi bass bergelombang bulat tanpa menutup frekuensi mid maupun treble.</p>

      <h2>Uji Performa ANC & Mikrofon</h2>
      <p>Fitur Adaptive ANC 3.0 mampu mendeteksi tingkat kebisingan lingkungan secara otomatis. Saat diuji di kantin kampus berisik dan kendaraan umum, suara dengung mesin dan kebisingan latar berkurang hingga 85-90%.</p>

      <h2>Kesimpulan & Verdict</h2>
      <p>Bagi Anda yang menginginkan TWS berkemampuan tinggi dengan anggaran bijak, **Soundcore Liberty 5** adalah pilihan nomor satu yang paling kami rekomendasikan tahun ini.</p>
    `,
    category: 'Reviews',
    type: 'review',
    author: 'Dika Ramadhan',
    authorRole: 'Head Audio Reviewer',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: '28 Februari 2026',
    readTime: '5 menit baca',
    featuredImage: soundcoreLibertyImg,
    status: 'published',
    rating: 4.9,
    verdictScore: 9.6,
    highlightSummary: 'Soundcore Liberty 5 menawarkan perpaduan langka antara driver coaxial premium, codec LDAC, dan peredaman ANC adaptif terbaik di kisaran harga Rp1.3 jutaan.',
    pros: [
      'Suara bass punchy dan resolusi audio LDAC sangat detail',
      'ANC adaptif bekerja efektif di tempat umum & transportasi',
      'Ketahanan baterai hingga 48 jam pemakaian total',
      'Fitur Bluetooth Multipoint koneksi simultan 2 HP/Laptop'
    ],
    cons: [
      'Bodi case sedikit licin jika jemari basah',
      'Spatial audio cenderung menguras baterai lebih cepat'
    ],
    relatedProductId: 'prod-1',
    tags: ['Reviews', 'Soundcore', 'ANC TWS', 'Rekomendasi'],
    views: 14250,
    affiliateClicks: 1840,
    seoTitle: 'Soundcore Liberty 5 Review Indonesia - GADGET HEMATT',
    seoDescription: 'Uji lengkap Soundcore Liberty 5: Kualitas suara LDAC, peredam bising ANC 3.0, daya tahan baterai, dan perbandingan harga terbaik.'
  },
  {
    id: 'art-2',
    slug: '5-tws-terbaik-di-bawah-rp500-ribu',
    title: '5 TWS Terbaik di Bawah Rp500 Ribuan Buat Mahasiswa & Pelajar',
    subtitle: 'Rekomendasi earphone bluetooth murah meriah dengan baterai awet, suara bass mantap, dan mic jernih untuk kuliah online.',
    excerpt: 'Budget terbatas di bawah Rp500 ribu tapi butuh TWS berkualitas? Berikut 5 pilihan terbaik yang sudah diuji oleh tim teknis GADGET HEMATT.',
    content: `
      <h2>Kenapa Harus Pilih TWS di Bawah 500 Ribu?</h2>
      <p>Kemajuan teknologi audio nirkabel di tahun 2026 membuat TWS harga terjangkau kini sudah dibekali Bluetooth 5.3, driver dinamis besar, dan fitur latensi rendah untuk gaming.</p>
      
      <h2>Daftar Rekomendasi Teratas:</h2>
      <ol>
        <li><strong>GOOJOD0Q J206 TWS Pro</strong> - Juara Hemat Rp120 ribuan dengan bass kuat & baterai seharian.</li>
        <li><strong>Anker Soundcore R50i</strong> - TWS tangguh dengan 22 EQ Preset via aplikasi resmi Soundcore.</li>
        <li><strong>Baseus Bowie M2+</strong> - Pilihan terbaik yang sudah memiliki ANC aktif under Rp400 ribu.</li>
        <li><strong>Realme Buds T110</strong> - Desain stylish warna-warni dengan AI ENC Call Noise Reduction.</li>
        <li><strong>Baseus WM01</strong> - Ukuran super ringkas dengan pasang pas di lubang telinga.</li>
      </ol>
    `,
    category: 'Buying Guides',
    type: 'buying_guide',
    author: 'Siti Nurhaliza',
    authorRole: 'Tech Editor',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    date: '25 Februari 2026',
    readTime: '6 menit baca',
    featuredImage: goojodoqImg,
    status: 'published',
    rating: 4.8,
    verdictScore: 9.2,
    highlightSummary: 'Anda tidak perlu merogoh kocek dalam-dalam untuk mendapatkan earphone nirkabel yang nyaman dan tahan lama untuk aktivitas belajar harian.',
    pros: [
      'Harga sangat murah cocok untuk kantong mahasiswa',
      'Fitur lengkap dari Bluetooth 5.3 hingga ketahanan cipratan air',
      'Suara vokal & bass sudah sangat memadai untuk hiburan harian'
    ],
    cons: [
      'Material casing dominan plastik abs',
      'Tidak semua model mendukung aplikasi pengaturan eksternal'
    ],
    relatedProductId: 'prod-4',
    tags: ['Buying Guides', 'Budget TWS', 'Mahasiswa', 'Rekomendasi'],
    views: 18900,
    affiliateClicks: 2410,
    seoTitle: '5 TWS Terbaik di Bawah Rp500 Ribu (2026) - GADGET HEMATT',
    seoDescription: 'Panduan membeli TWS murah berkualitas untuk mahasiswa dan pelajar di Indonesia.'
  },
  {
    id: 'art-3',
    slug: 'airpods-pro-2-vs-galaxy-buds-3-pro',
    title: 'AirPods Pro 2 vs Galaxy Buds3 Pro: Mana TWS Flagship Pilihanmu?',
    subtitle: 'Komparasi mendalam antara dua raja TWS ekosistem iOS dan Android. Mana yang memberikan kenyamanan dan ANC paling sunyi?',
    excerpt: 'Bingung memilih antara AirPods Pro 2 atau Samsung Galaxy Buds3 Pro? Ketahui kelebihan, kekurangan, dan performa mikrofon keduanya.',
    content: `
      <h2>Persaingan Dua Raksasa Ekosistem</h2>
      <p>Apple AirPods Pro 2 dan Samsung Galaxy Buds3 Pro merupakan representasi puncak dari pengalaman TWS premium saat ini.</p>
      
      <h2>Perbandingan Fitur Utama:</h2>
      <ul>
        <li><strong>Peredam Kebisingan (ANC):</strong> AirPods Pro 2 unggul sedikit dalam meredam suara mesin berfrekuensi rendah.</li>
        <li><strong>Kualitas Mikrofon:</strong> Galaxy Buds3 Pro mengusung teknologi Blade Lights dan AI Voice Pickup yang sangat jernih di lingkungan berangin.</li>
        <li><strong>Kemudahan Penggunaan:</strong> Auto-switching bekerja sempurna pada ekosistem masing-masing brand.</li>
      </ul>
    `,
    category: 'Comparisons',
    type: 'comparison',
    author: 'Dika Ramadhan',
    authorRole: 'Head Audio Reviewer',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    date: '20 Februari 2026',
    readTime: '7 menit baca',
    featuredImage: airpodsProImg,
    status: 'published',
    rating: 4.9,
    verdictScore: 9.5,
    highlightSummary: 'Pilih AirPods Pro 2 jika Anda pengguna iPhone/Mac. Pilih Galaxy Buds3 Pro jika Anda pengguna smartphone Samsung Galaxy.',
    pros: [
      'ANC tingkat tertinggi di pasaran',
      'Suara jernih berstandar studio profesional'
    ],
    cons: [
      'Fitur terkunci di masing-masing ekosistem OS'
    ],
    relatedProductId: 'prod-2',
    tags: ['Comparisons', 'Apple', 'Samsung', 'Premium TWS'],
    views: 12100,
    affiliateClicks: 1120,
    seoTitle: 'AirPods Pro 2 vs Galaxy Buds3 Pro - GADGET HEMATT',
    seoDescription: 'Perbandingan komparasi lengkap TWS flagship Apple AirPods Pro 2 vs Samsung Galaxy Buds3 Pro.'
  }
];

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-1',
    slug: 'budget-tws',
    name: 'Budget TWS',
    description: 'Rekomendasi earphone nirkabel terjangkau di bawah Rp500 ribuan dengan performa terbaik untuk kantong mahasiswa.',
    iconName: 'Wallet',
    articleCount: 12,
    productCount: 18,
    imageUrl: goojodoqImg
  },
  {
    id: 'cat-2',
    slug: 'premium-tws',
    name: 'Premium TWS',
    description: 'TWS kelas atas dengan kualitas audio resolusi tinggi, pengerjaan material mewah, dan teknologi tercanggih.',
    iconName: 'Crown',
    articleCount: 8,
    productCount: 10,
    imageUrl: airpodsProImg
  },
  {
    id: 'cat-3',
    slug: 'anc-tws',
    name: 'ANC TWS',
    description: 'True Wireless Stereo yang dilengkapi Active Noise Cancellation untuk meredam kebisingan kelas, kafe, dan perjalanan.',
    iconName: 'VolumeX',
    articleCount: 15,
    productCount: 22,
    imageUrl: soundcoreLibertyImg
  },
  {
    id: 'cat-4',
    slug: 'gaming-tws',
    name: 'Gaming TWS',
    description: 'TWS latensi ultra-rendah (under 40ms) dengan fitur Gaming Mode dan mikrofon komunikasi tim yang jernih.',
    iconName: 'Gamepad2',
    articleCount: 6,
    productCount: 12,
    imageUrl: twsCaseImg
  },
  {
    id: 'cat-5',
    slug: 'sports-tws',
    name: 'Sports TWS',
    description: 'TWS tahan air IPX5-IPX7 dengan earhooks dan eartips ergonomis anti-terlepas untuk olahraga & gym.',
    iconName: 'Activity',
    articleCount: 5,
    productCount: 8,
    imageUrl: spaceS1Img
  },
  {
    id: 'cat-6',
    slug: 'tws-for-students',
    name: 'TWS for Students',
    description: 'Pilihan TWS paling ramah budget, mikrofon jernih untuk Zoom kuliah, dan baterai awet seharian di kampus.',
    iconName: 'GraduationCap',
    articleCount: 14,
    productCount: 20,
    imageUrl: goojodoqImg
  },
  {
    id: 'cat-7',
    slug: 'best-battery',
    name: 'Best Battery',
    description: 'Daftar TWS dengan daya tahan baterai panjang di atas 10 jam per charge dan total case lebih dari 40 jam.',
    iconName: 'BatteryCharging',
    articleCount: 7,
    productCount: 11,
    imageUrl: soundcoreLibertyImg
  },
  {
    id: 'cat-8',
    slug: 'best-microphone',
    name: 'Best Microphone',
    description: 'TWS dengan mikrofon AI Noise Reduction tercanggih untuk panggilan suara jernih dan meeting online bebas suara bising.',
    iconName: 'Mic',
    articleCount: 9,
    productCount: 14,
    imageUrl: sonyWfImg
  }
];

export const INITIAL_AFFILIATE_LINKS: AffiliateLinkItem[] = [
  {
    id: 'aff-1',
    productId: 'prod-1',
    productName: 'Anker Soundcore Liberty 5',
    marketplace: 'tokopedia',
    affiliateUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    clicks: 1840,
    status: 'active',
    createdAt: '2026-01-15'
  },
  {
    id: 'aff-2',
    productId: 'prod-1',
    productName: 'Anker Soundcore Liberty 5',
    marketplace: 'shopee',
    affiliateUrl: 'https://shopee.co.id/search?keyword=Soundcore%20Liberty%205',
    clicks: 1420,
    status: 'active',
    createdAt: '2026-01-15'
  },
  {
    id: 'aff-3',
    productId: 'prod-2',
    productName: 'Apple AirPods Pro 2',
    marketplace: 'tokopedia',
    affiliateUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    clicks: 980,
    status: 'active',
    createdAt: '2026-01-10'
  },
  {
    id: 'aff-4',
    productId: 'prod-4',
    productName: 'GOOJOD0Q J206 TWS Pro',
    marketplace: 'tokopedia',
    affiliateUrl: 'https://vt.tokopedia.com/t/ZS9AfThNusdPL-onCes/',
    clicks: 2410,
    status: 'active',
    createdAt: '2026-02-01'
  }
];

export const INITIAL_MEDIA: MediaItem[] = [
  { id: 'm-1', fileName: 'soundcore_liberty_5.jpg', url: soundcoreLibertyImg, size: '420 KB', uploadDate: '2026-02-28', type: 'image' },
  { id: 'm-2', fileName: 'airpods_pro_2.jpg', url: airpodsProImg, size: '380 KB', uploadDate: '2026-02-28', type: 'image' },
  { id: 'm-3', fileName: 'sony_wf1000xm5.jpg', url: sonyWfImg, size: '510 KB', uploadDate: '2026-02-28', type: 'image' },
  { id: 'm-4', fileName: 'goojodoq_j206.jpg', url: goojodoqImg, size: '310 KB', uploadDate: '2026-02-28', type: 'image' }
];

export const INITIAL_COMMENTS: ArticleComment[] = [
  {
    id: 'comm-1',
    articleId: 'art-1',
    articleTitle: 'Soundcore Liberty 5 Review',
    userName: 'Rian Pratama (Teknik Informatika ITB)',
    userEmail: 'rian.pratama@student.itb.ac.id',
    comment: 'Soundcore Liberty 5 emang juara banget kak! ANC nya kedap banget pas dipake ngerjain tugas di cafe. Worth it parah rekomendasi dari GADGET HEMATT!',
    date: '28 Februari 2026',
    status: 'approved'
  },
  {
    id: 'comm-2',
    articleId: 'art-2',
    articleTitle: '5 TWS Terbaik di Bawah Rp500 Ribu',
    userName: 'Anisa Fitriani (UI Depok)',
    userEmail: 'anisa.f@ui.ac.id',
    comment: 'Makasih rekomendasinya, kemaren langsung checkout GOOJOD0Q J206 lewat link Tokopedia GADGET HEMATT. Baterainya beneran awet seharian!',
    date: '26 Februari 2026',
    status: 'approved'
  }
];
