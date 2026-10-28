import React from 'react';
import { Heart, PlusCircle, Settings, Gamepad2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'all' | 'latest' | 'install' | 'wishlist' | 'donate';
  setActiveTab: (tab: 'all' | 'latest' | 'install' | 'wishlist' | 'donate') => void;
  onOpenDonate: () => void;
  onOpenAdmin: () => void;
  onOpenAddMod: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDonate,
  onOpenAdmin,
  onOpenAddMod,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark with Brand Tagline */}
        <button
          onClick={() => {
            setActiveTab('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left group flex flex-col justify-center shrink-0 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="font-['Plus_Jakarta_Sans'] font-black tracking-tight text-xl text-slate-900 group-hover:text-sky-600 transition-colors">
              MOD<span className="text-sky-600">THAI</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/60 font-['Prompt']">
              แปลเองเล่นเอง
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-normal font-['Prompt'] -mt-0.5 tracking-tight">
            By <strong className="text-slate-700 font-semibold">Loli is My Life</strong>
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('all')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'all'
                ? 'text-sky-600 border-b-2 border-sky-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ม็อดทั้งหมด
          </button>
          <button
            onClick={() => setActiveTab('latest')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'latest'
                ? 'text-sky-600 border-b-2 border-sky-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            อัปเดตล่าสุด
          </button>
          <button
            onClick={() => setActiveTab('install')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'install'
                ? 'text-sky-600 border-b-2 border-sky-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            วิธีติดตั้งทั่วไป
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'wishlist'
                ? 'text-sky-600 border-b-2 border-sky-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            เสนอเกมที่อยากให้แปล
          </button>
          <button
            onClick={() => {
              setActiveTab('donate');
              onOpenDonate();
            }}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              activeTab === 'donate'
                ? 'text-sky-600 border-b-2 border-sky-600 font-semibold'
                : 'text-slate-600 hover:text-sky-600'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-sky-500 fill-sky-100" />
            <span>โดเนทสนับสนุน</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action + creator tools */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAddMod}
            title="เพิ่มม็อดใหม่ (สำหรับผู้พัฒนา)"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:border-sky-300 hover:bg-sky-50/50 transition-colors whitespace-nowrap shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>ลงมอดใหม่</span>
          </button>

          <button
            onClick={onOpenAdmin}
            title="ตั้งค่าบัญชีรับเงิน & ข้อมูลเว็บ"
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-lg hover:border-sky-300 hover:bg-sky-50/50 transition-colors shadow-xs"
            aria-label="ตั้งค่าบัญชีรับเงิน"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActiveTab('donate');
              onOpenDonate();
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm shadow-sky-600/20 transition-all whitespace-nowrap active:scale-[0.98]"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>สนับสนุนผู้แปล</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center gap-4 px-4 py-2.5 overflow-x-auto border-t border-slate-200/80 text-xs no-scrollbar bg-slate-50/80">
        <button
          onClick={() => setActiveTab('all')}
          className={`whitespace-nowrap shrink-0 ${
            activeTab === 'all' ? 'text-sky-600 font-semibold' : 'text-slate-600'
          }`}
        >
          มอดทั้งหมด
        </button>
        <button
          onClick={() => setActiveTab('latest')}
          className={`whitespace-nowrap shrink-0 ${
            activeTab === 'latest' ? 'text-sky-600 font-semibold' : 'text-slate-600'
          }`}
        >
          อัปเดตล่าสุด
        </button>
        <button
          onClick={() => setActiveTab('install')}
          className={`whitespace-nowrap shrink-0 ${
            activeTab === 'install' ? 'text-sky-600 font-semibold' : 'text-slate-600'
          }`}
        >
          วิธีติดตั้ง
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`whitespace-nowrap shrink-0 ${
            activeTab === 'wishlist' ? 'text-sky-600 font-semibold' : 'text-slate-600'
          }`}
        >
          เสนอเกม
        </button>
        <button
          onClick={() => {
            setActiveTab('donate');
            onOpenDonate();
          }}
          className={`whitespace-nowrap shrink-0 flex items-center gap-1 ${
            activeTab === 'donate' ? 'text-sky-600 font-semibold' : 'text-sky-600/90'
          }`}
        >
          <Heart className="w-3 h-3 fill-sky-600" />
          <span>แท็บโดเนท</span>
        </button>
      </div>
    </header>
  );
};
