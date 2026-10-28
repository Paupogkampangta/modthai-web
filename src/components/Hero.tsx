import React from 'react';
import { Search, Sparkles, SlidersHorizontal, CheckCircle, Gamepad2 } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  totalModsCount: number;
  totalDownloads: number;
  sortBy: 'latest' | 'downloads' | 'progress';
  setSortBy: (sort: 'latest' | 'downloads' | 'progress') => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalModsCount,
  totalDownloads,
  sortBy,
  setSortBy,
}) => {
  return (
    <section className="relative pt-12 pb-8 border-b border-slate-200/80 bg-gradient-to-b from-sky-50/60 via-white to-[#f8fafc] overflow-hidden">
      {/* Subtle sky ambient background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-sky-200/20 via-sky-100/10 to-transparent pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          {/* Unboxed editorial kicker */}
          <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span className="text-sky-600 font-bold flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>MODTHAI · แปลเองเล่นเอง</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>By Loli is My Life</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">แจกฟรี 100%</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight font-['Prompt'] text-balance">
            ม็อดแปลไทย  <br className="hidden sm:inline" />
            <span className="text-sky-600">แปลเองเล่นเอง</span> ตามเกมที่อยากเล่น
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            ยินดีต้อนรับสู่ม็อดภาษาไทยโดย <strong>Loli is My Life</strong> รวบรวมงานแปลเกมที่ลงมือแปลเอง
            จะพยายามเกลาคำเท่าที่ทำได้นะครับ แปลโดยใช้ AI ช่วยในการทำงาน แนะนำเกมเข้ามาได้ครับ
          </p>

          {/* Clean Quantitative Trust Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-1.5 text-slate-800">
              <CheckCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>{totalModsCount} โปรเจกต์เกมแปลเสร็จ & กำลังพัฒนา</span>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5 text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{totalDownloads.toLocaleString()} ยอดดาวน์โหลดสะสม</span>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5 text-slate-800">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>แนะนำเกมที่อยากให้แปลได้นะ</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่อเกม, ชื่อภาษาอังกฤษ หรือหมวดหมู่..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                ล้าง
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 whitespace-nowrap">จัดเรียง:</span>
            <div className="flex items-center gap-1 bg-white border border-slate-200 p-0.5 rounded-lg text-xs shadow-xs">
              <button
                onClick={() => setSortBy('latest')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  sortBy === 'latest'
                    ? 'bg-sky-600 text-white font-medium shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                อัปเดตล่าสุด
              </button>
              <button
                onClick={() => setSortBy('downloads')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  sortBy === 'downloads'
                    ? 'bg-sky-600 text-white font-medium shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ยอดนิยม
              </button>
              <button
                onClick={() => setSortBy('progress')}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  sortBy === 'progress'
                    ? 'bg-sky-600 text-white font-medium shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ความคืบหน้า
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap shadow-xs ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white font-semibold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-sky-300'
              }`}
            >
              {cat === 'all' ? 'ทั้งหมด' : cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
