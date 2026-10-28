import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onScrollToTab: (tab: 'all' | 'latest' | 'install' | 'wishlist' | 'donate') => void;
  onOpenDonate: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToTab,
  onOpenDonate,
  onOpenAdmin,
}) => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-500 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="space-y-1.5">
            <div className="text-base font-bold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans']">
              MOD<span className="text-sky-600">THAI</span>
              <span className="text-xs font-normal text-slate-500 font-['Prompt'] ml-2">
                แปลเองเล่นเอง By Loli is My Life
              </span>
            </div>
            <p className="text-slate-500 font-['Prompt'] max-w-md leading-relaxed font-light">
              แปลเกมตามเกมที่อยากเล่น ดาวน์โหลดฟรี
              หากประทับใจ โดเนทเป็นกำลังใจเราได้นะครับ หรือมีข้อแก้ไขสามารถแนะนำเราได้
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-600 font-medium">
            <button
              onClick={() => {
                onScrollToTab('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-sky-600 transition-colors"
            >
              ม็อดทั้งหมด
            </button>
            <button
              onClick={() => onScrollToTab('install')}
              className="hover:text-sky-600 transition-colors"
            >
              วิธีติดตั้ง
            </button>
            <button
              onClick={() => onScrollToTab('wishlist')}
              className="hover:text-sky-600 transition-colors"
            >
              เสนอเกมที่อยากให้แปล
            </button>
            <button
              onClick={() => {
                onScrollToTab('donate');
                onOpenDonate();
              }}
              className="text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1 font-semibold"
            >
              <Heart className="w-3.5 h-3.5 fill-sky-100 text-sky-600" />
              <span>แท็บโดเนทสนับสนุน</span>
            </button>
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              ตั้งค่าบัญชีรับเงิน
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} MODTHAI - แปลเองเล่นเอง By Loli is My Life. All game trademarks belong to their respective creators.
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>แปลเองเล่นเองด้วยความรักเพื่อแฟนเกมชาวไทย</span>
            <span className="text-rose-500">♥</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
