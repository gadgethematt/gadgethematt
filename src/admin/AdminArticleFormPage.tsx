import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  Sparkles, 
  Check, 
  Upload, 
  Trash2,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Eye,
  Edit3,
  ShoppingBag,
  Type
} from 'lucide-react';
import { prepareArticleContent, normalizeLinkHref } from '../utils/contentFormatter';

export const AdminArticleFormPage: React.FC = () => {
  const { editingId, setAdminRoute, articles, products } = useApp();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [editorMode, setEditorMode] = useState<'write' | 'preview'>('write');
  const [category, setCategory] = useState('Blog');
  const [author, setAuthor] = useState('Dika Ramadhan');
  const [readTime, setReadTime] = useState('5 menit baca');
  const [tagsInput, setTagsInput] = useState('Blog, Mahasiswa, Audio, TWS');
  const [featuredImage, setFeaturedImage] = useState('/src/assets/images/soundcore_liberty_5_1790729961290.jpg');
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [relatedProductId, setRelatedProductId] = useState('prod-1');
  const [verdictScore, setVerdictScore] = useState(9.2);
  const [prosInput, setProsInput] = useState('Audio LDAC jernih\nANC adaptif sunyi');
  const [consInput, setConsInput] = useState('Case bodi licin');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (editingId) {
      const art = articles.find(a => a.id === editingId);
      if (art) {
        setTitle(art.title);
        setSubtitle(art.subtitle || '');
        setExcerpt(art.excerpt || '');
        setContent(art.content || '');
        setCategory(art.category || 'Blog');
        setAuthor(art.author || 'Dika Ramadhan');
        setReadTime(art.readTime || '5 menit baca');
        setTagsInput((art.tags || []).join(', '));
        setFeaturedImage(art.featuredImage);
        setStatus(art.status);
        setRelatedProductId(art.relatedProductId || 'prod-1');
        setVerdictScore(art.verdictScore || 9.2);
        setProsInput((art.pros || []).join('\n'));
        setConsInput((art.cons || []).join('\n'));
      }
    }
  }, [editingId, articles]);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const insertTag = (openTag: string, closeTag: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultText;
    const replacement = `${openTag}${selectedText}${closeTag}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + openTag.length, start + openTag.length + selectedText.length);
    }, 10);
  };

  const handleInsertLink = () => {
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart || 0;
    const end = textarea?.selectionEnd || 0;
    const selectedText = content.substring(start, end) || 'Teks Link';

    const rawUrl = window.prompt('Masukkan URL Tujuan (contoh: https://tokopedia.com/... atau tokopedia.com):', 'https://');
    if (!rawUrl || rawUrl.trim() === '' || rawUrl.trim() === 'https://') return;

    const validUrl = normalizeLinkHref(rawUrl);
    const linkHtml = `<a href="${validUrl}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`;

    if (textarea) {
      const newContent = content.substring(0, start) + linkHtml + content.substring(end);
      setContent(newContent);
      setTimeout(() => {
        textarea.focus();
      }, 10);
    } else {
      setContent(prev => prev + linkHtml);
    }
  };

  const handleInsertButtonLink = () => {
    const textarea = textareaRef.current;
    const start = textarea?.selectionStart || 0;
    const end = textarea?.selectionEnd || 0;
    const selectedText = content.substring(start, end) || 'Cek Promo di Tokopedia Resmi';

    const rawUrl = window.prompt('Masukkan URL Afiliasi / Pembelian:', 'https://');
    if (!rawUrl || rawUrl.trim() === '' || rawUrl.trim() === 'https://') return;

    const validUrl = normalizeLinkHref(rawUrl);
    const buttonHtml = `\n<div style="margin: 24px 0; text-align: center;">\n  <a href="${validUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 13px 26px; background-color: #03AC0E; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 800; font-size: 14px; box-shadow: 0 4px 16px rgba(3, 172, 14, 0.35); border: 1px solid rgba(255, 255, 255, 0.15);">\n    👉 <strong>${selectedText}</strong>\n  </a>\n</div>\n`;

    if (textarea) {
      const newContent = content.substring(0, start) + buttonHtml + content.substring(end);
      setContent(newContent);
      setTimeout(() => {
        textarea.focus();
      }, 10);
    } else {
      setContent(prev => prev + buttonHtml);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const formattedContent = prepareArticleContent(content);

    dbService.saveArticle({
      id: editingId || undefined,
      title,
      subtitle,
      excerpt: excerpt || subtitle || title,
      content: formattedContent,
      category,
      author,
      readTime,
      tags,
      featuredImage,
      status,
      relatedProductId,
      verdictScore: Number(verdictScore),
      pros: prosInput.split('\n').filter(Boolean),
      cons: consInput.split('\n').filter(Boolean)
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setAdminRoute('articles');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E4E8E5]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAdminRoute('articles')}
            className="p-2 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-black hover:bg-neutral-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-display font-black text-xl text-[#080808] uppercase">
              {editingId ? 'EDIT ARTIKEL BLOG' : 'TULIS ARTIKEL BLOG BARU'}
            </h2>
            <p className="text-xs text-[#68736D]">
              Artikel yang disimpan dengan status &quot;Published&quot; akan langsung muncul di Bagian Blog website.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1.5 shadow-sm">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Artikel Berhasil Disimpan & Diterbitkan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN EDITOR FORM */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs space-y-5">
          
          <div>
            <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">
              Judul Artikel Blog <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: 5 Tips Memilih TWS Awet Baterai untuk Kuliah Online & Skripsi..."
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-sm font-bold text-[#080808] focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Sub-Judul / Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ringkasan poin menarik yang akan dipelajari pembaca..."
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Kutipan Singkat (Excerpt Preview)</label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan 2 kalimat yang muncul di card blog..."
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none resize-none"
            />
          </div>

          {/* CONTENT EDITOR WITH TOOLBAR & PREVIEW TAB */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
              <div>
                <label className="text-xs font-black text-[#080808] uppercase tracking-wider block">
                  Isi Konten Artikel <span className="text-rose-600">*</span>
                </label>
                <span className="text-[11px] text-[#68736D]">
                  Struktur paragraf, heading, list, dan link otomatis terjaga rapi & aman.
                </span>
              </div>

              {/* MODE SWITCHER */}
              <div className="flex items-center gap-1 p-1 bg-[#F0F2F0] rounded-xl border border-[#E4E8E5] self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setEditorMode('write')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    editorMode === 'write'
                      ? 'bg-white text-black shadow-xs'
                      : 'text-[#68736D] hover:text-black'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('preview')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    editorMode === 'preview'
                      ? 'bg-[#12151A] text-white shadow-xs'
                      : 'text-[#68736D] hover:text-black'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>
              </div>
            </div>

            {editorMode === 'write' ? (
              <div className="rounded-2xl border border-[#E4E8E5] overflow-hidden bg-white shadow-xs">
                {/* TOOLBAR */}
                <div className="flex flex-wrap items-center gap-1 p-2 bg-[#F7F8F6] border-b border-[#E4E8E5] text-[#080808]">
                  <button
                    type="button"
                    onClick={() => insertTag('<h2>', '</h2>', 'Judul Bagian')}
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-xs font-black flex items-center gap-1 px-2.5 transition-colors cursor-pointer"
                    title="Heading 2 (Judul Bagian)"
                  >
                    <Heading2 className="w-3.5 h-3.5" />
                    <span>H2</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertTag('<h3>', '</h3>', 'Sub-Judul Poin')}
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-xs font-black flex items-center gap-1 px-2.5 transition-colors cursor-pointer"
                    title="Heading 3 (Sub-Judul)"
                  >
                    <Heading3 className="w-3.5 h-3.5" />
                    <span>H3</span>
                  </button>

                  <div className="w-[1px] h-5 bg-[#D0D7D1] mx-1" />

                  <button
                    type="button"
                    onClick={() => insertTag('<p>', '</p>', 'Paragraf baru...')}
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-xs font-bold flex items-center gap-1 px-2 transition-colors cursor-pointer"
                    title="Bungkus Paragraf"
                  >
                    <Type className="w-3.5 h-3.5" />
                    <span className="text-[11px]">P</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => insertTag('<strong>', '</strong>', 'Teks Tebal')}
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                    title="Teks Tebal (Bold)"
                  >
                    <Bold className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => insertTag('<em>', '</em>', 'Teks Miring')}
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                    title="Teks Miring (Italic)"
                  >
                    <Italic className="w-4 h-4" />
                  </button>

                  <div className="w-[1px] h-5 bg-[#D0D7D1] mx-1" />

                  <button
                    type="button"
                    onClick={() => insertTag('<ul>\n  <li>', '</li>\n  <li>Poin 2</li>\n</ul>', 'Poin 1')}
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                    title="Daftar Poin (Bullet List)"
                  >
                    <List className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => insertTag('<ol>\n  <li>', '</li>\n  <li>Langkah 2</li>\n</ol>', 'Langkah 1')}
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                    title="Daftar Nomor (Numbered List)"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => insertTag('<blockquote><p>', '</p></blockquote>', 'Kutipan penting...')}
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-xs font-bold transition-colors cursor-pointer"
                    title="Kutipan (Blockquote)"
                  >
                    <Quote className="w-4 h-4" />
                  </button>

                  <div className="w-[1px] h-5 bg-[#D0D7D1] mx-1" />

                  <button
                    type="button"
                    onClick={handleInsertLink}
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-xs font-bold flex items-center gap-1 px-2.5 text-blue-700 transition-colors cursor-pointer"
                    title="Sisipkan Link (Auto-https & target _blank)"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>+ Link</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleInsertButtonLink}
                    className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-black flex items-center gap-1 px-2.5 transition-colors cursor-pointer"
                    title="Sisipkan Tombol CTA Link Belanja"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />
                    <span>+ Tombol CTA</span>
                  </button>
                </div>

                <textarea
                  ref={textareaRef}
                  rows={15}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tulis artikel di sini. Anda bisa mengetik biasa (enter untuk baris baru), atau memakai tombol toolbar di atas untuk menambahkan Heading, List, Teks Tebal, dan Link aktif..."
                  className="w-full p-4 text-xs font-mono text-[#080808] focus:outline-none resize-y leading-relaxed"
                />

                <div className="px-4 py-2 bg-[#F7F8F6] border-t border-[#E4E8E5] flex items-center justify-between text-[11px] text-[#68736D]">
                  <span>💡 Tips: Klik tab <strong>Live Preview</strong> untuk melihat hasil render persis seperti di website.</span>
                  <span>{content.length} karakter</span>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#1A1F26] bg-[#050608] p-6 shadow-md overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#1A1F26]">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#92B6E5]">
                    <Eye className="w-4 h-4 text-[#92B6E5]" />
                    <span>Live Pratinjau Tampilan Pembaca</span>
                  </div>
                  <span className="text-[11px] text-[#9AA5B1]">Semua link aktif & dapat diuji</span>
                </div>

                <div 
                  className="article-content max-w-none min-h-[300px]"
                  dangerouslySetInnerHTML={{ 
                    __html: prepareArticleContent(content || '<p class="text-neutral-500 italic">Belum ada konten artikel. Tulis di tab Editor terlebih dahulu.</p>') 
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Poin Kelebihan (1 per baris)</label>
              <textarea
                rows={3}
                value={prosInput}
                onChange={(e) => setProsInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Catatan / Poin Perhatian (1 per baris)</label>
              <textarea
                rows={3}
                value={consInput}
                onChange={(e) => setConsInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* SIDEBAR METADATA & PUBLISH */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-xs space-y-5">
            
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#B9F43A] hover:bg-[#a3e028] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>{editingId ? 'SIMPAN PERUBAHAN' : 'PUBLIKASIKAN ARTIKEL'}</span>
            </button>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Status Publikasi</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'published' | 'draft')}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              >
                <option value="published">Published (Tayang di Blog)</option>
                <option value="draft">Draft (Konsep Sementara)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Kategori Artikel</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              >
                <option value="Blog">Blog & Berita</option>
                <option value="Buying Guides">Buying Guides (Panduan Belanja)</option>
                <option value="Reviews">Reviews (Ulasan)</option>
                <option value="Tips Audio">Tips Audio & Gadget</option>
                <option value="Comparisons">Comparisons (Komparasi)</option>
                <option value="Edukasi Pelajar">Edukasi Pelajar</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Penulis / Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Waktu Baca (Estimasi)</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="Contoh: 4 menit baca"
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Tags (Pisahkan Koma)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="TWS, Pelajar, ANC, Audio"
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Produk Terkait (Opsional)</label>
              <select
                value={relatedProductId}
                onChange={(e) => setRelatedProductId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              >
                <option value="">-- Tidak ada produk terkait --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* FEATURED IMAGE WITH FILE UPLOAD & URL */}
            <div className="pt-2 border-t border-[#E4E8E5] space-y-3">
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block">Gambar Utama Artikel</label>
              
              <div>
                <label className="text-[10px] font-bold text-[#68736D] uppercase block mb-1">Upload File dari Perangkat</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full text-xs font-medium text-[#68736D] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-[#25282A] file:text-white hover:file:bg-black cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#68736D] uppercase block mb-1">Atau Gunakan URL Gambar</label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-mono"
                />
              </div>

              {featuredImage && (
                <div className="relative mt-2 rounded-xl overflow-hidden border border-[#E4E8E5] bg-[#F7F8F6]">
                  <img src={featuredImage} alt="Preview" className="w-full h-36 object-cover" />
                  <button
                    type="button"
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/75 text-white hover:bg-rose-600 transition-colors"
                    title="Hapus gambar"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </form>

    </div>
  );
};
