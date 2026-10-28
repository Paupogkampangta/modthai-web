import React, { useState } from 'react';
import { ThumbsUp, PlusCircle, MessageSquarePlus } from 'lucide-react';
import { WishlistItem } from '../types';

interface WishlistSectionProps {
  wishlist: WishlistItem[];
  onToggleVote: (id: string) => void;
  onAddWishlistItem: (item: Omit<WishlistItem, 'id' | 'votes' | 'votedByMe'>) => void;
  onShowToast: (msg: string) => void;
}

export const WishlistSection: React.FC<WishlistSectionProps> = ({
  wishlist,
  onToggleVote,
  onAddWishlistItem,
  onShowToast,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [requestedBy, setRequestedBy] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddWishlistItem({
      title: title.trim(),
      originalTitle: originalTitle.trim() || title.trim(),
      genre: genre.trim() || 'General',
      requestedBy: requestedBy.trim() || 'ผู้เล่นนิรนาม',
      reason: reason.trim() || 'อยากเล่นเกมนี้ในภาษาไทยครับ',
    });

    setTitle('');
    setOriginalTitle('');
    setGenre('');
    setReason('');
    setShowAddForm(false);
    onShowToast('เพิ่มเกมที่คุณอยากให้แปลเข้าสู่รายการโหวตแล้ว!');
  };

  return (
    <section id="wishlist-section" className="py-12 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="text-xs text-sky-600 font-mono font-semibold">WISHLIST & COMMUNITY</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Prompt']">
              เสนอเกมที่คุณอยากให้แปลภาษาไทย
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              เกมไหนที่ได้รับคะแนนโหวตสูง คุณ <strong>Loli is My Life</strong> จะนำมาพิจารณาโครงสร้างไฟล์และวางแผนการแปลเป็นลำดับถัดไป
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
          >
            <MessageSquarePlus className="w-4 h-4 text-sky-600" />
            <span>{showAddForm ? 'ปิดฟอร์มเสนอเกม' : 'เสนอเกมใหม่'}</span>
          </button>
        </div>

        {/* Add Wishlist Form */}
        {showAddForm && (
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 animate-in fade-in duration-200 shadow-xs"
          >
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-sky-600" />
              <span>กรอกข้อมูลเกมที่คุณอยากให้แปล</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-600 block mb-1">ชื่อเกม (ภาษาไทยหรืออังกฤษ)*</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="เช่น Dragon's Dogma 2"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-sky-500"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">ชื่อภาษาอังกฤษเต็ม</label>
                <input
                  type="text"
                  value={originalTitle}
                  onChange={(e) => setOriginalTitle(e.target.value)}
                  placeholder="เช่น Dragon's Dogma II"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-sky-500"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">แนวเกม (Genre)</label>
                <input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="เช่น Action RPG, Horror"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="text-slate-600 block mb-1">เหตุผลหรือความน่าสนใจของเนื้อเรื่อง</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="เช่น บทสนทนาเยอะมาก มีปรัชญาน่าสนใจ อยากให้คนไทยได้เข้าใจ..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-sky-500"
                />
              </div>
              <div>
                <label className="text-slate-600 block mb-1">ชื่อของคุณ</label>
                <input
                  type="text"
                  value={requestedBy}
                  onChange={(e) => setRequestedBy(e.target.value)}
                  placeholder="เช่น ผู้เล่นสายเนื้อเรื่อง"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:border-sky-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded-lg transition-colors shadow-2xs"
              >
                บันทึกการเสนอเกม
              </button>
            </div>
          </form>
        )}

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 bg-slate-50/70 border border-slate-200 rounded-xl flex items-start justify-between gap-4 hover:border-sky-300 hover:bg-white transition-all shadow-2xs"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span className="text-sky-600 font-medium">{item.genre}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-400">เสนอโดย {item.requestedBy}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 font-['Prompt']">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {item.reason}
                </p>
              </div>

              {/* Vote Button */}
              <button
                onClick={() => onToggleVote(item.id)}
                className={`flex flex-col items-center justify-center min-w-[56px] py-2 px-3 rounded-xl border transition-all ${
                  item.votedByMe
                    ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:text-sky-600 shadow-2xs'
                }`}
              >
                <ThumbsUp
                  className={`w-4 h-4 mb-1 ${item.votedByMe ? 'fill-white text-white' : ''}`}
                />
                <span className="text-xs font-mono font-bold tabular-nums">
                  {item.votes}
                </span>
                <span className="text-[10px] opacity-80 font-mono">
                  {item.votedByMe ? 'โหวตแล้ว' : 'โหวต'}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
