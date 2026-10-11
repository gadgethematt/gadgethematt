import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Save, ArrowLeft, Image as ImageIcon, Sparkles, Check, Upload, Trash2 } from 'lucide-react';

export const AdminArticleFormPage: React.FC = () => {
  const { editingId, setAdminRoute, articles, products } = useApp();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    dbService.saveArticle({
      id: editingId || undefined,
      title,
      subtitle,
      excerpt: excerpt || subtitle || title,
      content,
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block">
                Isi Konten Artikel (Mendukung HTML & Teks) <span className="text-rose-600">*</span>
              </label>
              <span className="text-[10px] text-[#68736D] font-mono">Bisa menggunakan tag &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, dll</span>
            </div>
            <textarea
              rows={14}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="<p>Tulis paragraf artikel di sini...</p> <h2>Poin Utama</h2> <p>Penjelasan detail...</p>"
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-mono text-[#080808] focus:outline-none focus:border-black"
            />
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
