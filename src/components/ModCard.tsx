import React from 'react';
import { Download, Heart, ArrowUpRight, Check, Clock } from 'lucide-react';
import { GameMod } from '../types';

interface ModCardProps {
  mod: GameMod;
  onSelectMod: (mod: GameMod) => void;
  onQuickDownload: (mod: GameMod) => void;
  onToggleLike: (modId: string) => void;
  isLiked?: boolean;
}

export const ModCard: React.FC<ModCardProps> = ({
  mod,
  onSelectMod,
  onQuickDownload,
  onToggleLike,
  isLiked = false,
}) => {
  return (
    <article className="group relative bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-sky-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between shadow-xs">
      <div>
        {/* Cover Image Container */}
        <div
          onClick={() => onSelectMod(mod)}
          className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 cursor-pointer"
        >
          <img
            src={mod.coverImage}
            alt={mod.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          />

          {/* Measured Light Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Category Tag (unboxed clean tag in corner) */}
          <div className="absolute top-3 left-3 flex items-center gap-2 text-xs font-medium text-white drop-shadow-sm">
            <span className="text-[11px] bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-slate-800 font-semibold border border-white/50 shadow-xs">
              {mod.category}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(mod.id);
              }}
              className={`p-1.5 rounded-full backdrop-blur-md transition-all shadow-xs ${
                isLiked
                  ? 'bg-rose-50 text-rose-500 border border-rose-200'
                  : 'bg-white/80 text-slate-600 hover:text-rose-500 border border-white/80 hover:bg-white'
              }`}
              aria-label="ถูกใจมอดนี้"
            >
              <Heart
                className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`}
              />
            </button>
          </div>

          {/* Bottom badge on image */}
          <div className="absolute bottom-3 left-3 text-white text-xs font-medium drop-shadow-sm">
            <span className="text-[11px] text-white/90 font-mono">แปลโดย: {mod.author}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Metadata Discipline: Clean unboxed metadata with separators */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>{mod.platform.join(' / ')}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-sky-600 font-medium">{mod.version}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{mod.lastUpdated}</span>
          </div>

          {/* Title Lockup */}
          <div className="space-y-1">
            <h3
              onClick={() => onSelectMod(mod)}
              className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors cursor-pointer line-clamp-1 font-['Prompt']"
            >
              {mod.title}
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              {mod.originalTitle}
            </p>
          </div>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {mod.summary}
          </p>

          {/* Translation Progress Hairline */}
          <div className="pt-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1 font-medium">
                {mod.progress === 100 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">แปลเสร็จสมบูรณ์ 100%</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span className="text-sky-600">แปลแล้ว {mod.progress}%</span>
                  </>
                )}
              </span>
              <span className="text-slate-500 tabular-nums">
                {mod.downloadCount.toLocaleString()} ดาวน์โหลด
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  mod.progress === 100 ? 'bg-emerald-500' : 'bg-sky-500'
                }`}
                style={{ width: `${mod.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-4 sm:p-5 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
        <button
          onClick={() => onSelectMod(mod)}
          className="text-xs font-medium text-slate-600 hover:text-sky-600 flex items-center gap-1 transition-colors py-1.5"
        >
          <span>วิธีติดตั้ง & คู่มือ</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onQuickDownload(mod)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white border border-sky-200/80 hover:border-transparent rounded-lg transition-all active:scale-[0.98] shadow-xs"
        >
          <Download className="w-3.5 h-3.5" />
          <span>ดาวน์โหลด</span>
          <span className="text-[11px] opacity-80 tabular-nums">({mod.downloads.primary.fileSize})</span>
        </button>
      </div>
    </article>
  );
};
