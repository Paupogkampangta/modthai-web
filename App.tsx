import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ModCard } from './components/ModCard';
import { ModModal } from './components/ModModal';
import { DonateSection } from './components/DonateSection';
import { WishlistSection } from './components/WishlistSection';
import { FaqSection } from './components/FaqSection';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import {
  INITIAL_MODS,
  INITIAL_DONATION_CONFIG,
  INITIAL_DONOR_MESSAGES,
  INITIAL_WISHLIST,
} from './data/mockData';
import { GameMod, DonationConfig, DonorMessage, WishlistItem, CommentItem } from './types';
import { Heart } from 'lucide-react';

export default function App() {
  // Persistence via localStorage
  const [mods, setMods] = useState<GameMod[]>(() => {
    try {
      const saved = localStorage.getItem('modthai_mods');
      return saved ? JSON.parse(saved) : INITIAL_MODS;
    } catch {
      return INITIAL_MODS;
    }
  });

  const [donationConfig, setDonationConfig] = useState<DonationConfig>(() => {
    try {
      const saved = localStorage.getItem('modthai_donation_config');
      return saved ? JSON.parse(saved) : INITIAL_DONATION_CONFIG;
    } catch {
      return INITIAL_DONATION_CONFIG;
    }
  });

  const [donorMessages, setDonorMessages] = useState<DonorMessage[]>(() => {
    try {
      const saved = localStorage.getItem('modthai_donor_messages');
      return saved ? JSON.parse(saved) : INITIAL_DONOR_MESSAGES;
    } catch {
      return INITIAL_DONOR_MESSAGES;
    }
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('modthai_wishlist');
      return saved ? JSON.parse(saved) : INITIAL_WISHLIST;
    } catch {
      return INITIAL_WISHLIST;
    }
  });

  const [likedModIds, setLikedModIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('modthai_liked_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI States
  const [activeTab, setActiveTab] = useState<'all' | 'latest' | 'install' | 'wishlist' | 'donate'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'latest' | 'downloads' | 'progress'>('latest');
  const [selectedMod, setSelectedMod] = useState<GameMod | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'config' | 'add_mod'>('config');
  const [preselectedGameForDonation, setPreselectedGameForDonation] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('modthai_mods', JSON.stringify(mods));
  }, [mods]);

  useEffect(() => {
    localStorage.setItem('modthai_donation_config', JSON.stringify(donationConfig));
  }, [donationConfig]);

  useEffect(() => {
    localStorage.setItem('modthai_donor_messages', JSON.stringify(donorMessages));
  }, [donorMessages]);

  useEffect(() => {
    localStorage.setItem('modthai_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('modthai_liked_ids', JSON.stringify(likedModIds));
  }, [likedModIds]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = `t_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    mods.forEach((m) => set.add(m.category));
    return ['all', ...Array.from(set)];
  }, [mods]);

  // Filtered & Sorted Mods
  const filteredMods = useMemo(() => {
    return mods
      .filter((mod) => {
        // Category filter
        if (selectedCategory !== 'all' && mod.category !== selectedCategory) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = mod.title.toLowerCase().includes(q);
          const matchOrig = mod.originalTitle.toLowerCase().includes(q);
          const matchCat = mod.category.toLowerCase().includes(q);
          const matchSummary = mod.summary.toLowerCase().includes(q);
          if (!matchTitle && !matchOrig && !matchCat && !matchSummary) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'downloads') return b.downloadCount - a.downloadCount;
        if (sortBy === 'progress') return b.progress - a.progress;
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      });
  }, [mods, selectedCategory, searchQuery, sortBy]);

  // Total downloads & stats
  const totalDownloads = useMemo(() => {
    return mods.reduce((sum, m) => sum + m.downloadCount, 0);
  }, [mods]);

  // Handlers
  const handleToggleLike = (modId: string) => {
    const isCurrentlyLiked = likedModIds.includes(modId);
    if (isCurrentlyLiked) {
      setLikedModIds((prev) => prev.filter((id) => id !== modId));
      setMods((prev) =>
        prev.map((m) => (m.id === modId ? { ...m, likes: Math.max(0, m.likes - 1) } : m))
      );
    } else {
      setLikedModIds((prev) => [...prev, modId]);
      setMods((prev) =>
        prev.map((m) => (m.id === modId ? { ...m, likes: m.likes + 1 } : m))
      );
      showToast('ขอบคุณที่ถูกใจมอดนี้ครับ!');
    }
  };

  const handleDownload = (mod: GameMod, customUrl?: string) => {
    setMods((prev) =>
      prev.map((m) => (m.id === mod.id ? { ...m, downloadCount: m.downloadCount + 1 } : m))
    );

    const url = customUrl || mod.downloads.primary.url;
    showToast(`กำลังเตรียมดาวน์โหลดมอด ${mod.title}...`);

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const handleOpenDonateForGame = (gameTitle: string) => {
    setPreselectedGameForDonation(gameTitle);
    setActiveTab('donate');
    const el = document.getElementById('donate-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddComment = (modId: string, comment: CommentItem) => {
    setMods((prev) =>
      prev.map((m) => {
        if (m.id === modId) {
          return {
            ...m,
            comments: [comment, ...(m.comments || [])],
          };
        }
        return m;
      })
    );
    if (selectedMod && selectedMod.id === modId) {
      setSelectedMod((prev) =>
        prev ? { ...prev, comments: [comment, ...(prev.comments || [])] } : null
      );
    }
  };

  const handleAddDonorMessage = (message: DonorMessage) => {
    setDonorMessages((prev) => [message, ...prev]);
    setDonationConfig((prev) => ({
      ...prev,
      currentGoalAmount: prev.currentGoalAmount + message.amount,
    }));
  };

  const handleToggleVoteWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextVoted = !item.votedByMe;
          return {
            ...item,
            votedByMe: nextVoted,
            votes: nextVoted ? item.votes + 1 : item.votes - 1,
          };
        }
        return item;
      })
    );
  };

  const handleAddWishlistItem = (itemData: Omit<WishlistItem, 'id' | 'votes' | 'votedByMe'>) => {
    const newItem: WishlistItem = {
      ...itemData,
      id: `w_${Date.now()}`,
      votes: 1,
      votedByMe: true,
    };
    setWishlist((prev) => [newItem, ...prev]);
  };

  const handleAddMod = (newMod: GameMod) => {
    setMods((prev) => [newMod, ...prev]);
  };

  const handleDeleteMod = (modId: string) => {
    setMods((prev) => prev.filter((m) => m.id !== modId));
  };

  const handleResetDefaults = () => {
    if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นหรือไม่?')) {
      localStorage.clear();
      setMods(INITIAL_MODS);
      setDonationConfig(INITIAL_DONATION_CONFIG);
      setDonorMessages(INITIAL_DONOR_MESSAGES);
      setWishlist(INITIAL_WISHLIST);
      setLikedModIds([]);
      showToast('คืนค่าข้อมูลเริ่มต้นเรียบร้อยแล้ว');
      setIsAdminOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-['Prompt']">
      {/* Strict 3-zone Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'donate') {
            const el = document.getElementById('donate-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'install') {
            const el = document.getElementById('faq-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'wishlist') {
            const el = document.getElementById('wishlist-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenDonate={() => {
          const el = document.getElementById('donate-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => {
          setAdminInitialTab('config');
          setIsAdminOpen(true);
        }}
        onOpenAddMod={() => {
          setAdminInitialTab('add_mod');
          setIsAdminOpen(true);
        }}
      />

      <main className="flex-1">
        {/* Minimalist Blue/White Hero with Search & Filter Controls */}
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          totalModsCount={mods.length}
          totalDownloads={totalDownloads}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* MOD CATALOG SECTION */}
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {selectedCategory === 'all'
                  ? 'มอดเกมทั้งหมด'
                  : `มอดแนว ${selectedCategory}`}
              </h2>
              <p className="text-xs text-slate-500">
                พบ {filteredMods.length} โครงการเกมแปลภาษาไทย โดย Loli is My Life
              </p>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-sky-600 hover:text-sky-700 font-medium"
              >
                ล้างคำค้นหา
              </button>
            )}
          </div>

          {/* Grid of Mod Cards */}
          {filteredMods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredMods.map((mod) => (
                <ModCard
                  key={mod.id}
                  mod={mod}
                  onSelectMod={(m) => setSelectedMod(m)}
                  onQuickDownload={(m) => handleDownload(m)}
                  onToggleLike={(id) => handleToggleLike(id)}
                  isLiked={likedModIds.includes(mod.id)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
              <p className="text-slate-500 text-sm">
                ไม่พบมอดเกมที่ตรงกับคำค้นหา "{searchQuery}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                ดูมอดทั้งหมด
              </button>
            </div>
          )}
        </section>

        {/* Dedicated Support & Donation Section (PromptPay QR Generator & Donor Wall) */}
        <DonateSection
          config={donationConfig}
          donorMessages={donorMessages}
          onAddDonorMessage={handleAddDonorMessage}
          onOpenConfigModal={() => {
            setAdminInitialTab('config');
            setIsAdminOpen(true);
          }}
          onShowToast={(msg) => showToast(msg)}
          preselectedGame={preselectedGameForDonation}
        />

        {/* Community Wishlist & Game Voting Section */}
        <WishlistSection
          wishlist={wishlist}
          onToggleVote={handleToggleVoteWishlist}
          onAddWishlistItem={handleAddWishlistItem}
          onShowToast={(msg) => showToast(msg)}
        />

        {/* Installation & Troubleshooting FAQ Section */}
        <FaqSection />
      </main>

      {/* Floating Action for Quick Donate Support */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          onClick={() => {
            const el = document.getElementById('donate-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-sky-700 hover:text-sky-800 border border-sky-200/90 hover:border-sky-300 rounded-full shadow-lg shadow-sky-950/5 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
          aria-label="เปิดแท็บโดเนท"
        >
          <Heart className="w-4 h-4 fill-sky-600 text-sky-600" />
          <span>ร่วมโดเนทผู้แปล</span>
        </button>
      </div>

      {/* Mod Detail Modal */}
      {selectedMod && (
        <ModModal
          mod={selectedMod}
          onClose={() => setSelectedMod(null)}
          onDownload={(m, url) => handleDownload(m, url)}
          onOpenDonateForGame={(title) => handleOpenDonateForGame(title)}
          onAddComment={handleAddComment}
          onShowToast={(msg) => showToast(msg)}
        />
      )}

      {/* Admin & Configuration Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={donationConfig}
        onSaveConfig={(newConfig) => setDonationConfig(newConfig)}
        mods={mods}
        onAddMod={handleAddMod}
        onDeleteMod={handleDeleteMod}
        onResetDefaults={handleResetDefaults}
        onShowToast={(msg) => showToast(msg)}
        initialTab={adminInitialTab}
      />

      {/* Quiet Minimalist Footer */}
      <Footer
        onScrollToTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'donate') {
            const el = document.getElementById('donate-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'install') {
            const el = document.getElementById('faq-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'wishlist') {
            const el = document.getElementById('wishlist-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenDonate={() => {
          const el = document.getElementById('donate-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAdmin={() => {
          setAdminInitialTab('config');
          setIsAdminOpen(true);
        }}
      />

      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
