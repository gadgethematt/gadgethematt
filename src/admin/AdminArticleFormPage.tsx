import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { dbService } from '../services/dbService';
import { Save, ArrowLeft, Image as ImageIcon, Sparkles, Check } from 'lucide-react';

export const AdminArticleFormPage: React.FC = () => {
  const { editingId, setAdminRoute, articles, products, categories } = useApp();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Reviews');
  const [author, setAuthor] = useState('Dika Ramadhan');
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
        setCategory(art.category || 'Reviews');
        setAuthor(art.author || 'Dika Ramadhan');
        setFeaturedImage(art.featuredImage);
        setStatus(art.status);
        setRelatedProductId(art.relatedProductId || 'prod-1');
        setVerdictScore(art.verdictScore || 9.2);
        setProsInput((art.pros || []).join('\n'));
        setConsInput((art.cons || []).join('\n'));
      }
    }
  }, [editingId, articles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dbService.saveArticle({
      id: editingId || undefined,
      title,
      subtitle,
      excerpt,
      content,
      category,
      author,
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
            onClick={() => setAdminRoute('articles')}
            className="p-2 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-black hover:bg-neutral-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-display font-black text-xl text-[#080808] uppercase">
              {editingId ? 'EDIT ARTIKEL' : 'TULIS ARTIKEL BARU'}
            </h2>
            <p className="text-xs text-[#68736D]">Editor konten ulasan, panduan belanja, dan komparasi.</p>
          </div>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Artikel Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN EDITOR FORM */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm space-y-5">
          
          <div>
            <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Judul Artikel</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Soundcore Liberty 5 Review: TWS ANC Terbaik Under 1.5 Juta..."
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-sm font-bold text-[#080808] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Sub-Judul / Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Uji mendalam performa mikrofon, daya tahan baterai, dan peredam bising..."
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Kutipan Singkat (Excerpt)</label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan 2 kalimat yang muncul di card preview..."
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Isi Konten Artikel (Rich HTML Format)</label>
            <textarea
              rows={12}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="<p>Tulis paragraf ulasan di sini...</p> <h2>Desain & Fitur</h2> <p>...</p>"
              className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-mono text-[#080808] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Kelebihan (1 per baris)</label>
              <textarea
                rows={3}
                value={prosInput}
                onChange={(e) => setProsInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-medium text-[#080808] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Kekurangan (1 per baris)</label>
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
          <div className="p-6 rounded-3xl bg-white border border-[#E4E8E5] shadow-sm space-y-5">
            
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
                <option value="published">Published (Tayang)</option>
                <option value="draft">Draft (Konsep)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Kategori Utama</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              >
                <option value="Reviews">Reviews (Ulasan)</option>
                <option value="Buying Guides">Buying Guides (Panduan Belanja)</option>
                <option value="Comparisons">Comparisons (Komparasi)</option>
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
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Sertakan Produk Terkait</label>
              <select
                value={relatedProductId}
                onChange={(e) => setRelatedProductId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Skor Verdict (1 - 10)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="10"
                value={verdictScore}
                onChange={(e) => setVerdictScore(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-black text-[#080808] uppercase tracking-wider block mb-1">Gambar Utama (URL Image)</label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F8F6] border border-[#E4E8E5] text-xs font-mono"
              />
              {featuredImage && (
                <img src={featuredImage} alt="Preview" className="w-full h-32 object-cover rounded-xl mt-2 border border-[#E4E8E5]" />
              )}
            </div>

          </div>
        </div>

      </form>

    </div>
  );
};
